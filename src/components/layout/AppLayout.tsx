"use client";
import { Sidebar } from "./Sidebar";

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-page">
      <Sidebar />
      <main className="ml-sidebar min-h-screen">
        <div className="mx-auto max-w-container p-8">{children}</div>
      </main>
    </div>
  );
}
