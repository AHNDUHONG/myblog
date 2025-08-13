import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "@/lib/prisma";
import z from "zod";
import { sendContactReply } from "@/lib/mail";

const PatchSchema = z.object({
    answered: z.boolean().optional(),
    answer: z.string().optional(),
    sendEmail: z.boolean().optional(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // 공통: 관리자만 허용
    const session = await getServerSession(req, res, authOptions);
    const role = (session?.user as { role?: string } | undefined)?.role;
    if (!session || role !== "ADMIN") return res.status(401).json({ message: "Unauthorized"});

    const id = Number(req.query.id);
    if (!Number.isFinite(id)) return res.status(400).json({ message: "Invalid id" });

    try {
        if (req.method === "GET") {
            const m = await prisma.contactMessage.findUnique({
                where: {id},
                include: { emailLogs: { orderBy: {createdAt: "desc" } } },
            });
            if (!m) return res.status(404).json({ message: "Not Found" });
            return res.status(200).json({
                ...m,
                createdAt: m.createdAt.toISOString(),
                answeredAt: m.answeredAt ? m.answeredAt.toISOString() : null,
                emailLogs: m.emailLogs.map(l => ({
                    ...l,
                    createdAt: l.createdAt.toISOString(),
                })),
            });
        }

        if (req.method === "PATCH") {
            const parsed = PatchSchema.safeParse(req.body);
            if (!parsed.success) {
                return res.status(400).json({ message: "잘못된 입력", issues: parsed.error.flatten() });
            }

            const { answered, answer, sendEmail } = parsed.data;

            // 업데이트 규칙: answered가 true로 바뀌면 answeredAt = now()
            //            answered가 false면 answeredAt = null 
            const data: any = {};
            if (typeof answer !== "undefined") data.answer = answer;
            if (typeof answered !== "undefined") {
                data.answered = answered;
                data.answeredAt = answered ? new Date() : null;
            }

            // DB 업데이트
            const updated = await prisma.contactMessage.update({
                where: { id },
                data,
            });

            // 조건 충족 시 이메일 발송
            let _emailSent = false;
            let _emailError: string | null = null;
            let _providerMessageId: string | undefined;
            let _subject: string | undefined;

            if (sendEmail && updated.answer) {
                try {
                    const sent = await sendContactReply({
                        to: updated.email,
                        name: updated.name,
                        question: updated.message,
                        answer: updated.answer,
                    });
                    _emailSent = true;
                    _providerMessageId = sent.messageId;
                    _subject = sent.subject;

                    // 트랜잭션으로 로그 기록 + 요약 필드 업뎃
                    await prisma.$transaction([
                        prisma.contactEmailLog.create({
                            data: {
                                messageId: updated.id,
                                to: updated.email,
                                subject: _subject!,
                                bodyPreview: updated.answer.slice(0, 160),
                                success: true,
                                providerMessageId: _providerMessageId,
                            },
                        }),
                        prisma.contactMessage.update({
                            where: { id: updated.id },
                            data: {
                                emailSentCount: { increment: 1},
                                lastEmailSentAt: new Date(),
                            },
                        }),
                    ]);
                } catch (e: any) {
                     _emailError = e?.message ?? "메일 발송 실패";
                    
                    // 실패도 로그로 남김(요약 필드 증분 없음)
                    await prisma.contactEmailLog.create({
                        data: {
                            messageId: updated.id,
                            to: updated.email,
                            subject: _subject ?? "문의에 대한 답변 드립니다.",
                            bodyPreview: updated.answer.slice(0, 160),
                            success: false,
                            error: _emailError,
                        },
                    });
                }
            }

            // 최신 상태 + 이력 요약 포함 응답
            const fresh = await prisma.contactMessage.findUnique({
                where: { id: updated.id },
                include: { emailLogs: { orderBy: { createdAt: "desc" } } },
            });

            return res.status(200).json({
                ...fresh!,
                createdAt: fresh!.createdAt.toISOString(),
                answeredAt: fresh!.answeredAt ? fresh!.answeredAt.toISOString() : null,
                lastEmailSentAt: fresh!.lastEmailSentAt ? fresh!.lastEmailSentAt.toISOString() : null,
                emailLogs: fresh!.emailLogs.map(l => ({ ...l, createdAt: l.createdAt.toISOString() })),
                _emailSent,
                _emailError,
            });
        }

        res.setHeader("Allow", ["GET", "PATCH"]);
        return res.status(405).end("Method Not Allowed");
    } catch (e: any) {
        console.error("[API /api/contact/[id]] ERROR", e);
        return res.status(500).json({ message: e?.message ?? "Internal Server Error" });
    }
}