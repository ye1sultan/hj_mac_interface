import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ConversationSidebar from "@/widgets/conversation-sidebar/conversation-sidebar";
import Suggestions from "@/widgets/suggestions/suggestions";
import React from "react";

export default function HomePage() {
  return (
    <div className="flex h-screen flex-col">
      <div className="flex items-center justify-between border-b p-4">
        <div className="text-xl font-semibold">AI Call Assistant</div>
        <Select>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Выберите режим" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">По умолчанию</SelectItem>
            <SelectItem value="aggressive">Агрессивный продавец</SelectItem>
            <SelectItem value="friendly">Дружелюбный консультант</SelectItem>
            <SelectItem value="consultative">
              Консультант по продажам
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <Suggestions />
        <ConversationSidebar />
      </div>
    </div>
  );
}
