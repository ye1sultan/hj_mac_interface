import SectionTitle from "@/components/section-title/section-title";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import { conversationHistory } from "./lib/const";
import { ChatBubble } from "./ui/chat-bubble/chat-bubble";

export default function ConversationSidebar() {
  return (
    <aside className="hidden w-1/3 border-l p-4 md:block">
      <SectionTitle title="История сообщений" />
      <ScrollArea className="h-full pb-16">
        <div className="flex flex-col gap-3">
          {conversationHistory.map((message, index) => (
            <ChatBubble
              key={message.id}
              sender={message.sender}
              message={message.message}
              name={message.name}
              previousSender={conversationHistory[index - 1]?.sender}
            />
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
}
