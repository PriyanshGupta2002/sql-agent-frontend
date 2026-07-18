// app/dashboard/layout.tsx
import React from "react";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { AppSidebar } from "@/components/app-sidebar";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "20rem",
          "--sidebar-width-icon": "3rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar />

      <SidebarInset> {children}</SidebarInset>
    </SidebarProvider>
  );
}
