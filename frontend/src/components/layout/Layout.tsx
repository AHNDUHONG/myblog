import dynamic from "next/dynamic";
import { ReactNode } from "react";
import { SidebarProvider, SidebarInset } from "../ui/sidebar";

// const Sidebar = dynamic(() => import("@/components/app-sidebar").then(mod => ({ default: mod.AppSidebar })), { ssr: false });
import { AppSidebar as Sidebar } from "@/components/app-sidebar";

type Props = { children: ReactNode };

export default function Layout({ children }: Props) {
    return (
        <SidebarProvider> 
            <div className="flex w-full">
                {/* 좌측 사이드바 */}
                <Sidebar variant="inset" />
                {/* 본문 영역 */}
                <SidebarInset>
                    <div className="mx-auto w-full max-w-7xl p-6">{children}</div>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}
