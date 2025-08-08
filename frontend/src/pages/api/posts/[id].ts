import { PrismaClient } from "@prisma/client/extension";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const id = Number(req.query.id);

    if (req.method === 'GET') {
        const post = await prisma.post.findUnique({ where: { id } });
        if (!post) return res.status(404).json({ message: 'Not Found'});
        return res.status(200).json(post);
    }

    if (req.method === 'DELETE') {
        await prisma.post.delete({ where: { id }});
        return res.status(204).end();
    }

    res.status(405).end();
}