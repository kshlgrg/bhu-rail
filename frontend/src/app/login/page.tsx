"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { UserCheck, Landmark, ArrowRight, ShieldCheck, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { BhuRailLogo } from "@/components/ui/BhuRailLogo";

function PortalSelectionContent() {
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl");

  const citizenHref = returnUrl ? `/citizen/login?returnUrl=${encodeURIComponent(returnUrl)}` : "/citizen/login";
  const govHref = returnUrl ? `/government/login?returnUrl=${encodeURIComponent(returnUrl)}` : "/government/login";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8">
      {/* Top Brand Bar */}
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between pb-6">
        <BhuRailLogo size="sm" asLink={true} href="/" />

        <Link href="/" className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </Link>
      </div>

      {/* Main Choice Cards Container */}
      <div className="max-w-4xl mx-auto w-full my-auto space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <Badge variant="info">Digital Land Public Infrastructure</Badge>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Select Your Access Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Please choose the designated authentication gateway according to your role.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Citizen Portal */}
          <Link
            href={citizenHref}
            className="group block p-8 rounded-3xl border border-slate-200 bg-white hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-900/5 transition-all space-y-6 relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <UserCheck className="w-7 h-7" />
              </div>
              <Badge variant="success">Citizen Services</Badge>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">
                Citizen Portal
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Securely access your land records, inspect simplified Parcel 360° passports, track applications, and view registered property documents.
              </p>
            </div>

            <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>View My Land & Property Locker</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Apply for Land Mutation & Demarcation</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Download Certified Jamabandi & Deeds</span>
              </li>
            </ul>

            <div className="pt-4 flex items-center justify-between font-bold text-xs text-emerald-700">
              <span>Sign in as Citizen</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: Government Portal */}
          <Link
            href={govHref}
            className="group block p-8 rounded-3xl border border-slate-200 bg-white hover:border-blue-400 hover:shadow-lg hover:shadow-blue-900/5 transition-all space-y-6 relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                <Landmark className="w-7 h-7 text-emerald-400" />
              </div>
              <Badge variant="info">Authorized Officers Only</Badge>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors">
                Government Officer Portal
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                Administrative console for Revenue Officers, Sub-Registrars, Town Planners, and Surveyors managing statutory land governance workflows.
              </p>
            </div>

            <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span>Cross-Department Record Verification</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span>Court Stays & Judicial Injunction Registry</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span>Pre-Validation Conveyance & Audit Ledger</span>
              </li>
            </ul>

            <div className="pt-4 flex items-center justify-between font-bold text-xs text-blue-700">
              <span>Sign in as Government Officer</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>

        {/* Security Stamp Notice */}
        <div className="p-4 rounded-2xl border border-slate-200 bg-white text-center text-xs text-slate-500 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>All portal sessions are encrypted and protected by National Land DPI security controls.</span>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="max-w-4xl mx-auto w-full pt-8 text-center text-xs text-slate-500">
        © 2026 Bhu-Rail (भू-रेल) • Government Land Digital Public Infrastructure
      </div>
    </div>
  );
}

export default function PortalSelectionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-xs text-slate-400">Loading Portal Selection...</div>}>
      <PortalSelectionContent />
    </Suspense>
  );
}
