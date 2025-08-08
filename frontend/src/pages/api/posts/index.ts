import { PrismaClient } from "@prisma/client/extension";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const posts = await prisma.post.findMany({ orderBy: { createdAt: 'desc'}});
        return res.status(200).json(posts);
    }

    if (req.method === 'POST') {
        const { title, content, category, author } = req.body;
        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                category,
                author,
            },
        });
        return res.status(201).json(newPost);
    }

    res.status(405).end();
}