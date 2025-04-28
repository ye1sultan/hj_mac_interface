import DragWindowRegion from "@/components/DragWindowRegion";
import Footer from "@/components/template/Footer";
import React from "react";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col p-4 pb-12">
      <DragWindowRegion />
      <main className="h-full">{children}</main>
      <Footer />
    </div>
  );
}
