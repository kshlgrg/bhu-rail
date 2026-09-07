"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { DEMO_OFFICER } from "@/services/authService";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { BhuRailLogo } from "@/components/ui/BhuRailLogo";
import {
  ShieldCheck,
  Eye,
  EyeOff,
  ArrowLeft,
  Lock,
  Building2,
  BadgeCheck,
  AlertCircle,
  Zap,
  Fingerprint,
} from "lucide-react";

const DEPARTMENTS = [
  "Department of Land Records & Revenue",
  "Survey & Land Settlement Agency",
  "Town & Country Planning Authority",
  "Revenue Appellate & Disputes Tribunal",
  "Registration & Stamp Duty Authority",
];

function GovernmentLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawReturnUrl = searchParams.get("returnUrl");
  const returnUrl = (rawReturnUrl && !rawReturnUrl.startsWith("/citizen") && rawReturnUrl !== "/dashboard/citizen")
    ? rawReturnUrl
    : "/government/dashboard";

  const { loginGovernment } = useAuth();

  const [officerId, setOfficerId] = useState("");
  const [department, setDepartment] = useState(DEPARTMENTS[0]);
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!officerId.trim()) {
      setError("Please enter your Official Email or Officer Cadre ID.");
      return;
    }
    if (!password) {
      setError("Please enter your official password.");
      return;
    }

    try {
      setLoading(true);
      await loginGovernment({ officerId, department, password, rememberMe }, returnUrl);
    } catch (err: any) {
      setError(err?.message || "Officer authentication failed. Verify cadre credentials.");
    } finally {
      setLoading(false);
    }
  };

  const fillDemoOfficer = () => {
    setOfficerId(DEMO_OFFICER.officerId);
    setDepartment(DEPARTMENTS[0]);
    setPassword("Officer@123");
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
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center mx-auto shadow-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <Badge variant="info">Government Administration Gateway</Badge>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Officer Portal</h1>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Authorised Revenue, Survey & Land Administration Personnel Only.
            </p>
          </div>

          {/* Quick Demo Credentials Pill */}
          <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200 text-xs flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-blue-900 font-medium">
              <Zap className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
              <span>Evaluation Mode:</span>
            </div>
            <button
              type="button"
              onClick={fillDemoOfficer}
              className="px-2.5 py-1 rounded bg-white hover:bg-blue-100 border border-blue-300 font-bold text-blue-800 text-[11px] shadow-2xs transition-colors"
            >
              Fill Demo Officer
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
                Official Email or Officer ID
              </label>
              <div className="relative">
                <Input
                  type="text"
                  value={officerId}
                  onChange={(e) => setOfficerId(e.target.value)}
                  placeholder="e.g. HR-REV-GGM-0842 or name@revenue.gov.in"
                  required
                  className="pl-9"
                />
                <BadgeCheck className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Cadre / Department
              </label>
              <div className="relative">
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full h-9 pl-9 pr-3 rounded-lg border border-slate-300 bg-white text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                >
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
                <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Security Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your administrative password"
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
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span>Keep session active (8 hrs)</span>
              </label>

              <Link
                href="/forgot-password"
                className="font-semibold text-blue-700 hover:text-blue-800 hover:underline"
              >
                Reset Key
              </Link>
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              loading={loading}
              className="w-full justify-center bg-blue-700 hover:bg-blue-800 text-white font-bold py-2.5 shadow-sm text-xs mt-2"
            >
              Sign In to Command Center
            </Button>
          </form>

          {/* Institutional Warning */}
          <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 text-[11px] text-amber-900 flex items-start gap-2">
            <Fingerprint className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
            <span className="leading-snug">
              <strong>Official Notice:</strong> Unauthorized access to sovereign land records is punishable under Section 43 & 66 of the IT Act. All activity is cryptographically recorded.
            </span>
          </div>

          {/* Alternate Login */}
          <div className="pt-2 border-t border-slate-100 text-center space-y-2">
            <Link
              href="/citizen/login"
              className="text-[11px] font-semibold text-slate-500 hover:text-slate-800 transition-colors"
            >
              Are you a landowner or citizen? Sign in to Citizen Portal &rarr;
            </Link>
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

export default function GovernmentLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-xs text-slate-500">Loading Officer Portal...</div>}>
      <GovernmentLoginForm />
    </Suspense>
  );
}
