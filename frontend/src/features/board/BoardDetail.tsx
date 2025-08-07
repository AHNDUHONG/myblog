import { Post } from "./mockData";

interface Props {
    post: Post | null;
}

const BoardDetail = ({ post}: Props) => {
    if (!post) {
        return <p className="text-red-500">게시글을 찾을 수 없습니다.</p>
    }

    return (
        <div className="space-y-4">
            <div className="border-b pb-2">
                <h1 className="text-3xl font-bold">{post.title}</h1>
                <p className="text-sm text-gray-500">
                    {post.category} | {post.createdAt} | by {post.author}
                </p>
            </div>
            <div className="text-gray-800 whitespace-pre-wrap">{post.content}</div>
        </div>
    );
};

export default BoardDetail;