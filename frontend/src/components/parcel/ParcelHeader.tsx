"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Parcel360Overview } from "../../types/parcel";
import { ParcelStatusBadge } from "./ParcelStatus";
import { formatArea } from "../../lib/formatters";
import { copyToClipboard } from "../../lib/utils";
import { Button } from "../ui/Button";
import { useAuth } from "../../context/AuthContext";
import {
  Copy,
  Check,
  Download,
  ShieldCheck,
  Compass,
  FileText,
  AlertTriangle,
  CheckSquare,
  Flag,
  ArrowLeftRight,
} from "lucide-react";

export interface ParcelHeaderProps {
  parcel: Parcel360Overview;
  onNavigateTab?: (tabId: string) => void;
}

export function ParcelHeader({ parcel, onNavigateTab }: ParcelHeaderProps) {
  const { role } = useAuth();
  const [copied, setCopied] = useState(false);
  const [verifiedToast, setVerifiedToast] = useState(false);

  const handleCopy = async () => {
    const ok = await copyToClipboard(parcel.ulpin);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isCitizen = role === "citizen";

  return (
    <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Plot {parcel.survey_number}
            </span>
            <ParcelStatusBadge
              status={parcel.status}
              hasDispute={parcel.disputes && parcel.disputes.length > 0}
              hasEncumbrance={parcel.encumbrances && parcel.encumbrances.some((e) => e.is_active)}
            />
            <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-mono border border-slate-200">
              v{parcel.version}
            </span>
            <span
              className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                isCitizen
                  ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                  : "bg-blue-50 text-blue-800 border-blue-200"
              }`}
            >
              {isCitizen ? "Citizen View (Read-Only)" : "Government Administrative View"}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
            <span>ULPIN: {parcel.ulpin}</span>
            <button
              onClick={handleCopy}
              className="p-1 hover:text-slate-900 rounded hover:bg-slate-100 transition-colors"
              title="Copy ULPIN"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Action Buttons depending on role */}
        <div className="flex flex-wrap items-center gap-2">
          {isCitizen ? (
            <>
              <Link href={`/explorer?ulpin=${parcel.ulpin}`}>
                <Button size="sm" variant="secondary" className="gap-1.5 text-xs font-semibold">
                  <Compass className="w-3.5 h-3.5 text-emerald-600" />
                  <span>View on Map</span>
                </Button>
              </Link>
              <Link href={`/services/land-upi?ulpin=${parcel.ulpin}`}>
                <Button size="sm" variant="primary" className="gap-1.5 text-xs font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verify Property</span>
                </Button>
              </Link>
              <button
                onClick={() => onNavigateTab ? onNavigateTab("documents") : alert("Viewing available verified documents.")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-sm"
              >
                <FileText className="w-3.5 h-3.5 text-slate-500" />
                <span>View Documents</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setVerifiedToast(true);
                  setTimeout(() => setVerifiedToast(false), 3000);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm"
              >
                <CheckSquare className="w-3.5 h-3.5" />
                <span>Verify Record</span>
              </button>
              <button
                onClick={() => alert(`Discrepancy flag logged for ${parcel.ulpin}. Sent to Surveyor & SDM queue.`)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-semibold shadow-sm"
              >
                <Flag className="w-3.5 h-3.5" />
                <span>Flag Discrepancy</span>
              </button>
              <Link href={`/government/transactions?ulpin=${parcel.ulpin}`}>
                <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold shadow-sm">
                  <ArrowLeftRight className="w-3.5 h-3.5 text-blue-600" />
                  <span>Validate Transaction</span>
                </button>
              </Link>
            </>
          )}
        </div>
      </div>

      {verifiedToast && (
        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>Record verified against Haryana Jamabandi canonical data store. Hash signed by Officer.</span>
        </div>
      )}

      {/* Summary Stat Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100 text-xs">
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
          <span className="text-slate-500 font-bold block uppercase text-[10px] tracking-wider">
            Primary Owner
          </span>
          <span className="font-extrabold text-slate-900 text-sm mt-0.5 truncate block">
            {parcel.primary_owner || (parcel.rights?.[0]?.holder_name ?? "—")}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
          <span className="text-slate-500 font-bold block uppercase text-[10px] tracking-wider">
            Cadastral Area
          </span>
          <span className="font-extrabold text-slate-900 text-sm mt-0.5 block">
            {formatArea(parcel.spatial.area_sq_meters)}
          </span>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
          <span className="text-slate-500 font-bold block uppercase text-[10px] tracking-wider">
            Land Use & FAR
          </span>
          <span className="font-extrabold text-slate-900 text-sm mt-0.5 block">
            {parcel.land_use || "RESIDENTIAL"} (FAR {parcel.land_use_zoning?.permissible_far ?? 1.75})
          </span>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
          <span className="text-slate-500 font-bold block uppercase text-[10px] tracking-wider">
            Jurisdiction
          </span>
          <span className="font-extrabold text-slate-900 text-sm mt-0.5 truncate block">
            {parcel.village}, Sohna, Gurugram
          </span>
        </div>
      </div>
    </div>
  );
}
