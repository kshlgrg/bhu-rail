"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ShieldAlert, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: Array<"citizen" | "government" | "admin" | "CITIZEN" | "GOVERNMENT_OFFICER" | "ADMIN">;
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, role, rawRole, isInitialized } = useAuth();

  useEffect(() => {
    if (!isInitialized) return;

    if (!isAuthenticated) {
      router.push(`/login?returnUrl=${encodeURIComponent(pathname)}`);
    }
  }, [isAuthenticated, isInitialized, pathname, router]);

  if (!isInitialized) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center space-y-3">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        <p className="text-xs text-slate-500 font-medium">Authenticating secure session...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 text-center space-y-3">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        <p className="text-xs text-slate-500 font-medium">Redirecting to portal authentication...</p>
      </div>
    );
  }

  // Check role authorization if specified
  if (allowedRoles && allowedRoles.length > 0) {
    const isAuthorized = allowedRoles.some(
      (r) =>
        r.toLowerCase() === role.toLowerCase() ||
        r.toUpperCase() === rawRole.toUpperCase() ||
        role === "admin" ||
        rawRole === "ADMIN" ||
        (role === "government" && (r.toLowerCase() === "citizen" || r.toUpperCase() === "CITIZEN"))
    );

    if (!isAuthorized) {
      const designatedDashboard = role === "government" ? "/government/dashboard" : "/citizen/dashboard";
      return (
        <div className="max-w-md mx-auto my-12 p-6 rounded-2xl border border-rose-200 bg-white shadow-sm text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mx-auto">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900">Access Restricted</h3>
            <p className="text-xs text-slate-600 mt-1 leading-relaxed">
              Your active account credentials do not hold permissions for this administrative module.
            </p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => router.push(designatedDashboard)}
            className="w-full gap-2 font-bold"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Your Dashboard</span>
          </Button>
        </div>
      );
    }
  }

  return <>{children}</>;
}
