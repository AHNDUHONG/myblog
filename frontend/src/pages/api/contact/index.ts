import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import z from "zod";


const ContactSchema = z.object({
    name: z.string().min(1, "이름은 필수입니다."),
    email: z.string().email("이메일 형식이 올바르지 않습니다."),
    message: z.string().min(1, "내용은 필수입니다.")
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === "POST") {
            const parsed = ContactSchema.safeParse(req.body);
            if (!parsed.success) {
                return res.status(400).json({ message: "잘못된 입력", issues: parsed.error.flatten() });
            }
            const created = await prisma.contactMessage.create({ data: parsed.data });
            return res.status(201).json({
                ...created,
                created: created.createdAt.toISOString(),   // 직렬화
            });
        }
        if (req.method === "GET") {
            // 관리자만 목록 조회
            const session = await getServerSession(req, res, authOptions);
            const role = (session?.user as { role?: string } | undefined)?.role;
            if (!session || role !== "ADMIN") return res.status(401).json({ message: "Unauthorized"});

            // 페이징
            const page = Math.max(1, Number(req.query.page) || 1);
            const pageSize = Math.min(50, Math.max(1, Number(req.query.pageSize) || 20));
            const [total, rows] = await Promise.all([
                prisma.contactMessage.count(),
                prisma.contactMessage.findMany({
                    orderBy: { createdAt: "desc" },
                    skip: (page - 1) * pageSize,
                    take: pageSize,
                }),
            ]);

            return res.status(200).json({
                items: rows.map((m) => ({...m, createdAt: m.createdAt.toISOString() })),
                page,
                pageSize,
                total,
                totalPages: Math.ceil(total / pageSize),
            });
        }

        res.setHeader("Allow", ["POST", "GET"]);
        return res.status(405).end("Method Not Allowed");
    }   catch (e: any) {
        console.error("[API /api/contact] ERROR", e);
        return res.status(500).json({ message: e?.message ?? "Internal Server Error" });
    }
}