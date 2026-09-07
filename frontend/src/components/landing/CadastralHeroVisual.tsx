"use client";

import React, { useState } from "react";
import { ShieldCheck, MapPin, CheckCircle2, FileCheck, Landmark, Hash, Compass } from "lucide-react";

export function CadastralHeroVisual() {
  const [activePlot, setActivePlot] = useState<"101" | "102" | "104">("101");

  const plots = {
    "101": {
      survey: "101",
      ulpin: "IN-HR-GGM-KDP-0101-0000",
      owner: "Suresh Chandra Yadav",
      area: "1,850 m²",
      zoning: "Residential (R-2)",
      status: "✓ Clear Title",
      statusColor: "emerald",
      encumbrance: "✓ No Active Mortgage",
      injunction: "✓ No Active Injunction",
      hash: "a9f82d1b...e47c9012",
    },
    "102": {
      survey: "102",
      ulpin: "IN-HR-GGM-KDP-0102-0000",
      owner: "Anita Sharma",
      area: "1,820 m²",
      zoning: "Residential (R-2)",
      status: "⚠ Mortgage Active",
      statusColor: "amber",
      encumbrance: "Active Mortgage (SBI)",
      injunction: "✓ No Active Injunction",
      hash: "78210923...bcde0987",
    },
    "104": {
      survey: "104",
      ulpin: "IN-HR-GGM-KDP-0104-0000",
      owner: "Devendra Singh",
      area: "2,200 m²",
      zoning: "Agricultural / Buffer",
      status: "⚠ Injunction Active",
      statusColor: "rose",
      encumbrance: "Clear",
      injunction: "Stay Order (Case CIV-2025-01821)",
      hash: "f768e892...1240abc9",
    },
  };

  const current = plots[activePlot];

  return (
    <div className="relative w-full max-w-xl mx-auto rounded-3xl border border-slate-200/90 bg-white p-6 shadow-xl shadow-slate-200/50 overflow-hidden">
      {/* Visual Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span className="font-extrabold uppercase tracking-wider text-slate-800 text-[11px]">
            Cadastral GIS Visualizer
          </span>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-500 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200">
          <Compass className="w-3 h-3 text-blue-600" />
          <span>28.4595° N, 77.0266° E</span>
        </div>
      </div>

      {/* Interactive Cadastral Map Graphic */}
      <div className="relative my-4 h-64 rounded-2xl bg-slate-50 border border-slate-200 overflow-hidden p-4 flex items-center justify-center shadow-inner">
        {/* Spatial Grid Lines */}
        <div className="absolute inset-0 opacity-40 bg-[linear-gradient(to_right,#cbd5e1_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e1_1px,transparent_1px)] bg-[size:24px_24px]" />

        <svg viewBox="0 0 400 220" className="w-full h-full relative z-10">
          {/* Plot 101 */}
          <polygon
            points="30,40 160,30 180,120 40,130"
            onClick={() => setActivePlot("101")}
            className={`cursor-pointer transition-all duration-300 ${
              activePlot === "101"
                ? "fill-emerald-500/25 stroke-emerald-600 stroke-2"
                : "fill-emerald-100/50 stroke-emerald-500/70 stroke-1 hover:fill-emerald-200/50"
            }`}
          />
          <text x="85" y="85" fill="#047857" fontSize="12" fontWeight="bold" fontFamily="monospace">
            Plot 101
          </text>
          <text x="75" y="100" fill="#065f46" fontSize="9" fontFamily="monospace">
            1,850 m²
          </text>

          {/* Plot 102 */}
          <polygon
            points="160,30 290,20 310,110 180,120"
            onClick={() => setActivePlot("102")}
            className={`cursor-pointer transition-all duration-300 ${
              activePlot === "102"
                ? "fill-amber-500/25 stroke-amber-600 stroke-2"
                : "fill-slate-100 stroke-slate-300 stroke-1 hover:fill-slate-200"
            }`}
          />
          <text x="220" y="75" fill="#b45309" fontSize="12" fontWeight="bold" fontFamily="monospace">
            Plot 102
          </text>
          <text x="215" y="90" fill="#92400e" fontSize="9" fontFamily="monospace">
            1,820 m²
          </text>

          {/* Plot 104 */}
          <polygon
            points="40,130 180,120 170,200 30,195"
            onClick={() => setActivePlot("104")}
            className={`cursor-pointer transition-all duration-300 ${
              activePlot === "104"
                ? "fill-rose-500/25 stroke-rose-600 stroke-2"
                : "fill-slate-100 stroke-slate-300 stroke-1 hover:fill-slate-200"
            }`}
          />
          <text x="85" y="165" fill="#b91c1c" fontSize="12" fontWeight="bold" fontFamily="monospace">
            Plot 104
          </text>
          <text x="80" y="180" fill="#991b1b" fontSize="9" fontFamily="monospace">
            2,200 m² (Stay)
          </text>

          {/* Adjacent Plot 108 */}
          <polygon
            points="180,120 310,110 320,190 170,200"
            className="fill-slate-100 stroke-slate-300 stroke-1"
          />
          <text x="225" y="160" fill="#64748b" fontSize="11" fontFamily="monospace">
            Plot 108
          </text>

          {/* Selected Pin on Active Plot */}
          {activePlot === "101" && <circle cx="100" cy="55" r="4" fill="#059669" className="animate-ping" />}
        </svg>

        {/* Floating Verification Tag */}
        <div className="absolute bottom-3 left-3 bg-white/95 border border-slate-200 text-slate-800 rounded-lg px-3 py-1.5 flex items-center gap-2 text-[11px] backdrop-blur-md shadow-sm">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span className="font-mono text-slate-600">Click a polygon to inspect</span>
        </div>
      </div>

      {/* Live Parcel Passport Card */}
      <div className="p-4 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-slate-900">Survey Plot {current.survey}</span>
              <span
                className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
                  current.statusColor === "emerald"
                    ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                    : current.statusColor === "amber"
                    ? "bg-amber-100 text-amber-800 border-amber-300"
                    : "bg-rose-100 text-rose-800 border-rose-300"
                }`}
              >
                {current.status}
              </span>
            </div>
            <div className="font-mono text-[10px] text-slate-500 mt-0.5">{current.ulpin}</div>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-slate-500 font-semibold block uppercase">Area</span>
            <span className="font-mono font-bold text-xs text-slate-900">{current.area}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-slate-200">
          <div>
            <span className="text-slate-500 block text-[10px]">Registered Freehold Owner</span>
            <span className="font-semibold text-slate-800">{current.owner}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">Zoning & Permissible Use</span>
            <span className="font-semibold text-slate-800">{current.zoning}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">Financial Charges</span>
            <span className="font-semibold text-slate-800">{current.encumbrance}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px]">Judicial Stay Injunction</span>
            <span className="font-semibold text-slate-800">{current.injunction}</span>
          </div>
        </div>

        {/* Cryptographic Hash */}
        <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] font-mono text-slate-500">
          <span className="flex items-center gap-1">
            <Hash className="w-3 h-3 text-emerald-600" />
            <span>SHA-256 State Digest</span>
          </span>
          <span className="text-emerald-700 font-bold">{current.hash}</span>
        </div>
      </div>
    </div>
  );
}
