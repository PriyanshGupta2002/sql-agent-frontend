"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { formatCreatedAt } from "@/lib/utils";

import {
  RiDeleteBinLine,
  RiEditLine,
  RiMoreLine,
  RiChat3Line,
} from "@remixicon/react";
import { useRouter } from "next/navigation";

interface NavThreadsProps {
  threads: ThreadResponse[];
}

export default function NavThreads({ threads }: NavThreadsProps) {
  const { isMobile } = useSidebar();
  const router = useRouter();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Threads</SidebarGroupLabel>

      <SidebarMenu className="space-y-3">
        {threads?.map((thread) => (
          <SidebarMenuItem
            key={thread.id}
            onClick={() => router.push(`/thread/${thread.id}`)}
          >
            <SidebarMenuButton>
              <div className="flex items-center gap-2">
                <RiChat3Line />

                <div className="flex flex-col overflow-hidden">
                  <span className="truncate font-medium">{thread.title}</span>

                  <span className="text-xs text-muted-foreground">
                    {formatCreatedAt(thread.created_at)}
                  </span>
                </div>
              </div>
            </SidebarMenuButton>

            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuAction
                    showOnHover
                    className="aria-expanded:bg-muted"
                  />
                }
              >
                <RiMoreLine />
                <span className="sr-only">More</span>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="w-48"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <RiEditLine />
                  <span>Rename Thread</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem variant="destructive">
                  <RiDeleteBinLine />
                  <span>Delete Thread</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}

        <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <RiMoreLine className="text-sidebar-foreground/70" />
            <span>More Threads</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
