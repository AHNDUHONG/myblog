import dynamic from "next/dynamic";
import { ReactNode } from "react";
import { SidebarProvider } from "../ui/sidebar";

const Sidebar = dynamic(() => import("@/components/app-sidebar").then(mod => ({ default: mod.AppSidebar })), { ssr: false });

type Props = { children: ReactNode };

export default function Layout({ children }: Props) {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen">
                {/* 좌측 사이드바 */}
                <Sidebar />
                {/* 본문 영역 */}
                <main className="flex-1 p-6 overflow-auto">
                    {/* 2번 패턴(본문 내부 제한)도 같이 쓰면 깔끔 */}
                    <div className="mx-auto w-full max-w-7xl">{children}</div>
                </main>
            </div>
        </SidebarProvider>
    );
}