import React, { FC } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RiArrowUpDownLine, RiCheckLine, RiRobot3Line } from "@remixicon/react";
import { SidebarMenuButton } from "./ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

interface AgentSwitcherProps {
  agentsList: {
    name: string;
    value: string;
  }[];
  selectedAgent: string;
  setAgent: (agent: string) => void;
}
const AgentSwitcher: FC<AgentSwitcherProps> = ({
  agentsList,
  selectedAgent,
  setAgent,
}) => {
  const isMobile = useIsMobile();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <SidebarMenuButton
            tooltip={"Switch Agents"}
            size="lg"
            className="data-open:bg-sidebar-accent data-open:text-sidebar-accent-foreground "
          />
        }
      >
        <div className="bg-primary rounded-md p-2">
          <RiRobot3Line />
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span>Switch Agents</span>
          <RiArrowUpDownLine size={10} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        side={isMobile ? "bottom" : "right"}
        sideOffset={4}
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Agents</DropdownMenuLabel>
          {agentsList?.map((agent) => (
            <DropdownMenuItem
              onClick={() => setAgent(agent.value)}
              key={agent.value}
            >
              {agent.name}
              {agent.value === selectedAgent && <RiCheckLine size={12} />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AgentSwitcher;
