import { RecordingControl } from "@/features/recording-control/recording-control";
import { ITranscript } from "@/types/transcript";
import ConversationSidebar from "@/widgets/conversation-sidebar/conversation-sidebar";
import Suggestions from "@/widgets/suggestions/suggestions";
import React, { useState } from "react";

export default function HomePage() {
  const [transcripts, setTranscripts] = useState<ITranscript[]>([]);

  return (
    <div className="flex h-full flex-col">
      <div className="draglayer border-b p-4">
        <div className="text-xl font-semibold">AI Call Assistant</div>
      </div>

      <div className="flex h-full flex-1 overflow-hidden">
        <div className="mt-auto flex w-full flex-col gap-4">
          <Suggestions transcripts={transcripts} />
          <RecordingControl
            transcripts={transcripts}
            setTranscripts={setTranscripts}
          />
        </div>

        <ConversationSidebar transcripts={transcripts} />
      </div>
    </div>
  );
}
