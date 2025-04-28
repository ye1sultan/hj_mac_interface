"use client";

import SectionTitle from "@/components/section-title/section-title";
import { ITranscript } from "@/types/transcript";
import React, { useEffect, useState } from "react";
import { SuggestionItem } from "./ui/suggestion-item/suggestion-item";

interface ISuggestion {
  id: number;
  text: string;
}

export default function Suggestions({
  transcripts,
}: {
  transcripts: ITranscript[];
}) {
  const [suggestions, setSuggestions] = useState<ISuggestion[]>([]);

  useEffect(() => {
    if (transcripts.length === 0) return;

    const lastTranscript = transcripts[transcripts.length - 1];

    if (lastTranscript.sender !== "system") return;

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
          const parsedSuggestions = data.data.message
            .split("\n")
            .map((line: string, index: number) => ({
              id: Date.now() + index,
              text: line
                .replace(/^\d+\.\s*/, "")
                .replace(/"/g, "")
                .trim(),
            }))
            .filter((item: ISuggestion) => item.text.length > 0);

          setSuggestions((prev) => [...prev, ...parsedSuggestions]);
        } else {
          console.warn("Invalid response structure:", data);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch suggestions:", error);
      });
  }, [transcripts]);

  return (
    <main className="flex w-full flex-col p-4 pb-16">
      <SectionTitle title="Предложения" />
      <div className="flex h-full flex-col gap-4">
        {suggestions.map((suggestion, idx) => (
          <SuggestionItem
            key={suggestion.id}
            title={`Предложение ${idx + 1}`}
            description={suggestion.text}
            variant="active" // or differentiate if you want
          />
        ))}
      </div>
    </main>
  );
}
