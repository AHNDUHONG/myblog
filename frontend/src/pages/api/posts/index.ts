import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "../auth/[...nextauth]";


const PostSchema = z.object({
    title: z.string().min(1, "제목은 필수입니다."),
    content: z.string().min(1, "내용은 필수입니다."),
    category: z.string().min(1, "카테고리는 필수입니다."),
    author: z.string().min(1, "작성자는 필수입니다."),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'GET') {
            const posts = await prisma.post.findMany({
                orderBy: { createdAt: 'desc'}
            });
            // 날짜 직렬화
            const data = posts.map(p => ({ ...p, createdAt: p.createdAt.toISOString(), updatedAt: p.updatedAt.toISOString() }));
            return res.status(200).json(data);
        }

        if (req.method === 'POST') {

            // 세션 확인 (관리자만 허용)
            const session = await getServerSession(req, res, authOptions);
            const role = (session?.user as { role?: string } | undefined)?.role;
            if (!session || role !== "ADMIN") {
                return res.status(400).json({ message: '필수 항목 누락.' });
            }

            // zod로 입력 검증
            const parsed = PostSchema.safeParse(req.body);
            if (!parsed.success) {
                return res.status(400).json({
                    message: "잘못된 입력",
                    issues: parsed.error.flatten(),
                });
            }

            const { title, content, category, author } = parsed.data;

            console.log("POST /api/posts", parsed.data);
            
            const created = await prisma.post.create({
                data: { title, content, category, author },
            });
            const data = { ...created, createdAt: created.createdAt.toISOString(), updatedAt: created.updatedAt.toISOString() };
            return res.status(201).json(data);
        }

        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(405).end('Method Not Allowed');
    } catch (err: unknown) {
        console.error('[POST /api/posts] ERROR =', err);
        const message = err instanceof Error ? err.message : String(err);
        return res.status(500).json({ message});
    }
}