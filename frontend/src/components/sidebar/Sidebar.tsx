import Link from "next/link";

const Sidebar = () => {
    return (
        <aside className="w-54 bg-gray-100 p-4 space-y-4">
            <h1 className="text-xl font-bold">My blog</h1>
            <nav className="flex flex-col space-y-2">
                <Link href="/">홈</Link>
                <Link href="/board">게시판</Link>
                <Link href="/project">프로젝트</Link>
                <Link href="/contact">소개</Link>
                <a href="https://github.com/AHNDUHONG" target="_blank" rel="noopener noreferrer">GitHub</a>
            </nav>
        </aside>
    );
};

export default Sidebar;