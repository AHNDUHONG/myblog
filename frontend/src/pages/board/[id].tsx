import BoardDetail from "@/features/board/BoardDetail";
import { mockPosts } from "@/features/board/mockData";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const BoardDetailPage = () => {
    const router = useRouter();
    const { id } = router.query;

    const [post, setPost] = useState(null);

    useEffect(() => {
        if (id) {
            const found = mockPosts.find((p) => p.id === Number(id));
            setPost(found || null);
        }
    }, [id]);

    return (
        <div>
            <BoardDetail post={post} />
        </div>
    );
};

export default BoardDetailPage;