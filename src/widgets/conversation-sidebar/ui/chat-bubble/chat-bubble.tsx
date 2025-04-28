import { formatRussianDateTime } from "@/helpers/formatDate";
import { ISender } from "@/types/sender";
import { cn } from "@/utils/tailwind";
import React from "react";

interface ChatBubbleProps {
  sender: ISender;
  message: string;
  name: string;
  timestamp: string;
  isLast: boolean;
}

export function ChatBubble({
  sender,
  message,
  name,
  timestamp,
  isLast,
}: ChatBubbleProps) {
  const isUser = sender === "user";
  const adminName = localStorage.getItem("adminName");

  return (
    <div
      className={cn(
        "flex flex-col gap-1",
        isUser ? "items-end" : "items-start",
        isLast && "mb-4",
      )}
    >
      <div
        className={cn(
          "flex max-w-[75%] flex-col gap-1 rounded-2xl px-4 py-2 text-sm shadow-lg backdrop-blur-lg",
          isUser
            ? "border border-white/20 bg-indigo-500/70 text-neutral-50"
            : "border border-white/10 bg-white/10 text-neutral-800",
        )}
      >
        {message}
        <span
          className={cn(
            "self-end text-xs",
            isUser ? "text-neutral-300" : "text-neutral-400",
          )}
        >
          {formatRussianDateTime(timestamp)} - {isUser ? adminName : 'Клиент'}
        </span>
      </div>
    </div>
  );
}
