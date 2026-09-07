"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Determine if active route is a public standalone page
  const isPublicPage =
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/citizen/login" ||
    pathname === "/government/login" ||
    pathname === "/citizen/register" ||
    pathname === "/forgot-password" ||
    pathname === "/login/citizen" ||
    pathname === "/login/government";

  if (isPublicPage) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <div className="flex-1">{children}</div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        <Sidebar />
        <main className="flex-1 w-full min-w-0 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
          {children}
        </main>
      </div>
      <MobileNav />
      <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500 hidden lg:block">
        Bhu-Rail (भू-रेल) Land Digital Public Infrastructure • National Land Governance DPI • Open API v1
      </footer>
    </>
  );
}
