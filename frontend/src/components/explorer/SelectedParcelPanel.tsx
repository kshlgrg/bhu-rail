"use client";

import React from "react";
import Link from "next/link";
import { ParcelBasic } from "@/types/parcel";
import { formatArea } from "@/lib/formatters";
import { Button } from "@/components/ui/Button";
import {
  ArrowRight,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Building,
  Wheat,
  Scale,
  MapPin,
  ExternalLink,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { RECENT_DEMO_SEARCHES } from "@/data/demo-searches";

export interface SelectedParcelPanelProps {
  parcel: ParcelBasic;
  onClose?: () => void;
}

export function SelectedParcelPanel({ parcel }: SelectedParcelPanelProps) {
  // Find scenario details if this parcel matches one of our demo parcels
  const scenario = RECENT_DEMO_SEARCHES.find((s) => s.ulpin === parcel.ulpin);

  const isMortgaged = parcel.has_encumbrance || parcel.ulpin === "IN-HR-GGM-KDP-0102-0000";
  const hasDispute = parcel.has_dispute || parcel.ulpin === "IN-HR-GGM-KDP-0104-0000";
  const isAgricultural = parcel.land_use === "AGRICULTURAL" || parcel.survey_number === "108";
  const isVerified = parcel.survey_number === "103" || (!hasDispute && !isMortgaged);

  return (
    <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-md space-y-4 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-base font-black text-slate-900 tracking-tight">
              Plot {parcel.survey_number}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold bg-slate-100 text-slate-600 border border-slate-200">
              v{parcel.version}
            </span>
          </div>
          <p className="text-[11px] font-mono text-slate-500 mt-1 truncate">
            {parcel.ulpin}
          </p>
        </div>

        {/* Primary Status Badge */}
        {hasDispute ? (
          <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-lg uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200 ring-1 ring-rose-500/20">
            COURT RESTRICTION
          </span>
        ) : isMortgaged ? (
          <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-lg uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200 ring-1 ring-amber-500/20">
            ACTIVE MORTGAGE
          </span>
        ) : isAgricultural && parcel.survey_number === "108" ? (
          <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-lg uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-300 ring-1 ring-emerald-500/20">
            AGRICULTURAL
          </span>
        ) : parcel.survey_number === "103" ? (
          <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-lg uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 ring-1 ring-blue-500/20">
            VERIFIED
          </span>
        ) : (
          <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-lg uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 ring-1 ring-emerald-500/20">
            CLEAR
          </span>
        )}
      </div>

      {/* Scenario-Specific Callout Card */}
      {hasDispute ? (
        <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-bold text-xs">
              <Scale className="w-4 h-4 text-rose-600 shrink-0" />
              <span>COURT RESTRICTION</span>
            </div>
            <span className="text-[10px] font-black px-2 py-0.5 rounded bg-rose-600 text-white uppercase tracking-wider flex items-center gap-1">
              <Lock className="w-3 h-3" />
              Transfer: BLOCKED
            </span>
          </div>
          <div className="text-[11px] space-y-1 text-rose-800">
            <p>
              <strong className="font-semibold text-rose-950">Reason:</strong> Active court injunction
            </p>
            <p className="text-[10px] text-rose-700">
              Authority: Court of SDM (Revenue Court) Sohna · Case REV/COURT/SOHNA/2024/771
            </p>
          </div>
        </div>
      ) : isMortgaged ? (
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-bold text-xs">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>ACTIVE MORTGAGE</span>
            </div>
            <span className="text-[10px] font-black px-2 py-0.5 rounded bg-amber-600 text-white uppercase tracking-wider">
              ENCUMBERED
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] bg-white/70 p-2 rounded-lg border border-amber-200/80">
            <div>
              <span className="text-[10px] text-amber-700 font-semibold block">Mortgagee Bank</span>
              <span className="font-bold text-slate-900">SBI (Gurugram)</span>
            </div>
            <div>
              <span className="text-[10px] text-amber-700 font-semibold block">Claim Amount</span>
              <span className="font-bold text-amber-900">₹45,00,000</span>
            </div>
          </div>
          <p className="text-[10px] text-amber-700 leading-tight">
            Title transfer or mutation requires formal bank clearance & NOC certificate.
          </p>
        </div>
      ) : isAgricultural && parcel.survey_number === "108" ? (
        <div className="p-3.5 rounded-xl bg-emerald-50/80 border border-emerald-200 text-emerald-900 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-bold text-xs">
              <Wheat className="w-4 h-4 text-emerald-700 shrink-0" />
              <span>AGRICULTURAL LAND</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
              FARMLAND
            </span>
          </div>
          <div className="text-[11px] text-emerald-800 space-y-0.5">
            <p>
              <strong className="font-semibold text-emerald-950">Cadastral Area:</strong> 10,000 m² (1.00 Hectare)
            </p>
            <p className="text-[10px] text-emerald-700">
              Clear freehold agricultural title in Kadarpur revenue circle. Free of encumbrances.
            </p>
          </div>
        </div>
      ) : parcel.survey_number === "103" ? (
        <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200 text-blue-900 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-bold text-xs">
              <ShieldCheck className="w-4 h-4 text-blue-700 shrink-0" />
              <span>VERIFIED RESIDENTIAL</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
              ZONE R-2
            </span>
          </div>
          <div className="text-[11px] text-blue-800 space-y-0.5">
            <p>
              <strong className="font-semibold text-blue-950">Area:</strong> 1,900 m² · Residential Use
            </p>
            <p className="text-[10px] text-blue-700">
              Jamabandi title verified · Centroid & boundary RTK-DGPS accuracy calibrated.
            </p>
          </div>
        </div>
      ) : (
        <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-emerald-900 space-y-1.5">
          <div className="flex items-center gap-1.5 font-bold text-xs text-emerald-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>CLEAN & VERIFIED TITLE</span>
          </div>
          <p className="text-[11px] text-emerald-800 leading-relaxed">
            Freehold land parcel with zero encumbrance and zero boundary disputes recorded.
          </p>
        </div>
      )}

      {/* Structured Property Attributes */}
      <div className="grid grid-cols-2 gap-2.5 pt-1 text-xs text-slate-700">
        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
            Primary Owner
          </span>
          <span className="font-bold text-slate-900 truncate block mt-0.5">
            {parcel.primary_owner || "—"}
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
            Cadastral Area
          </span>
          <span className="font-bold text-slate-900 block mt-0.5">
            {formatArea(parcel.spatial.area_sq_meters)}
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
            Land Use
          </span>
          <span className="font-bold text-slate-900 block mt-0.5">
            {parcel.land_use || "RESIDENTIAL"}
          </span>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
            Location
          </span>
          <span className="font-bold text-slate-900 truncate block mt-0.5">
            {parcel.village}, {parcel.district}
          </span>
        </div>
      </div>

      {/* Action: Open Parcel 360° */}
      <div className="pt-2">
        <Link href={`/parcel/${parcel.ulpin}`} className="block w-full">
          <Button
            size="md"
            variant="primary"
            className="w-full justify-center gap-2 text-xs font-bold py-2.5 shadow-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl"
          >
            <span>Open Parcel 360°</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
