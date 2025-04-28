import { ScrollArea } from "@/components/ui/scroll-area";
import { RecordingControl } from "@/features/recording-control/recording-control";
import { IAnalysisData } from "@/types/analyze";
import { ITranscript } from "@/types/transcript";
import ConversationAnalyze from "@/widgets/conversation-analyze/conversation-analyze";
import ConversationSidebar from "@/widgets/conversation-sidebar/conversation-sidebar";
import Suggestions from "@/widgets/suggestions/suggestions";
import React, { useState } from "react";

export default function HomePage() {
  const [transcripts, setTranscripts] = useState<ITranscript[]>([]);
  const [analyzeData, setAnalyzeData] = useState<IAnalysisData | null>(null);

  return (
    <div className="flex h-full flex-col">
      <div className="draglayer border-b p-4">
        <div className="text-xl font-semibold">AI Call Assistant</div>
      </div>

      <div className="flex h-full flex-1 overflow-hidden">
        <ScrollArea className="flex w-full flex-col gap-4">
          <Suggestions transcripts={transcripts} />
          {analyzeData && <ConversationAnalyze analyzeData={analyzeData} />}
          <RecordingControl
            transcripts={transcripts}
            setTranscripts={setTranscripts}
            setAnalyzeData={setAnalyzeData}
          />
        </ScrollArea>

        <ConversationSidebar transcripts={transcripts} />
      </div>
    </div>
  );
}
