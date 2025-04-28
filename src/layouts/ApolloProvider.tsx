"use client";

import { apolloClient } from "@/config/apollo";
import { ApolloProvider } from "@apollo/client";
import React from "react";

export function ApolloClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
