"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { DEMO_CITIZEN } from "@/services/authService";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { BhuRailLogo } from "@/components/ui/BhuRailLogo";
import {
  UserCheck,
  Eye,
  EyeOff,
  ArrowLeft,
  Lock,
  Smartphone,
  CheckCircle2,
  AlertCircle,
  Zap,
} from "lucide-react";

function CitizenLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawReturnUrl = searchParams.get("returnUrl");
  const returnUrl = (rawReturnUrl && !rawReturnUrl.startsWith("/government") && rawReturnUrl !== "/dashboard/government")
    ? rawReturnUrl
    : "/citizen/dashboard";

  const { loginCitizen } = useAuth();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!identifier.trim()) {
      setError("Please enter your Mobile Number or Email.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);
      await loginCitizen({ identifier, password, rememberMe }, returnUrl);
    } catch (err: any) {
      setError(err?.message || "Authentication failed. Please verify credentials.");
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = () => {
    setIdentifier(DEMO_CITIZEN.mobile);
    setPassword("Password@123");
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between py-10 px-4 sm:px-6 lg:px-8">
      {/* Top Header */}
      <div className="max-w-md mx-auto w-full flex items-center justify-between pb-6">
        <BhuRailLogo size="sm" asLink={true} href="/" />

        <Link href="/" className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Main Login Card */}
      <div className="max-w-md mx-auto w-full my-auto">
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-md space-y-6">
          {/* Header */}
          <div className="space-y-2 text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
              <UserCheck className="w-6 h-6" />
            </div>
            <Badge variant="success">Citizen Services Gateway</Badge>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Citizen Portal</h1>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Securely access your land records and digital services.
            </p>
          </div>

          {/* Quick Demo Credentials Pill */}
          <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-emerald-900 font-medium">
              <Zap className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              <span>Evaluation Mode:</span>
            </div>
            <button
              type="button"
              onClick={fillDemoCredentials}
              className="px-2.5 py-1 rounded bg-white hover:bg-emerald-100 border border-emerald-300 font-bold text-emerald-800 text-[11px] shadow-2xs transition-colors"
            >
              Fill Demo Citizen
            </button>
          </div>

          {/* Error Message Alert */}
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Mobile Number / Email
              </label>
              <div className="relative">
                <Input
                  type="text"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="e.g. +91 98765 43210 or name@example.com"
                  required
                  className="pl-9"
                />
                <Smartphone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your account password"
                  required
                  className="pl-9 pr-10"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-700"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Options Row */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-slate-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span>Remember me</span>
              </label>

              <Link
                href="/forgot-password"
                className="font-semibold text-emerald-700 hover:text-emerald-800 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              loading={loading}
              className="w-full justify-center bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 shadow-sm text-xs mt-2"
            >
              Sign In
            </Button>
          </form>

          {/* Alternate Login / Registration */}
          <div className="pt-4 border-t border-slate-100 text-center space-y-3">
            <p className="text-xs text-slate-600">
              New to Bhu-Rail?{" "}
              <Link href="/citizen/register" className="font-bold text-emerald-700 hover:underline">
                Create Citizen Account
              </Link>
            </p>

            <div className="pt-2">
              <Link
                href="/government/login"
                className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 transition-colors"
              >
                Are you a Government Officer? Sign in here &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-md mx-auto w-full pt-8 text-center text-xs text-slate-500">
        © 2026 Bhu-Rail (भू-रेल) • Government of Haryana & National Land DPI
      </div>
    </div>
  );
}

export default function CitizenLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-xs text-slate-500">Loading Citizen Portal...</div>}>
      <CitizenLoginForm />
    </Suspense>
  );
}
