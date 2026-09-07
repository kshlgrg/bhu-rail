"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function DashboardRedirectPage() {
  const router = useRouter();
  const { role, isAuthenticated, isInitialized } = useAuth();

  useEffect(() => {
    if (!isInitialized) return;
    if (!isAuthenticated) {
      router.replace("/login");
    } else if (role === "government" || role === "admin") {
      router.replace("/government/dashboard");
    } else {
      router.replace("/citizen/dashboard");
    }
  }, [isInitialized, isAuthenticated, role, router]);

  return (
    <div className="min-h-[50vh] flex items-center justify-center text-xs text-slate-500 font-medium">
      Redirecting to your dashboard...
    </div>
  );
}
