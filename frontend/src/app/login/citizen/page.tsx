"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  User,
  Lock,
  Phone,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  HelpCircle,
  KeyRound,
} from "lucide-react";

export default function CitizenLoginPage() {
  const router = useRouter();
  const { loginCitizen } = useAuth();
  const [identifier, setIdentifier] = useState("+91 98765 43210");
  const [password, setPassword] = useState("••••••••");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginCitizen();
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header Branding */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-bold text-xl shadow-md mb-2">
            भू
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="font-extrabold text-xl text-slate-900 tracking-tight">BHU-RAIL</span>
            <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              Citizen Portal
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 pt-2">
            Access Your Land Information
          </h1>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Securely access your connected land records, property information and applications.
          </p>
        </div>

        {/* Login Card */}
        <Card className="p-6 border-slate-200 shadow-md space-y-5 bg-white">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Mobile Number / Email"
              type="text"
              placeholder="+91 98765 43210 or name@example.com"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              icon={Phone}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={Lock}
              required
            />

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 text-slate-600 cursor-pointer select-none">
                <input
                  type="checkbox"
                  defaultChecked
                  className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span>Remember this device</span>
              </label>
              <button
                type="button"
                onClick={() => alert("Prototype Demo: Use 'Continue as Demo Citizen' for instant access.")}
                className="text-emerald-700 hover:text-emerald-800 font-semibold"
              >
                Forgot Password?
              </button>
            </div>

            <div className="space-y-2 pt-2">
              <Button type="submit" className="w-full font-bold shadow-sm">
                Login
              </Button>

              <button
                type="button"
                onClick={() => loginCitizen()}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-xs border border-emerald-200 transition-all"
              >
                <User className="w-3.5 h-3.5" />
                <span>Continue as Demo Citizen</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </button>
            </div>
          </form>

          {/* Verification Badge */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1 text-emerald-700 font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              Aadhaar e-KYC Enabled
            </span>
            <button
              type="button"
              onClick={() => alert("Bhu-Rail Citizen Helpdesk: Call 1800-BHU-RAIL or contact revenue assistance.")}
              className="flex items-center gap-1 text-slate-500 hover:text-slate-800"
            >
              <HelpCircle className="w-3 h-3" />
              <span>Help</span>
            </button>
          </div>
        </Card>

        {/* Demo Callout */}
        <div className="p-3 rounded-xl bg-slate-100/80 border border-slate-200 text-center text-xs text-slate-600">
          <p className="font-semibold text-slate-800">Demonstration Credentials</p>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Pre-loaded persona: <strong>Suresh Chandra Yadav</strong> (Owner of Plot 101, Kadarpur).
          </p>
        </div>

        {/* Switch to Government */}
        <div className="text-center">
          <Link
            href="/login/government"
            className="text-xs text-slate-500 hover:text-slate-800 transition-colors"
          >
            Are you a revenue or land governance officer?{" "}
            <span className="text-blue-600 font-semibold underline">Government Login &rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
