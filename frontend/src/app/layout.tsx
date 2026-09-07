import type { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";
import { AppShell } from "@/components/layout/AppShell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bhu-Rail (भू-रेल) | Integrated Land Governance DPI Platform",
  description: "Bhu-Rail (भू-रेल) - Integrated GIS-based Digital Public Infrastructure for Land Governance, Cadastral Mapping, and Instant Land Verification.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col antialiased">
        <AuthProvider>
          <AppShell>{children}</AppShell>
        </AuthProvider>
      </body>
    </html>
  );
}
