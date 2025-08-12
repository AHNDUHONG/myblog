import { prisma } from "@/lib/prisma";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

type PagePost = {
    id: number;
    title: string;
    content: string;
    category: string;
    author: string;
    createdAt: string;
    updatedAt: string;
}

interface Props {
    post: PagePost | null;
}

export default function BoardDetailPage({ post }: Props) {
    const router = useRouter();
    const { data: session, status } = useSession();
    const isAdmin =
        status === "authenticated" &&
        (session?.user as { role?: string } | undefined)?.role === "ADMIN";
        
    if (!post) return <p className="text-red-500">게시글을 찾을 수 없습니다.</p>;

    const onDelete = async () => {
        if (!confirm("정말 삭제하시겠어요?")) return;
        const res = await fetch(`/api/posts/${post.id}`, { method: "DELETE" });
        if (res.ok) router.push("/board");
        else alert("삭제 실패");
    };

    return (
        <div className="space-y-4">
            <div className="flex items-start justify-between gap-4 pb-2 border-b">
                <div>
                    <h1 className="text-3xl font-bold">{post.title}</h1>
                    <p className="text-sm text-gray-500">
                        {post.category} | <time dateTime={post.createdAt}>{post.createdAt.slice(0, 10)}</time> | by {post.author}
                    </p>
                </div>

                {/* 로딩 중엔 버튼 렌더 X */}
                {status !== "loading" && isAdmin && (
                    <div className="flex gap-2">
                        <Link href={`/admin/board/${post.id}/edit`} className="px-3 py-1 border rounded">
                            수정
                        </Link>
                        <button onClick={onDelete} className="px-3 py-1 text-red-600 border rounded">
                            삭제
                        </button>
                    </div>
                )}
            </div>
            
            <div className="text-gray-800 whitespace-pre-wrap">{post.content}</div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
    const id = Number(ctx.params?.id);
    if (Number.isNaN(id)) return { props: { post: null } };

    const p = await prisma.post.findUnique({ where: { id }});
    if (!p) return { props: { post: null } };

    const post: PagePost = {
        id: p.id,
        title: p.title,
        content: p.content,
        category: p.category,
        author: p.author,
        createdAt: p.createdAt.toISOString(),
        updatedAt: p.updatedAt.toISOString(),
    };
    return { props: { post } };
};