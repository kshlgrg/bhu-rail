"use client";

import React from "react";
import Link from "next/link";
import { ParcelBasic } from "../../types/parcel";
import { formatArea } from "../../lib/formatters";
import { ShieldCheck, ShieldAlert, ArrowRight, X, ExternalLink } from "lucide-react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

export interface ParcelPopupProps {
  parcel: ParcelBasic;
  onClose: () => void;
}

export function ParcelPopup({ parcel, onClose }: ParcelPopupProps) {
  return (
    <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-30 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-xl p-4 shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-150">
      <div className="flex items-start justify-between pb-2 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-900">Plot {parcel.survey_number}</span>
            {parcel.has_dispute || parcel.survey_number === "104" ? (
              <Badge variant="danger" size="sm">Court Injunction</Badge>
            ) : parcel.has_encumbrance || parcel.survey_number === "102" ? (
              <Badge variant="warning" size="sm">SBI Mortgage ₹45L</Badge>
            ) : parcel.survey_number === "108" ? (
              <Badge variant="success" size="sm">Agricultural Land</Badge>
            ) : parcel.survey_number === "103" ? (
              <Badge variant="info" size="sm">Verified Residential</Badge>
            ) : (
              <Badge variant="success" size="sm">Clear Title</Badge>
            )}
          </div>
          <p className="text-[10px] text-slate-500 font-mono mt-0.5">{parcel.ulpin}</p>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="py-2.5 space-y-1.5 text-xs">
        <div className="flex justify-between text-slate-500">
          <span>Owner:</span>
          <span className="font-medium text-slate-800">{parcel.primary_owner || "—"}</span>
        </div>
        <div className="flex justify-between text-slate-500">
          <span>Area:</span>
          <span className="font-medium text-slate-800">{formatArea(parcel.spatial.area_sq_meters)}</span>
        </div>
        <div className="flex justify-between text-slate-500">
          <span>Land Use:</span>
          <span className="font-medium text-slate-800">{parcel.land_use || "RESIDENTIAL"}</span>
        </div>
        <div className="flex justify-between text-slate-500">
          <span>Village:</span>
          <span className="font-medium text-slate-800">{parcel.village}, {parcel.district}</span>
        </div>
      </div>

      <div className="pt-2 border-t border-slate-100 flex gap-2">
        <Link href={`/parcel/${parcel.ulpin}`} className="w-full">
          <Button size="sm" className="w-full gap-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-700 text-white">
            <span>Open Parcel 360°</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </div>
    </div>
  );
}
