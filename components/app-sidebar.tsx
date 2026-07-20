"use client";

import * as React from "react";

import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import AgentSwitcher from "./agent-switcher";
import NavConnections from "./nav-connections";
import NavThreads from "./nav-threads";
import { useListConnections } from "@/hooks/use-connection";
import { useGetThreads } from "@/hooks/use-thread";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
};
const agentOptions = [
  {
    name: "Normal Agent",
    value: "normal_agent",
  },
  {
    name: "Deep Agent",
    value: "deep_agent",
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [agent, setAgent] = React.useState<string>("normal_agent");
  const [connectionId, setConnectionId] = React.useState<string | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }
    return localStorage.getItem("connection_id");
  });
  const { data: connectionsList } = useListConnections();

  const { data: threadsList } = useGetThreads(connectionId ?? "");

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarTrigger className="ml-auto" />
        <AgentSwitcher
          setAgent={setAgent}
          selectedAgent={agent}
          agentsList={agentOptions}
        />
      </SidebarHeader>
      <SidebarContent>
        <NavConnections
          connections={connectionsList}
          activeConnection={connectionId || ""}
          setActiveConnection={setConnectionId}
        />
        <NavThreads threads={threadsList} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
