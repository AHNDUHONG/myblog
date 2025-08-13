import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const id = Number(req.query.id);
    if (Number.isNaN(id)) return res.status(400).json({ message: '잘못된 ID' });

    try {
        if (req.method === 'GET') {
            const post = await prisma.post.findUnique({ where: { id } });
            if (!post) return res.status(404).json({ message: '게시글을 찾을 수 없습니다.' });
            const data = { ...post, createdAt: post.createdAt.toISOString(), updatedAt: post.updatedAt.toISOString() };
            return res.status(200).json(data);
        }

        if (req.method === "PUT" || req.method === "DELETE") {
            // 관리자만 허용
            const session = await getServerSession(req, res, authOptions);
            const role = (session?.user as { role?: string } | undefined)?.role;
            if (!session || role !== "ADMIN") {
                return res.status(401).json({ message: "Unauthorized "});   //차단
            }
        }

        if (req.method === 'PUT') {
            const { title, content, category, author } = req.body || {};
            if (!title || !content || !category || !author) {
                return res.status(400).json({ message: '필수 항목 누락.' });
            }
            const updated = await prisma.post.update({
                where: { id },
                data: { title, content, category, author },
            });
            const data = { ...updated, createdAt: updated.createdAt.toISOString(), updatedAt: updated.updatedAt.toISOString() };
            return res.status(200).json(data);
        }

        if (req.method === 'DELETE') {
            await prisma.post.delete({ where: { id }});
            return res.status(204).end();
        }

        res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
        return res.status(405).end('Method Not Allowed');
    } catch (e) {
        console.error("[API /api/posts/[id]] ERROR", e);
        return res.status(500).json({ message: '서버 오류' });
    }
}