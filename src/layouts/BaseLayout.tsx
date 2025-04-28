import DragWindowRegion from "@/components/DragWindowRegion";
import LangToggle from "@/components/LangToggle";
import ToggleTheme from "@/components/ToggleTheme";
import Footer from "@/components/template/Footer";
import NavigationMenu from "@/components/template/NavigationMenu";
import React from "react";

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col p-4">
      <DragWindowRegion />
      <div className="flex items-center justify-between">
        <NavigationMenu />
        <div className="flex items-center gap-2">
          <LangToggle />
          <ToggleTheme />
        </div>
      </div>
      <main className="h-full">{children}</main>
      <Footer />
    </div>
  );
}
