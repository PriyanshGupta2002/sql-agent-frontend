"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSend, disabled = false }: ChatInputProps) => {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    const trimmed = value.trim();

    if (!trimmed || disabled) {
      return;
    }

    onSend(trimmed);
    setValue("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="border-t border-border/60 bg-background/80 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex max-w-3xl items-end gap-2 rounded-2xl border border-border/70 bg-background/90 p-2 shadow-sm">
        <Textarea
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything..."
          rows={1}
          className="min-h-0 border-0 bg-transparent px-2 py-2 shadow-none focus-visible:ring-0"
        />
        <Button
          type="button"
          size="icon"
          onClick={handleSubmit}
          disabled={disabled || !value.trim()}
          className="h-10 w-10 shrink-0 rounded-full"
        >
          <span className="text-sm font-semibold">↑</span>
        </Button>
      </div>
      <p className="mx-auto mt-2 max-w-3xl text-[11px] text-muted-foreground">
        Press Enter to send, Shift + Enter for a new line.
      </p>
    </div>
  );
};

export default ChatInput;
