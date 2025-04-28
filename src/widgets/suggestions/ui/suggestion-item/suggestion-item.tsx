import { IconCloudStar, IconCloudX } from "@tabler/icons-react";
import React from "react";

interface SuggestionItemProps {
  title: string;
  description: string;
  variant?: "active" | "previous";
}

export function SuggestionItem({
  title,
  description,
  variant = "active",
}: SuggestionItemProps) {
  return (
    <div
      className={`flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-md backdrop-blur-md transition hover:shadow-lg ${
        variant === "previous" ? "opacity-30" : "opacity-100"
      }`}
    >
      <div className="flex items-center gap-2">
        {variant === "previous" ? (
          <IconCloudX size={24} className="text-indigo-400" />
        ) : (
          <IconCloudStar size={24} className="text-indigo-400" />
        )}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  );
}
