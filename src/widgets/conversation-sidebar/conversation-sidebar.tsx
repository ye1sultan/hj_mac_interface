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

  return (
    <aside className="h-full w-1/4 border-l p-4 pb-16">
      <SectionTitle title="История сообщений" />
      <ScrollArea className="h-full">
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
    </aside>
  );
}
