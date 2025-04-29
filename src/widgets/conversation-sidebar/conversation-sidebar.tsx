import SectionTitle from "@/components/section-title/section-title";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ISender } from "@/types/sender";
import { ITranscript } from "@/types/transcript";
import React, { useEffect, useRef } from "react";
import { ChatBubble } from "./ui/chat-bubble/chat-bubble";

interface ConversationSidebarProps {
  transcripts: ITranscript[];
}

export default function ConversationSidebar({
  transcripts,
}: ConversationSidebarProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [transcripts]);

  if (transcripts.length === 0) {
    return (
      <ScrollArea className="flex h-full max-h-[40vh] w-full flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-md">
        <SectionTitle title="История сообщений" />
        <p className="text-muted-foreground text-lg font-medium">
          История разговора будет отображаться здесь
        </p>
      </ScrollArea>
    );
  }

  console.log(transcripts);

  return (
    <ScrollArea className="flex h-full max-h-[40vh] w-full flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-md">
      <SectionTitle title="История сообщений" />
      <div className="flex h-full flex-col gap-3">
        {transcripts.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-gray-500">
            <p>Нет сообщений :(</p>
            <p className="text-sm">Начните запись чтобы увидеть историю</p>
          </div>
        ) : (
          <>
            {transcripts.map((message, index) => (
              <ChatBubble
                key={index}
                isLast={index === transcripts.length - 1}
                sender={message.sender as ISender}
                message={message.text}
                name={message.sender}
                timestamp={message.timestamp}
              />
            ))}
            <div ref={bottomRef} />
          </>
        )}
      </div>
    </ScrollArea>
  );
}
