"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getThreadMessages } from "@/service/api/thread";
import {
  applyStreamEvent,
  createStreamingAssistantMessage,
  parseSseEvents,
} from "@/service/api/chat-stream";
import { Message, MessageContent } from "@/components/ui/message";

const formatToolLabel = (tool: string) => {
  const normalized = tool.toLowerCase();

  if (normalized.includes("list_tables")) {
    return "Listing tables";
  }

  if (normalized.includes("get_table_schema")) {
    return "Reading schema";
  }

  if (normalized.includes("execute_sql")) {
    return "Executing SQL";
  }

  if (normalized.includes("sample")) {
    return "Getting sample values";
  }

  if (normalized.includes("explore")) {
    return "Exploring Databases";
  }

  return tool;
};
import ChatInput from "./chat-input";

interface ChatWindowProps {
  threadId?: string;
  threadData: ThreadResponse;
}

type ChatMessage =
  | {
      id: string;
      role: "user";
      message: string;
    }
  | {
      id: string;
      role: "assistant";
      message?: string;
      kind: "stream";
      status: "streaming" | "done" | "error";
      steps: Array<{ tool: string; status: "running" | "done" }>;
      structuredOutput?: {
        query?: string;
        answer?: string;
        assumptions?: string[];
        confidence?: number;
      } | null;
      error?: string;
    };

const mapServerMessage = (message: {
  id: string;
  role: "user" | "assistant";
  content?: string | null;
  structured_output?: {
    query?: string;
    answer?: string;
    assumptions?: string[];
    confidence?: number;
  } | null;
}): ChatMessage => {
  if (message.role === "user") {
    return {
      id: message.id,
      role: "user",
      message: message.content ?? "",
    };
  }

  return {
    id: message.id,
    role: "assistant",
    message: message.content ?? "",
    kind: "stream",
    status: "done",
    steps: [],
    structuredOutput: message.structured_output ?? null,
  };
};

