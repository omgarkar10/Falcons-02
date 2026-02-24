import React from "react";
import { AppSidebar } from "./AppSidebar";
import { AIChatbot } from "@/components/AIChatbot";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-6 md:p-8 max-w-7xl mx-auto">{children}</div>
      </main>
      <AIChatbot />
    </div>
  );
}
