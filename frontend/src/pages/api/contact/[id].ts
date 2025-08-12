import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { prisma } from "@/lib/prisma";
import z from "zod";

const PatchSchema = z.object({
    answered: z.boolean().optional(),
    answer: z.string().optional(),
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
            const m = await prisma.contactMessage.findUnique({ where: {id} });
            if (!m) return res.status(404).json({ message: "Not Found" });
            return res.status(200).json({
                ...m,
                createdAt: m.createdAt.toISOString(),
                answeredAt: m.answeredAt ? m.answeredAt.toISOString() : null,
            });
        }

        if (req.method === "PATCH") {
            const parsed = PatchSchema.safeParse(req.body);
            if (!parsed.success) {
                return res.status(400).json({ message: "잘못된 입력", issues: parsed.error.flatten() });
            }

            const { answered, answer } = parsed.data;

            // 업데이트 규칙: answered가 true로 바뀌면 answeredAt = now()
            //            answered가 false면 answeredAt = null 
            const data: any = {};
            if (typeof answer !== "undefined") data.answer = answer;
            if (typeof answered !== "undefined") {
                data.answered = answered;
                data.answeredAt = answered ? new Date() : null;
            }

            const updated = await prisma.contactMessage.update({
                where: { id },
                data,
            });

            return res.status(200).json({
                ...updated,
                createdAt: updated.createdAt.toISOString(),
                answeredAt: updated.answeredAt ? updated.answeredAt.toISOString() : null,
            });
        }

        res.setHeader("Allow", ["GET", "PATCH"]);
        return res.status(405).end("Method Not Allowed");
    } catch (e: any) {
        console.error("[API /api/contact/[id]] ERROR", e);
        return res.status(500).json({ message: e?.message ?? "Internal Server Error" });
    }
}