const ChatWindow = ({ threadId, threadData }: ChatWindowProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [copiedQueryId, setCopiedQueryId] = useState<string | null>(null);
  const { getToken } = useAuth();

  // Guards against React re-running the init effect (e.g. Strict Mode double-invoke,
  // or threadData reference changes) more than once for the same thread.
  const processedThreadIdRef = useRef<string | undefined>(undefined);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const updateAssistantMessage = (
    assistantId: string,
    updater: (
      message: Extract<ChatMessage, { role: "assistant" }>,
    ) => Extract<ChatMessage, { role: "assistant" }>,
  ) => {
    setMessages((prev) =>
      prev.map((message) =>
        message.role === "assistant" && message.id === assistantId
          ? updater(message)
          : message,
      ),
    );
  };

  const handleCopyQuery = async (content: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedQueryId(messageId);

      window.setTimeout(() => {
        setCopiedQueryId((current) => (current === messageId ? null : current));
      }, 1500);
    } catch (error) {
      console.error("Failed to copy SQL", error);
    }
  };

  const renderMarkdown = (content?: string | null) => (
    <div className="space-y-2 wrap-break-word text-sm leading-6 [&_h1]:text-lg [&_h1]:font-semibold [&_h2]:text-base [&_h2]:font-semibold [&_h3]:text-sm [&_h3]:font-semibold [&_blockquote]:border-l-2 [&_blockquote]:pl-3 [&_blockquote]:text-muted-foreground [&_code]:rounded [&_code]:bg-muted/80 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[11px] [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:m-0 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-muted/80 [&_pre]:p-3 [&_pre]:text-[11px] [&_pre]:leading-5 [&_pre]:text-foreground [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content ?? ""}</ReactMarkdown>
    </div>
  );

  const handleSend = useCallback(
    async (message: string) => {
      const userMessage: ChatMessage = {
        id: `${Date.now()}-user`,
        role: "user",
        message,
      };

      const assistantId = `${Date.now()}-assistant`;
      const assistantMessage: ChatMessage =
        createStreamingAssistantMessage(assistantId);

      setMessages((prev) => [...prev, userMessage, assistantMessage]);
      setIsStreaming(true);

      try {
        const token = await getToken();
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/connections/chat`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Accept: "text/event-stream",
              ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
            body: JSON.stringify({
              message,
              thread_id: threadId,
            }),
          },
        );

        if (!response.ok || !response.body) {
          throw new Error("Unable to start chat stream");
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        const parseSseChunk = (chunk: string) => {
          const events = parseSseEvents(chunk);

          events.forEach((event) => {
            updateAssistantMessage(assistantId, (currentMessage) =>
              applyStreamEvent(currentMessage, event),
            );
          });
        };

        while (true) {
          const { value, done } = await reader.read();

          if (done) {
            break;
          }

          buffer += decoder.decode(value, { stream: true });
          const boundaryIndex = buffer.indexOf("\n\n");

          if (boundaryIndex >= 0) {
            const chunk = buffer.slice(0, boundaryIndex);
            buffer = buffer.slice(boundaryIndex + 2);
            parseSseChunk(chunk);
          }
        }

        buffer += decoder.decode();
        if (buffer.trim()) {
          parseSseChunk(buffer);
        }
      } catch (error) {
        updateAssistantMessage(assistantId, (currentMessage) => ({
          ...currentMessage,
          status: "error",
          error:
            error instanceof Error ? error.message : "Something went wrong",
        }));
      } finally {
        setIsStreaming(false);
      }
    },
    [getToken, threadId],
  );

  // Single init effect per thread: load any existing messages, and only
  // auto-send the thread title as the first message if the thread is empty.
  // The ref guard ensures this runs exactly once per threadId, so it can't
  // race with itself or re-fire when `messages` changes during streaming.
  useEffect(() => {
    if (!threadId) {
      return;
    }

    if (processedThreadIdRef.current === threadId) {
      return;
    }
    processedThreadIdRef.current = threadId;

    (async () => {
      try {
        const response = await getThreadMessages(threadId);

        if (response && response.length > 0) {
          setMessages(response.map(mapServerMessage));
        } else if (threadData?.title) {
          handleSend(threadData.title);
        }
      } catch (error) {
        console.error("Failed to load thread messages", error);
      }
    })();
  }, [threadId, threadData?.title, handleSend]);

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-4xl flex-col gap-4">
          {messages.map((message) => {
            const isUser = message.role === "user";

            return (
              <div
                key={message.id}
                className={`flex ${isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`w-full ${isUser ? "flex justify-end" : "flex justify-start"}`}
                >
                  <div
                    className={`max-w-[min(${isUser ? "78%" : "92%"},${isUser ? "30rem" : "48rem"})] ${isUser ? "ml-auto" : "mr-auto"}`}
                  >
                    <Message align={isUser ? "end" : "start"}>
                      <MessageContent
                        className={isUser ? "items-end" : "items-start"}
                      >
                        {isUser ? (
                          <div className="w-fit max-w-full rounded-2xl rounded-br-md bg-primary px-3.5 py-2.5 text-sm leading-6 text-primary-foreground shadow-sm wrap-break-word">
                            {renderMarkdown(message.message)}
                          </div>
                        ) : (
                          <div className="w-fit max-w-full rounded-2xl rounded-bl-md  p-3 text-sm shadow-sm wrap-break-word">
                            {message.kind === "stream" ? (
                              <div className="space-y-3">
                                <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                                  <span className="h-2 w-2 rounded-full bg-primary" />
                                  {message.status === "streaming"
                                    ? "Streaming response"
                                    : message.status === "error"
                                      ? "Stream failed"
                                      : "Response ready"}
                                </div>

                                {message.steps.length > 0 && (
                                  <div className="space-y-2 rounded-xl border border-border/60 bg-background/70 p-3">
                                    <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                                      Steps Taken
                                    </p>
                                    <ul className="space-y-2">
                                      {message.steps.map((step, index) => (
                                        <li
                                          key={`${step.tool}-${index}`}
                                          className="flex items-center gap-2 text-sm"
                                        >
                                          <span
                                            className={`h-2 w-2 rounded-full ${step.status === "done" ? "bg-emerald-500" : "bg-amber-500"}`}
                                          />
                                          <span>
                                            {formatToolLabel(step.tool)}
                                          </span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {message.structuredOutput &&
                                (message.structuredOutput.answer ||
                                  message.structuredOutput.query ||
                                  message.structuredOutput.assumptions
                                    ?.length) ? (
                                  <div className="space-y-2 rounded-xl p-3">
                                    <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                                      Summarized Answer
                                    </p>
                                    {message.structuredOutput.answer && (
                                      <div className="text-sm leading-6">
                                        {renderMarkdown(
                                          message.structuredOutput.answer,
                                        )}
                                      </div>
                                    )}
                                    {message.structuredOutput.query && (
                                      <div className="space-y-2">
                                        <div className="flex items-center justify-between gap-2">
                                          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                                            SQL
                                          </p>
                                          <button
                                            type="button"
                                            onClick={() =>
                                              handleCopyQuery(
                                                message.structuredOutput!
                                                  .query!,
                                                message.id,
                                              )
                                            }
                                            className="rounded-full border border-border/70 px-2.5 py-1 text-[11px] font-medium text-muted-foreground transition hover:border-primary hover:text-primary"
                                          >
                                            {copiedQueryId === message.id
                                              ? "Copied"
                                              : "Copy SQL"}
                                          </button>
                                        </div>
                                        <pre className="overflow-x-auto whitespace-pre-wrap wrap-break-word rounded-lg bg-muted/70 p-2 text-[11px] leading-5 text-muted-foreground">
                                          {message.structuredOutput.query}
                                        </pre>
                                      </div>
                                    )}
                                    {message.structuredOutput.assumptions
                                      ?.length ? (
                                      <div className="space-y-3 mt-3">
                                        <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                                          Assumptions
                                        </p>

                                        <ul className="space-y-1 text-xs text-muted-foreground">
                                          {message.structuredOutput.assumptions.map(
                                            (item, index) => (
                                              <li key={`${item}-${index}`}>
                                                • {item}
                                              </li>
                                            ),
                                          )}
                                        </ul>
                                      </div>
                                    ) : null}
                                  </div>
                                ) : null}

                                {message.error && (
                                  <p className="text-sm text-destructive">
                                    {message.error}
                                  </p>
                                )}
                              </div>
                            ) : (
                              <div className="text-sm leading-6">
                                {renderMarkdown(
                                  message.message ?? "No response yet",
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </MessageContent>
                    </Message>
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <ChatInput onSend={handleSend} disabled={isStreaming} />
    </div>
  );
};

export default ChatWindow;
