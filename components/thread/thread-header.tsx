"use client";
import { formatCreatedAt } from "@/lib/utils";
import React, { FC } from "react";

interface ThreadHeaderProps {
  threadData: ThreadResponse;
}

const ThreadHeader: FC<ThreadHeaderProps> = ({ threadData }) => {
  return (
    <div className="flex items-center gap-2 bg-zinc-500/25 p-4">
      <div className="flex flex-col gap-1">
        <span className="text-xl">{threadData?.title}</span>
        <span className="text-sm text-accent-foreground">
          {formatCreatedAt(threadData?.created_at)}
        </span>
      </div>
    </div>
  );
};

export default ThreadHeader;
