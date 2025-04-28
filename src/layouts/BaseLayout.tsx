import Footer from "@/components/template/Footer";
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
      <div className="flex h-screen flex-col p-4">
        <Toaster richColors position="top-center" />
        <main className="h-full">{children}</main>
        <Footer />
      </div>
    </ApolloClientProvider>
  );
}
