import SectionTitle from "@/components/section-title/section-title";
import React, { useEffect, useState } from "react";
import { suggestionItems } from "./lib/const";
import { SuggestionItem } from "./ui/suggestion-item/suggestion-item";

export default function Suggestions() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrevious(currentIndex);
      setCurrentIndex((prev) => (prev + 1) % suggestionItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const currentSuggestion = suggestionItems[currentIndex];
  const previousSuggestion =
    previous !== null ? suggestionItems[previous] : null;

  return (
    <main className="flex-1 p-4">
      <SectionTitle title="Предложение" />
      <div className="space-y-4">
        {previousSuggestion && (
          <SuggestionItem
            title={previousSuggestion.group}
            description={previousSuggestion.text}
            variant="previous"
          />
        )}
        <SuggestionItem
          title={currentSuggestion.group}
          description={currentSuggestion.text}
          variant="active"
        />
      </div>
    </main>
  );
}
