// lib/query-keys.ts

export const queryKeys = {
  user: ["user"] as const,

  connections: ["connections"] as const,

  threads: (connectionId: string) => ["threads", connectionId] as const,

  messages: (threadId: string) => ["messages", threadId] as const,
};
