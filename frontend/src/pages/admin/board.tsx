import BoardForm from "@/features/board/BoardForm"
import { useRouter } from "next/router";
import { useEffect } from "react";

const isAdmin = true; // 추후 로그인 상태 기반 처리

const AdminBoardPage = () => {
    const router = useRouter();

    useEffect(() => {
        if (!isAdmin) {
            alert("관리자만 접근할 수 있습니다.");
            router.push('/');
        }
    }, []);

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold">게시글 작성</h1>
            <BoardForm />
        </div>
    );
};

export default AdminBoardPage;