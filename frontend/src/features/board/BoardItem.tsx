import { Post } from "@prisma/client";
import Link from "next/link";

interface Props {
    post: Omit<Post, 'createdAt'> & { createdAt: string };
    // createdAtd을 string으로 받도록 타입 변환
    
}

const BoardItem = ({ post }: Props) => {
    return (
        <Link href={`/board/${post.id}`} className="block">
            <div className= "p-4 transition-colors transition-transform duration-300 ease-in-out border rounded-lg shadow-sm hover:bg-sky-50 hover:scale-105">
                <p className="text-sm text-gray-500">{post.category} | {post.createdAt.slice(0, 10)}</p>
                <h2 className="mt-1 text-xl font-bold">{post.title}</h2>
                <p className="mt-2 text-gray-600 line-clamp-2">{post.content}</p>
                <p className="text-sm text-right text-gray-400">by {post.author}</p>
            </div>
        </Link>
    );
};

export default BoardItem;