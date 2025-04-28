import { ISender } from "@/types/sender";
import React from "react";

interface ChatBubbleProps {
  sender: ISender;
  message: string;
  name: string;
  previousSender?: ISender;
}

export function ChatBubble({
  sender,
  message,
  previousSender,
  name,
}: ChatBubbleProps) {
  const isUser = sender === "user";
  const isConsecutive = previousSender === sender;

  return (
    <div
      className={`flex flex-col gap-1 ${isUser ? "items-end" : "items-start"}`}
    >
      <div
        className={`max-w-[75%] rounded-xl px-4 py-2 text-sm ${isUser ? "bg-primary text-primary-foreground" : "bg-muted"} ${
          isConsecutive ? "rounded-br-none" : "rounded-br-xl"
        }`}
      >
        {message}
      </div>
      <div className="text-muted-foreground text-xs">{name}</div>
    </div>
  );
}
