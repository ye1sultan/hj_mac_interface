"use client";

import SectionTitle from "@/components/section-title/section-title";
import { ITranscript } from "@/types/transcript";
import React, { useEffect, useRef, useState } from "react";
// import { mockSuggestions } from "./lib/const";
import { SuggestionItem } from "./ui/suggestion-item/suggestion-item";

interface ISuggestion {
  id: number;
  text: string;
  variant: "active" | "previous";
}

export default function Suggestions({
  transcripts,
}: {
  transcripts: ITranscript[];
}) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [transcripts]);

  const [suggestions, setSuggestions] = useState<ISuggestion[]>([]);
  const [lastProcessedId, setLastProcessedId] = useState<number | null>(null);
  const [lastProcessedText, setLastProcessedText] = useState<string | null>(
    null,
  );

  useEffect(() => {
    if (transcripts.length === 0) return;

    const lastTranscript = transcripts[transcripts.length - 1];

    if (lastTranscript.sender !== "system") return;

    const currentId = lastTranscript.timestamp
      ? new Date(lastTranscript.timestamp).getTime()
      : Date.now();
    if (lastProcessedId === currentId) return;

    // Check if text is same as previous
    if (lastProcessedText === lastTranscript.text) return;

    setLastProcessedId(currentId);
    setLastProcessedText(lastTranscript.text);

    fetch("https://017e-77-240-47-29.ngrok-free.app/api/v1/voice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: lastTranscript.text }),
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        console.log("Fetched suggestions:", data);

        if (data.success && data.data?.message) {
          const parsedSuggestions: ISuggestion[] = data.data.message
            .split("\n")
            .map((line: string, index: number) => ({
              id: Date.now() + index,
              text: line
                .replace(/^\d+\.\s*/, "")
                .replace(/"/g, "")
                .trim(),
              variant: "active",
            }))
            .filter((item: ISuggestion) => item.text.length > 0);

          setSuggestions((prev) => [
            ...prev.map((item) => ({ ...item, variant: "previous" as const })),
            ...parsedSuggestions,
          ]);
        } else {
          console.warn("Invalid response structure:", data);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch suggestions:", error);
      });
  }, [transcripts, lastProcessedId, lastProcessedText]);

  if (suggestions.length === 0) {
    return (
      <div className="flex w-full flex-col">
        <SectionTitle title="Предложения" />
        <p className="text-muted-foreground text-lg font-medium">
          Предложение будут поступать как только вы начнете разговор
        </p>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col">
      <SectionTitle title="Предложения" />
      <div className="grid h-full grid-cols-3 gap-4">
        {suggestions.map(
          (suggestion, idx) =>
            suggestion.text.length <= 100 && (
              <SuggestionItem
                key={suggestion.id}
                title={`Предложение ${idx + 1}`}
                description={suggestion.text}
                variant={suggestion.variant}
              />
            ),
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}
