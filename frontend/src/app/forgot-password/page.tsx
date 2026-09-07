"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { BhuRailLogo } from "@/components/ui/BhuRailLogo";
import {
  KeyRound,
  ArrowLeft,
  Mail,
  Smartphone,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Clock,
  RotateCcw,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

function ForgotPasswordContent() {
  const router = useRouter();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [identifier, setIdentifier] = useState("");
  const [maskedTarget, setMaskedTarget] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // OTP Timer countdown
  useEffect(() => {
    let interval: any;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // Step 1: Submit Identifier
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!identifier.trim()) {
      setError("Please enter your registered Mobile, Email, or Officer ID.");
      return;
    }

    try {
      setLoading(true);
      const res = await authService.requestPasswordReset(identifier);
      setMaskedTarget(res.maskedTarget);
      setStep(2);
      setTimer(60);
      setCanResend(false);
    } catch (err: any) {
      setError(err?.message || "Could not locate account. Check your details.");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Handle OTP input
  const handleOtpChange = (index: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[index] = val.slice(-1);
    setOtp(newOtp);

    // Auto focus next input
    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const code = otp.join("");
    if (code.length !== 6) {
      setError("Please enter the complete 6-digit verification code.");
      return;
    }

    try {
      setLoading(true);
      await authService.verifyOTP(identifier, code);
      setStep(3);
    } catch (err: any) {
      setError(err?.message || "Invalid OTP code. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (!canResend) return;
    setError(null);
    try {
      setLoading(true);
      await authService.requestPasswordReset(identifier);
      setTimer(60);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);
    } catch (err: any) {
      setError(err?.message || "Failed to resend OTP.");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Set New Password
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match. Please verify.");
      return;
    }

    try {
      setLoading(true);
      await authService.resetPassword(identifier, otp.join(""), newPassword);
      setStep(4);
    } catch (err: any) {
      setError(err?.message || "Failed to reset password. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between py-10 px-4 sm:px-6 lg:px-8">
      {/* Top Header */}
      <div className="max-w-md mx-auto w-full flex items-center justify-between pb-6">
        <BhuRailLogo size="sm" asLink={true} href="/" />

        <Link href="/login" className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Portals</span>
        </Link>
      </div>

      {/* Main Card */}
      <div className="max-w-md mx-auto w-full my-auto">
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-md space-y-6">
          {/* Progress Indicator */}
          {step < 4 && (
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs">
                  {step}
                </div>
                <span className="text-xs font-bold text-slate-800">
                  {step === 1 && "Identity Verification"}
                  {step === 2 && "OTP Code Validation"}
                  {step === 3 && "Set Secure Password"}
                </span>
              </div>
              <span className="text-[11px] font-semibold text-slate-400">Step {step} of 3</span>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* STEP 1: Enter Identifier */}
          {step === 1 && (
            <form onSubmit={handleRequestOtp} className="space-y-4 text-xs">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-700 flex items-center justify-center mx-auto shadow-sm">
                  <KeyRound className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-black text-slate-900">Reset Credentials</h2>
                <p className="text-slate-500 max-w-xs mx-auto">
                  Provide your registered Mobile Number, Email, or Government Officer ID to receive a secure recovery code.
                </p>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Registered Identity Identifier
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="e.g. 9876543210 or name@example.com"
                    required
                    className="pl-9"
                  />
                  <Smartphone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  Supports Citizen mobile numbers, registered emails, and Official Cadre IDs.
                </p>
              </div>

              <Button
                type="submit"
                loading={loading}
                className="w-full justify-center bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 shadow-sm text-xs mt-2"
              >
                Send Verification OTP
              </Button>
            </form>
          )}

          {/* STEP 2: Enter OTP */}
          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="space-y-5 text-xs">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-black text-slate-900">Enter Security Code</h2>
                <p className="text-slate-500 max-w-xs mx-auto">
                  We sent a 6-digit one-time password to <strong>{maskedTarget}</strong>.
                </p>
              </div>

              {/* Quick Demo Hint */}
              <div className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-200 text-[11px] text-blue-900 text-center">
                Demo Code: <span className="font-mono font-bold tracking-widest text-blue-700">123456</span> (or any 6 digits)
              </div>

              {/* 6 Digit Inputs */}
              <div>
                <label className="block font-bold text-slate-700 mb-2 text-center">
                  6-Digit Verification Code
                </label>
                <div className="flex justify-center gap-2">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      id={`otp-input-${i}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      className="w-11 h-12 text-center text-lg font-bold text-slate-900 border border-slate-300 rounded-xl focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all shadow-2xs"
                    />
                  ))}
                </div>
              </div>

              {/* Timer & Resend */}
              <div className="flex items-center justify-between text-[11px] pt-1 text-slate-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>
                    Expires in:{" "}
                    <strong className="text-slate-700 font-mono">
                      00:{timer < 10 ? `0${timer}` : timer}
                    </strong>
                  </span>
                </div>

                <button
                  type="button"
                  disabled={!canResend || loading}
                  onClick={handleResendOtp}
                  className={`flex items-center gap-1 font-bold ${
                    canResend
                      ? "text-blue-600 hover:text-blue-800 hover:underline"
                      : "text-slate-300 cursor-not-allowed"
                  }`}
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Resend Code</span>
                </button>
              </div>

              <Button
                type="submit"
                loading={loading}
                className="w-full justify-center bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 shadow-sm text-xs mt-2"
              >
                Validate & Proceed
              </Button>
            </form>
          )}

          {/* STEP 3: Enter New Password */}
          {step === 3 && (
            <form onSubmit={handleResetPassword} className="space-y-4 text-xs">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200 text-purple-700 flex items-center justify-center mx-auto shadow-sm">
                  <Lock className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-black text-slate-900">Choose New Password</h2>
                <p className="text-slate-500 max-w-xs mx-auto">
                  Create a robust password to safeguard your digital public infrastructure credentials.
                </p>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min 8 characters"
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

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Confirm New Password
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

              <Button
                type="submit"
                loading={loading}
                className="w-full justify-center bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 shadow-sm text-xs mt-2"
              >
                Update Password
              </Button>
            </form>
          )}

          {/* STEP 4: Success State */}
          {step === 4 && (
            <div className="text-center space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <Badge variant="success">Credential Reset Complete</Badge>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Password Updated</h2>
                <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
                  Your Bhu-Rail account credentials have been successfully updated and synced across all state registries.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <Button
                  onClick={() => router.push("/citizen/login")}
                  className="w-full justify-center bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2 shadow-sm text-xs"
                >
                  Citizen Login
                </Button>
                <Button
                  onClick={() => router.push("/government/login")}
                  className="w-full justify-center bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 shadow-sm text-xs"
                >
                  Officer Login
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-md mx-auto w-full pt-8 text-center text-xs text-slate-500">
        © 2026 Bhu-Rail (भू-रेल) • Government of Haryana & National Land DPI
      </div>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-xs text-slate-500">Loading Password Recovery...</div>}>
      <ForgotPasswordContent />
    </Suspense>
  );
}
