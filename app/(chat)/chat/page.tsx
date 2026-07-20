"use client";

import { useEffect, useRef, useState } from "react";
import {
  RiArrowUpLine,
  RiDatabase2Line,
  RiSparkling2Line,
} from "@remixicon/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useCreateThread } from "@/hooks/use-thread";
import { useRouter } from "next/navigation";

const suggestions = [
  {
    title: "Explore Schema",
    description: "Show all tables and relationships",
  },
  {
    title: "Generate SQL",
    description: "Top 10 customers by revenue",
  },
  {
    title: "Analyze Data",
    description: "Find sales trends for this month",
  },
];

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const createdThread = useCreateThread();
  const router = useRouter();

  useEffect(() => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    textarea.style.height = "0px";
    textarea.style.height = `${Math.min(textarea.scrollHeight, 220)}px`;
  }, [message]);

  const handleSend = async () => {
    if (!message.trim()) return;

    console.log(message);
    const connection_id = localStorage.getItem("connection_id")!;
    const data = await createdThread.mutateAsync({
      connection_id,
      title: message,
    });
    router.push(`/thread/${data?.id}`);

    setMessage("");

    requestAnimationFrame(() => {
      if (!textareaRef.current) return;
      textareaRef.current.style.height = "56px";
    });
  };

  return (
    <div className="flex h-full w-full items-center justify-center px-6">
      <div className="w-full max-w-5xl space-y-8">
        {/* Hero */}
        <div className="space-y-5 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border bg-primary/5">
            <RiDatabase2Line className="text-primary" size={30} />
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">
              SQL AI Assistant
            </h1>

            <p className="mx-auto max-w-xl text-muted-foreground">
              Ask questions about your database using natural language. Generate
              SQL, inspect schemas, and analyze your data instantly.
            </p>
          </div>

          <Badge variant="secondary" className="rounded-full px-4 py-1">
            Connected Database
          </Badge>
        </div>

        {/* Chat Composer */}
        <Card className="overflow-hidden p-0 rounded-3xl border transition-all duration-200 focus-within:border-primary/40 focus-within:shadow-lg">
          <Textarea
            ref={textareaRef}
            value={message}
            rows={1}
            placeholder="Ask anything about your database..."
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            className="resize-none border-0 bg-transparent px-6 py-5 text-base shadow-none focus-visible:ring-0"
          />

          <div className="flex items-center justify-between px-5 pb-4">
            <span className="text-xs text-muted-foreground">
              Shift + Enter for a new line
            </span>

            <Button
              size="icon"
              className="rounded-full"
              disabled={!message.trim()}
              onClick={handleSend}
            >
              <RiArrowUpLine size={18} />
            </Button>
          </div>
        </Card>

        {/* Suggestions */}
        <div className="grid gap-4 md:grid-cols-3">
          {suggestions.map((item) => (
            <Card
              key={item.title}
              className="group cursor-pointer rounded-2xl p-5 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <RiSparkling2Line size={20} />
              </div>

              <h3 className="font-semibold">{item.title}</h3>

              <p className="mt-2 text-sm text-muted-foreground">
                {item.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
