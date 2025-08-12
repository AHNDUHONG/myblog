import BoardForm from "@/features/board/BoardForm"
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

export default function AdminBoardPage() {
    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold">게시글 작성</h1>
            <BoardForm />
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getServerSession(ctx.req, ctx.res, authOptions);
    const role = (session?.user as any)?.role;
    if (!session || role !== 'ADMIN') {
        return {
            redirect: { destination: '/auth/signin', permanent: false },
        };
    }
    return { props: {} };
}