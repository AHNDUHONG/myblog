import { Post } from "./mockData";
import Link from "next/link";

interface Props {
    post: Post;
}

const BoardItem = ({ post }: Props) => {
    return (
        <Link href={`/board/${post.id}`} className="block">
            <div className= "border rounded-lg p-4 shadow-sm hover:bg-sky-50  hover:scale-105 transition-transform transition-colors duration-300 ease-in-out">
                <p className="text-sm text-gray-500">{post.category} | {post.createdAt}</p>
                <h2 className="text-xl font-bold mt-1">{post.title}</h2>
                <p className="text-gray-600 mt-2 line-clamp-2">{post.content}</p>
                <p className="text-right text-sm text-gray-400">by {post.author}</p>
            </div>
        </Link>
    );
};

export default BoardItem;