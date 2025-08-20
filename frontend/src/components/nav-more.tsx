import Link from "next/link"
import {
  Folder,
  type LucideIcon,
} from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMore({
  items,
}: {
  items: {
    name: string
    url: string
    icon: LucideIcon
  }[]
}) {
  const isExternal = (url: string) => /^https?:\/\//.test(url)

  return (
    <SidebarGroup>
      <SidebarGroupLabel>More</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild tooltip={item.name} className="h-10">
              {isExternal(item.url) ? (
                <a href={item.url} target="_blank" rel="noreferrer">
                  <item.icon className="w-8 h-8" />
                  <span className="text-base">{item.name}</span>
                </a>
              ) : (
                <Link href={item.url}>
                  <item.icon className="w-8 h-8" />
                  <span className="text-base">{item.name}</span>
                </Link>
              )}
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
