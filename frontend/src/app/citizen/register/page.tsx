"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { BhuRailLogo } from "@/components/ui/BhuRailLogo";
import {
  UserPlus,
  Eye,
  EyeOff,
  ArrowLeft,
  Lock,
  Smartphone,
  Mail,
  User,
  CheckCircle2,
  AlertCircle,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";

function CitizenRegisterForm() {
  const router = useRouter();
  const { registerCitizen } = useAuth();

  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim()) {
      setError("Please provide your full legal name as it appears on official land records.");
      return;
    }

    const cleanMobile = mobile.replace(/[^0-9]/g, "");
    if (cleanMobile.length < 10) {
      setError("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      setError("Please provide a valid email address for digitally signed notices.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters in length.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please verify.");
      return;
    }

    if (!agreed) {
      setError("You must acknowledge the DPI Land Governance Terms of Service to proceed.");
      return;
    }

    try {
      setLoading(true);
      await registerCitizen({
        fullName,
        mobile: `+91 ${cleanMobile.slice(-10)}`,
        email,
        password,
      });
      setIsSuccess(true);
    } catch (err: any) {
      setError(err?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto w-full flex items-center justify-between pb-6">
          <BhuRailLogo size="sm" asLink={true} href="/" />
        </div>

        <div className="max-w-md mx-auto w-full my-auto">
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-md text-center space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <Badge variant="success">Account Created</Badge>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">Registration Complete</h2>
              <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
                Citizen profile for <strong>{fullName}</strong> has been initialized in the Bhu-Rail Registry. You can now sign in to view your land holdings.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs space-y-1.5">
              <div className="flex justify-between text-slate-500">
                <span>Account ID:</span>
                <span className="font-mono font-bold text-slate-800">USR-CIT-NEW</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Primary Mobile:</span>
                <span className="font-medium text-slate-800">{mobile}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Email:</span>
                <span className="font-medium text-slate-800">{email}</span>
              </div>
            </div>

            <Button
              onClick={() => router.push("/citizen/login")}
              className="w-full justify-center bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 shadow-sm text-xs gap-2"
            >
              <span>Proceed to Citizen Login</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="max-w-md mx-auto w-full pt-8 text-center text-xs text-slate-500">
          © 2026 Bhu-Rail (भू-रेल) • Government of Haryana & National Land DPI
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between py-10 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-md mx-auto w-full flex items-center justify-between pb-6">
        <BhuRailLogo size="sm" asLink={true} href="/" />

        <Link href="/citizen/login" className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Already registered? Sign In</span>
        </Link>
      </div>

      {/* Main Card */}
      <div className="max-w-md mx-auto w-full my-auto">
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-md space-y-6">
          <div className="space-y-2 text-center">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
              <UserPlus className="w-6 h-6" />
            </div>
            <Badge variant="success">Citizen Self-Enrollment</Badge>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Create Citizen Account</h1>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Enroll to access your digital land titles, deeds, and DPI mutation services.
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Full Legal Name (as per Land Deed / Aadhaar)
              </label>
              <div className="relative">
                <Input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Suresh Chandra Yadav"
                  required
                  className="pl-9"
                />
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Primary Mobile Number (OTP verification)
              </label>
              <div className="relative">
                <Input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="e.g. 9876543210"
                  required
                  className="pl-9"
                />
                <Smartphone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Email Address (Digital Notices & E-Receipts)
              </label>
              <div className="relative">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="pl-9"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Min 8 chars"
                    required
                    className="pl-9"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    required
                    className="pl-9"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showPassword ? "Hide Passwords" : "Show Passwords"}</span>
              </button>
            </div>

            <label className="flex items-start gap-2 pt-1 text-slate-600 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span className="text-[11px] leading-snug">
                I agree to the <strong>Land DPI Service Terms</strong> and authorize spatial ledger queries for land parcels registered under my identity.
              </span>
            </label>

            <Button
              type="submit"
              loading={loading}
              className="w-full justify-center bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 shadow-sm text-xs mt-2"
            >
              Create Citizen Profile
            </Button>
          </form>

          {/* Institutional Note on Government Profiles */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 text-slate-500 flex-shrink-0 mt-0.5" />
            <span className="leading-snug">
              <strong>Government Officers:</strong> Administrative accounts cannot be registered publicly. Cadre accounts are provisioned directly by the State Directorate of Land Records.
            </span>
          </div>

          <div className="pt-2 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-600">
              Already have an account?{" "}
              <Link href="/citizen/login" className="font-bold text-emerald-700 hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto w-full pt-8 text-center text-xs text-slate-500">
        © 2026 Bhu-Rail (भू-रेल) • Government of Haryana & National Land DPI
      </div>
    </div>
  );
}

export default function CitizenRegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-xs text-slate-500">Loading Registration...</div>}>
      <CitizenRegisterForm />
    </Suspense>
  );
}
