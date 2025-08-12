import dynamic from "next/dynamic";
import { ReactNode } from "react";

const Sidebar = dynamic(() => import("../sidebar/Sidebar"), { ssr: false });

type Props = { children: ReactNode };

export default function Layout({ children }: Props) {
    return (
        <div className="flex min-h-screen">
            {/* 좌측 사이드바 */}
            <Sidebar />
            {/* 본문 영역 */}
            <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
    );
}