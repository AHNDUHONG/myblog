import { prisma } from "@/lib/prisma";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { useState } from "react";

type PagePost = {
    id: number;
    title: string;
    content: string;
    category: string;
    author: string;
    createdAt: string;
    updatedAt: string;
};

export default function EditPage({ post }: { post: PagePost | null}) {
    const router = useRouter();
    if (!post) return <p className="text-red-500">게시글을 찾을 수 없습니다.</p>;

    const [title, setTitle] = useState(post.title);
    const [category, setCategory] = useState<'CSS' | 'HTML' | 'JavaScript' | 'JAVA' | 'SQL'>(post.category as any);
    const [author, setAuthor] = useState(post.author);
    const [content, setContent] = useState(post.content);
    const [saving, setSaving] = useState(false);

    const onSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        const res = await fetch(`/api/posts/${post.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content, category, author }),
        })
        setSaving(false);
        if (!res.ok) return alert('수정 실패');
        router.push(`/board/${post.id}`);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold">게시글 수정</h1>
            <form onSubmit={onSave} className="space-y-4">
                <div>
                    <label className="block font-semibold">카테고리</label>
                    <select value={category} onChange={(e)=>setCategory(e.target.value as any)} className="w-full p-2 border rounded">
                        <option value="HTML">HTML</option>
                        <option value="CSS">CSS</option>
                        <option value="JavaScript">JavaScript</option>
                        <option value="JAVA">JAVA</option>
                        <option value="SQL">SQL</option>
                    </select>
                </div>

                <div>
                    <label className="block font-semibold">제목</label>
                    <input value={title} onChange={(e)=>setTitle(e.target.value)} required className="w-full p-2 border rounded" />
                </div>

                <div>
                    <label className="block font-semibold">작성자</label>
                    <input value={author} onChange={(e)=>setAuthor(e.target.value)} required className="w-full p-2 border rounded" />
                </div>

                <div>
                    <label className="block font-semibold">내용</label>
                    <textarea rows={10} value={content} onChange={(e)=>setContent(e.target.value)} required className="w-full p-2 border rounded" />
                </div>

                <button disabled={saving} className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">
                    {saving ? '저장 중...' : '저장'}
                </button>
            </form>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps<{ post: PagePost }> = async (ctx) => {
    // 1) 로그인/권한 체크
    const session = await getServerSession(ctx.req, ctx.res, authOptions);
    const role = (session?.user as { role?: string } | undefined)?.role;
    if (!session || role !== "ADMIN") {
        return {
            redirect: { destination: "/auth/signin", permanent: false },    // 차단
        }
    }

    // 2) 권한 통과 시에만 데이터 로드
    const id = Number(ctx.params?.id);
    if (Number.isNaN(id)) return { notFound: true };

    const p = await prisma.post.findUnique({ where: { id }});
    if (!p) return { notFound: true };

    return {
        props: {
            post: {
                id: p.id,
                title: p.title,
                content: p.content,
                category: p.category,
                author: p.author,
                createdAt: p.createdAt.toISOString(),
                updatedAt: p.updatedAt.toISOString(),
            }
        }
    };
};