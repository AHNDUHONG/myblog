import { PagePost } from "@/pages/board";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function BoardList({ posts }: { posts: PagePost[] }) {

    const router = useRouter();
    const { data: session, status } = useSession();
    const isAdmin =
        status === "authenticated" &&
        (session?.user as { role?: string } | undefined)?.role === "ADMIN";

    const handleDelete = async (id: number) => {
        if (!confirm("정말 삭제하시겠습니까?")) return;

        try {
            const res = await fetch(`/api/posts/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                alert("게시글이 삭제되었습니다.");
                router.reload(); // 페이지 새로고침
            } else {
                const errorData = await res.json();
                alert(`삭제 실패: ${errorData.message}`);
            }
        } catch (error) {
            console.error("삭제 중 오류 발생:", error);
            alert("삭제 중 오류가 발생했습니다.");
        }
    };

    if(!posts?.length) {
        return <p className="text-gray-500">게시글이 없습니다.</p>
    }

    return (
        <div className="grid grid-cols-1 gap-4">
            {posts.map((post) => (
                <article key={post.id} className="p-4 transition border rounded-lg shadow-sm hover::shadow-md">
                    <p className="text-sm text-gray-500">
                        {post.category} | {/* 서버/클라이언트 포맷 차이로 hydration 방지: YYYY-MM-DD만 표시 */}
                        <time dateTime={post.createdAt}>{post.createdAt.slice(0, 10)}</time>
                    </p>
                    <h2 className="mt-1 text-xl font-bold">
                        <Link href={`/board/${post.id}`}>{post.title}</Link>
                    </h2>
                    <p className="mt-2 text-gray-600 line-clamp-2">{post.content}</p>
                    <div className="flex items-center justify-between mt-3">
                        <span className="text-sm text-right text-gray-400">by {post.author}</span>
                        {/* 로딩 중엔 버튼 렌더 안 함 → SSR/CSR 불일치 방지 */}
                        {status !== "loading" && isAdmin && (
                            <div className="flex gap-2">
                                <Link href={`/admin/board/${post.id}/edit`} className="px-2 py-1 text-sm border rounded">수정</Link>
                                <button onClick={() => handleDelete(post.id)} className="px-2 py-1 text-sm text-red-600 border rounded hover:bg-red-50">
                                    삭제
                                </button>
                            </div>
                        )}
                    </div>
                </article>
            ))}
        </div>
    );
}