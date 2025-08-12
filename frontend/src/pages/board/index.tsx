import BoardList from "@/features/board/BoardList";
import { prisma } from "@/lib/prisma";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";

// Date 직렬화 타입: createdAt을 string(ISO 형식)으로 변환
export type PagePost = {
    id: number;
    title: string;
    content: string;
    category: string;
    author: string;
    createdAt: string; // ISO 형식의 문자열
    updatedAt: string;
}

interface Props {
    posts: PagePost[];
}

const BoardPage = ({ posts }: Props) => {
    const { data: session,status } = useSession();
    const role = session && session.user && typeof (session.user as any).role === "string"
      ? ((session.user as unknown as { role?: string }).role ?? undefined)
      : undefined;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">📌 게시판</h1>
                {status === "authenticated" && role === "ADMIN" && (
                    <Link
                        href="/admin/board"
                        className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
                        ✍️ 글쓰기
                    </Link>
                )}
            </div>

            {/* 서버에서 받아온 posts를 그대로 전달 */}
            <BoardList posts={posts} />
        </div>
    );
};

export default BoardPage


// 서버에서 Mysql 조회 -> 직렬화 -> prop로 전달
export const getServerSideProps: GetServerSideProps<Props> = async () => {
    try{
        const rows = await prisma.post.findMany({
            orderBy: { createdAt: "desc"},
        });

        // Next.js는 Date도 직렬화하긴 하지만, 클/서버 표시 차이로
        // hydration 이슈를 줄이기 위해 createdAt을 ISO string으로 명시 변환
        const posts: PagePost[] = rows.map((p) => ({
            id: p.id,
            title: p.title,
            content: p.content,
            category: p.category,
            author: p.author,
            createdAt: p.createdAt.toISOString(), 
            updatedAt: p.updatedAt.toISOString(), 
        }));

        return { props: { posts } };
    } catch (e) {
        console.error("[GSSP /board] DB error:", e);
        return { props: { posts: [] } };
    }
};