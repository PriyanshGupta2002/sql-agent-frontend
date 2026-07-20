"use client";
import React, { FC, useEffect, useState } from "react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  RiAddLine,
  RiDeleteBinLine,
  RiMoreLine,
  RiPencilLine,
} from "@remixicon/react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "./ui/badge";
import { useCreateConnection } from "@/hooks/use-connection";
import { usePathname, useRouter } from "next/navigation";

const DB_TYPES = [
  { value: "postgresql", label: "PostgreSQL" },
  { value: "mysql", label: "MySQL" },
  { value: "sqlite", label: "SQLite" },
  { value: "mssql", label: "SQL Server" },
  { value: "mongodb", label: "MongoDB" },
  { value: "oracle", label: "Oracle" },
];
interface NavConnectionsProps {
  connections: Connections[];
  activeConnection: string;
  setActiveConnection: (connection: string) => void;
}

const NavConnections: FC<NavConnectionsProps> = ({
  connections,
  activeConnection,
  setActiveConnection,
}) => {
  const [alias, setAlias] = useState("");
  const [dbType, setDbType] = useState("");
  const [connectionString, setConnectionString] = useState("");

  const [open, setOpen] = useState<boolean>(false);

  const createConnection = useCreateConnection();
  const pathname = usePathname();
  const router = useRouter();
  const handleConnect = async () => {
    // TODO: wire up to your connect mutation/API call
    const data = await createConnection.mutateAsync({
      alias,
      color,
      database_type: dbType,
      connection_string: connectionString,
    });
    setOpen(false);
    setAlias("");
    setConnectionString("");
    setActiveConnection(data.id);
    localStorage.setItem("connection_id", data.id);
  };
  const [color, setColor] = useState("#3b82f6");
  const isMobile = useIsMobile();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Database Connections</SidebarGroupLabel>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger
          render={
            <SidebarMenuButton
              tooltip={"Create Connection"}
              size="lg"
              className="data-open:bg-sidebar-accent data-open:text-sidebar-accent-foreground "
            />
          }
        >
          <div className="flex items-center gap-2">
            <div className="bg-sidebar-ring rounded-md p-2">
              <RiAddLine size={12} />
            </div>
            <span className="group-data-[collapsible=icon]:hidden">
              Create Connection
            </span>
          </div>
        </DialogTrigger>

        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Connect your database</DialogTitle>
            <DialogDescription>
              Add your database connection so you can start asking questions
              about your data.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 py-2">
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="alias">Alias name</Label>
                <Input
                  id="alias"
                  type="text"
                  placeholder="e.g. Production DB"
                  value={alias}
                  onChange={(e) => setAlias(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="db-type">Database type</Label>
                <Select
                  value={dbType}
                  onValueChange={(value) => setDbType(value || "")}
                >
                  <SelectTrigger id="db-type" className="w-full">
                    <SelectValue placeholder="Select database type" />
                  </SelectTrigger>
                  <SelectContent>
                    {DB_TYPES.map((db) => (
                      <SelectItem key={db.value} value={db.value}>
                        {db.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="color">Connection Color</Label>

                <div className="flex items-center gap-3">
                  <Input
                    id="color"
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="h-10 w-14 cursor-pointer p-1"
                  />

                  <span className="text-muted-foreground text-sm">{color}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 col-span-3">
                <Label htmlFor="connection-string">Connection string</Label>
                <Input
                  id="connection-string"
                  type="text"
                  placeholder="mysql://username:password@localhost:3306/database_name"
                  value={connectionString}
                  onChange={(e) => setConnectionString(e.target.value)}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <DialogClose render={<Button variant="outline" />}>
              Cancel
            </DialogClose>
            <Button
              variant="secondary"
              onClick={handleConnect}
              disabled={!alias || !dbType || !connectionString}
            >
              Connect
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <SidebarMenu className="group-data-[collapsible=icon]:hidden">
        {connections?.map((connection) => (
          <SidebarMenuItem key={connection.id}>
            <SidebarMenuButton
              isActive={connection.id === activeConnection}
              onClick={() => {
                setActiveConnection(connection?.id || "");
                localStorage.setItem("connection_id", connection?.id || "");

                if (pathname.startsWith("/thread")) {
                  router.push("/chat");
                }
              }}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: `${connection.color}`,
                }}
              />
              {connection.alias}
              {activeConnection === connection.id && (
                <Badge variant={"default"}>Active</Badge>
              )}
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
                className="w-fit"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <RiPencilLine />
                  <span>Edit Connection</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive">
                  <RiDeleteBinLine />
                  <span>Delete Connection</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default NavConnections;
