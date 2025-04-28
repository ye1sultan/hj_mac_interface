import { Toaster } from "@/components/ui/sonner";
import React from "react";
import { ApolloClientProvider } from "./ApolloProvider";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ApolloClientProvider>
      <div className="min-h-dvh h-full bg-gradient-to-br from-indigo-200 via-gray-200 to-blue-200 p-4">
        <Toaster richColors position="top-center" />
        <main className="h-full">{children}</main>
      </div>
    </ApolloClientProvider>
  );
}
