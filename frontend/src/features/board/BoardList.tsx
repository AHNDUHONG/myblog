import BoardItem from "./BoardItem"
import { mockPosts } from "./mockData"

type PagePost = {
    id: number;
    title: string;
    content: string;
    category: string;
    author: string;
    createdAt: string; // ISO 형식의 문자열
};

export default function BoardList({ posts }: { posts: PagePost[] }) {
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
                    <h2 className="mt-1 text-xl font-bold">{post.title}</h2>
                    <p className="mt-2 text-gray-600 line-clamp-2">{post.content}</p>
                    <p className="text-sm text-right text-gray-400">by {post.author}</p>
                </article>
            ))}
        </div>
    );
}