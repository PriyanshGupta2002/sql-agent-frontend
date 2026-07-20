import ChatWindow from "@/components/thread/chat-window";
import ThreadHeader from "@/components/thread/thread-header";
import { getThreadInfo } from "@/service/api/thread";
import React from "react";

const ThreadPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const data = await getThreadInfo(id);

  return (
    <div className="flex h-[100dvh] flex-col overflow-hidden">
      <ThreadHeader threadData={data} />
      <ChatWindow threadId={id} threadData={data} />
    </div>
  );
};

export default ThreadPage;
