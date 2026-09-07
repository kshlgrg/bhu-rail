"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import {
  Shield,
  Lock,
  Mail,
  Building2,
  ArrowRight,
  ShieldAlert,
  HelpCircle,
} from "lucide-react";

export default function GovernmentLoginPage() {
  const router = useRouter();
  const { loginGovernment } = useAuth();
  const [identifier, setIdentifier] = useState("r.sharma@revenue.haryana.gov.in");
  const [password, setPassword] = useState("••••••••");
  const [department, setDepartment] = useState("Revenue & Land Records");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginGovernment({ officerId: identifier, password, department });
  };

  const departments = [
    { label: "Revenue & Land Records", value: "Revenue & Land Records" },
    { label: "Registration / Sub-Registrar", value: "Registration" },
    { label: "Planning / GMDA", value: "Planning" },
    { label: "Municipal Administration (MCG)", value: "Municipal Administration" },
    { label: "Survey & Land Records (DGPS)", value: "Survey & Land Records" },
  ];

  return (
    <div className="min-h-[75vh] flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header Branding */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-600 text-white font-bold text-xl shadow-md mb-2">
            <Shield className="w-6 h-6" />
          </div>
          <div className="flex items-center justify-center gap-2">
            <span className="font-extrabold text-xl text-slate-900 tracking-tight">BHU-RAIL</span>
            <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
              Government Portal
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 pt-2">
            Government Officer Portal
          </h1>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Access land records, verification workflows and governance tools.
          </p>
        </div>

        {/* Login Card */}
        <Card className="p-6 border-slate-200 shadow-md space-y-5 bg-white">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Official Email / Employee ID"
              type="text"
              placeholder="e.g. HR-REV-2024-0842 or officer@revenue.gov.in"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              icon={Mail}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your security credential"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={Lock}
              required
            />

            <Select
              label="Department / Directorate"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              options={departments}
            />

            <div className="space-y-2 pt-2">
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-all"
              >
                Login
              </button>

              <button
                type="button"
                onClick={() => loginGovernment({ officerId: identifier, password, department })}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-800 font-bold text-xs border border-blue-200 transition-all"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Continue as Demo Officer</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </button>
            </div>
          </form>

          {/* Security Indicator */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span className="flex items-center gap-1 text-blue-700 font-medium">
              <ShieldAlert className="w-3.5 h-3.5" />
              Gov Net Secured Node
            </span>
            <button
              type="button"
              onClick={() => alert("NIC / State IT Helpdesk: Contact nodal officer.")}
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
            Pre-loaded persona: <strong>Rajeshwar Sharma</strong> (Tehsildar / Land Records Officer, Gurugram).
          </p>
        </div>

        {/* Switch to Citizen */}
        <div className="text-center">
          <Link
            href="/login/citizen"
            className="text-xs text-slate-500 hover:text-slate-800 transition-colors"
          >
            Are you a citizen looking for property records?{" "}
            <span className="text-emerald-700 font-semibold underline">Citizen Login &rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
