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
      <div className="h-full min-h-dvh bg-gradient-to-br from-indigo-100 via-gray-100 to-blue-100 p-4">
        <Toaster richColors position="top-center" />
        <main className="h-full">{children}</main>
      </div>
    </ApolloClientProvider>
  );
}
