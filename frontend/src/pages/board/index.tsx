import BoardList from "@/features/board/BoardList";
import Link from "next/link";

const BoardPage = () => {
    const isAdmin = true;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">📌 게시판</h1>
                {isAdmin && (
                    <Link
                        href="/admin/board"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        ✍️ 글쓰기
                    </Link>
                )}
            </div>
            <BoardList />
        </div>
    );
};

export default BoardPage