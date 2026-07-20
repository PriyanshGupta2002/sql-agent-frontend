export interface StreamToolStep {
  tool: string;
  status: "running" | "done";
}

export interface StreamStructuredOutput {
  query?: string;
  answer?: string;
  assumptions?: string[];
  confidence?: number;
}

export interface StreamAssistantMessage {
  id: string;
  role: "assistant";
  kind: "stream";
  status: "streaming" | "done" | "error";
  steps: StreamToolStep[];
  structuredOutput?: StreamStructuredOutput | null;
  error?: string;
}

export interface ChatStreamEvent {
  event: string;
  data: Record<string, unknown>;
}

export const parseSseEvents = (chunk: string) => {
  const events: ChatStreamEvent[] = [];
  const blocks = chunk.split("\n\n").filter(Boolean);

  blocks.forEach((block) => {
    const lines = block.split("\n");
    let eventName = "message";
    let data = "";

    lines.forEach((line) => {
      if (line.startsWith("event:")) {
        eventName = line.replace("event:", "").trim();
      } else if (line.startsWith("data:")) {
        data += `${data ? "\n" : ""}${line.replace("data:", "").trim()}`;
      }
    });

    if (!data) {
      return;
    }

    try {
      events.push({
        event: eventName,
        data: JSON.parse(data),
      });
    } catch (error) {
      console.error("Failed to parse SSE event", error);
    }
  });

  return events;
};

export const applyStreamEvent = (
  message: StreamAssistantMessage,
  event: ChatStreamEvent,
): StreamAssistantMessage => {
  const payload = event.data;

  if (event.event === "tool_start") {
    const existing = message.steps.findIndex(
      (step) => step.tool === payload.tool && step.status === "running",
    );

    if (existing >= 0) {
      return message;
    }

    return {
      ...message,
      steps: [
        ...message.steps,
        { tool: String(payload.tool), status: "running" },
      ],
    };
  }

  if (event.event === "tool_end") {
    const existing = message.steps.findIndex(
      (step) => step.tool === payload.tool && step.status === "running",
    );

    if (existing >= 0) {
      const nextSteps = [...message.steps];
      nextSteps[existing] = { ...nextSteps[existing], status: "done" };
      return { ...message, steps: nextSteps };
    }

    return {
      ...message,
      steps: [...message.steps, { tool: String(payload.tool), status: "done" }],
    };
  }

  if (event.event === "structured_output") {
    return {
      ...message,
      structuredOutput: payload as StreamStructuredOutput,
      status: "done",
    };
  }

  if (event.event === "done") {
    return { ...message, status: "done" };
  }

  return message;
};

export const createStreamingAssistantMessage = (
  assistantId: string,
): StreamAssistantMessage => ({
  id: assistantId,
  role: "assistant",
  kind: "stream",
  status: "streaming",
  steps: [],
  structuredOutput: null,
});
