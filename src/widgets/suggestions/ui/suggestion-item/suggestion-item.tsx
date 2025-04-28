import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Bell } from "lucide-react";
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
    <Alert
      variant={variant === "active" ? "primary" : "disabled"}
      className="cursor-pointer"
    >
      <Bell className="h-4 w-4" />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
