import * as React from "react"
import { useSession } from "next-auth/react"
import {
  Github,
  MessageCircleMore,
  House,
  SquareUserRound,
  ClipboardPen,
  Wrench,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavMore } from "@/components/nav-more"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session, status } = useSession()

  // This is sample data.
  const data = {
    user: {
      name: "ADMIN",
      email: session?.user?.email ?? "dksenghd123@gmail.com",
      avatar: "/blog_Logo.svg",
    },
    navMain: [
      {
        title: "Home",
        url: "/",
        icon: House,
        isActive: true,
      },
      {
        title: "About Me",
        url: "/project",
        icon: SquareUserRound,
      },
      {
        title: "Board",
        url: "/board",
        icon: ClipboardPen,
      },
    ],
    navMore: [
      {
        name: "Contact",
        url: "/contact",
        icon: MessageCircleMore,
      },
      {
        name: "GitHub",
        url: "https://github.com/AHNDUHONG",
        icon: Github,
      },
      {
        name: "Admin",
        url: "/auth/signin",
        icon: Wrench,
      },
    ],
  }

  const navMoreItems = status === "authenticated"
    ? data.navMore.filter((item) => item.name !== "Admin")
    : data.navMore

  return (
    <Sidebar collapsible="icon" className="flex flex-col w-50 h-screen" {...props}>
      <SidebarHeader className="h-20 mt-3 mx-2 flex items-center gap-3">
        <div className="flex flex-col">
          <span className="text-[25px] font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Winters Blog
          </span>
          <span className="text-xs flex justify-center text-muted-foreground">
            Daily Dev, Honest Notes
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent className="gap-16 mt-10 flex flex-col">
        <div className="pt-10">
          <NavMain items={data.navMain} />
        </div>
        <div className="flex">
          <NavMore items={navMoreItems} />
        </div>
      </SidebarContent>
      {session && (
        <SidebarFooter className="mt-auto">
          <NavUser user={data.user} />
        </SidebarFooter>
      )}
      <SidebarRail />
    </Sidebar>
  )
}
