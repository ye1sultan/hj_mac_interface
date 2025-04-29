// import LangToggle from "@/components/LangToggle";
// import ToggleTheme from "@/components/ToggleTheme";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RecordingControl } from "@/features/recording-control/recording-control";
import { IAnalysisData } from "@/types/analyze";
import { ITranscript } from "@/types/transcript";
import ConversationAnalyze from "@/widgets/conversation-analyze/conversation-analyze";
import ConversationSidebar from "@/widgets/conversation-sidebar/conversation-sidebar";
// import { mockTranscripts } from "@/widgets/conversation-sidebar/lib/const";
import Suggestions from "@/widgets/suggestions/suggestions";
import React, { useState } from "react";
// import { mockAnalysisData } from "./lib/const";

export default function HomePage() {
  const [transcripts, setTranscripts] = useState<ITranscript[]>([]);
  const [analyzeData, setAnalyzeData] = useState<IAnalysisData | null>(null);

  return (
    <div className="flex h-full flex-col">
      {/* <div className="draglayer h-4"></div> */}
      <div className="flex h-full w-full flex-col items-start gap-4">
        <div className="flex h-1/2 w-full flex-col">
          <RecordingControl
            transcripts={transcripts}
            setTranscripts={setTranscripts}
            setAnalyzeData={setAnalyzeData}
          />
          <div className="flex h-full w-full flex-row gap-4">
            <ScrollArea className="flex h-full max-h-[40vh] w-full flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-md">
              <Suggestions transcripts={transcripts} />
            </ScrollArea>
            <ConversationSidebar transcripts={transcripts} />
          </div>
        </div>
        <ScrollArea className="flex h-full max-h-[45vh] w-full flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg backdrop-blur-md">
          <ConversationAnalyze analyzeData={analyzeData} />
        </ScrollArea>
      </div>
    </div>
  );
}
