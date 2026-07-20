"use client";
import { Show, UserButton, useUser } from "@clerk/nextjs";

import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";

export function NavUser() {
  const { user, isLoaded } = useUser();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex items-center gap-3 p-2.5">
          <Show when="signed-in">
            <UserButton />
            {isLoaded && user && (
              <div className="flex min-w-0 flex-col">
                <span className="truncate text-sm font-medium leading-tight">
                  {user.fullName ?? user.username ?? "User"}
                </span>
                <span className="truncate text-xs leading-tight text-muted-foreground">
                  {user.primaryEmailAddress?.emailAddress ?? ""}
                </span>
              </div>
            )}
          </Show>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
