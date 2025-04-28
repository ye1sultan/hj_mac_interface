import { ISender } from "@/types/sender";
import { cn } from "@/utils/tailwind";
import React from "react";

interface ChatBubbleProps {
  sender: ISender;
  message: string;
  name: string;
  timestamp: string;
}

export function ChatBubble({
  sender,
  message,
  name,
  timestamp,
}: ChatBubbleProps) {
  const isUser = sender === "user";

  return (
    <div
      className={cn(
        "flex flex-col gap-1",
        isUser ? "items-end" : "items-start",
      )}
    >
      <div
        className={cn(
          "max-w-[75%] rounded-xl px-4 py-2 text-sm",
          isUser ? "bg-primary text-primary-foreground" : "bg-muted",
        )}
      >
        {message}
      </div>
      <div className="flex items-center gap-2">
        <div className="text-muted-foreground text-xs">{name}</div>
        <div className="text-muted-foreground text-xs">{timestamp}</div>
      </div>
    </div>
  );
}
