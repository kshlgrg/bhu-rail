"use client";

import React, { useState } from "react";
import { Layers, Check } from "lucide-react";
import { cn } from "../../lib/utils";

export interface LayerState {
  cadastral: boolean;
  zoning: boolean;
  restrictions: boolean;
  utilities: boolean;
}

export interface LayerControlProps {
  layers: LayerState;
  onChange: (layers: LayerState) => void;
}

export function LayerControl({ layers, onChange }: LayerControlProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = (key: keyof LayerState) => {
    onChange({
      ...layers,
      [key]: !layers[key],
    });
  };

  return (
    <div className="absolute top-4 left-4 z-20">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 bg-white/95 backdrop-blur-md border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 shadow-md hover:bg-slate-50 transition-colors"
      >
        <Layers className="w-3.5 h-3.5 text-emerald-700" />
        <span>Map Layers</span>
      </button>

      {isOpen && (
        <div className="mt-2 w-52 bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl p-3 shadow-xl space-y-2 text-xs animate-in fade-in zoom-in-95 duration-150 text-slate-800">
          <p className="font-bold text-[10px] uppercase tracking-wider text-slate-500 mb-1">GIS Overlay Layers</p>

          <label
            onClick={() => toggle("cadastral")}
            className="flex items-center justify-between p-1.5 rounded hover:bg-slate-100 cursor-pointer select-none"
          >
            <div className="flex items-center gap-2 text-slate-700 font-medium">
              <span className="w-2.5 h-2.5 rounded bg-emerald-500"></span>
              <span>Cadastral Parcels</span>
            </div>
            {layers.cadastral && <Check className="w-3.5 h-3.5 text-emerald-700" />}
          </label>

          <label
            onClick={() => toggle("zoning")}
            className="flex items-center justify-between p-1.5 rounded hover:bg-slate-100 cursor-pointer select-none"
          >
            <div className="flex items-center gap-2 text-slate-700 font-medium">
              <span className="w-2.5 h-2.5 rounded bg-blue-500"></span>
              <span>Master Plan Zoning</span>
            </div>
            {layers.zoning && <Check className="w-3.5 h-3.5 text-blue-700" />}
          </label>

          <label
            onClick={() => toggle("restrictions")}
            className="flex items-center justify-between p-1.5 rounded hover:bg-slate-100 cursor-pointer select-none"
          >
            <div className="flex items-center gap-2 text-slate-700 font-medium">
              <span className="w-2.5 h-2.5 rounded bg-rose-500"></span>
              <span>Court Stays & Alerts</span>
            </div>
            {layers.restrictions && <Check className="w-3.5 h-3.5 text-rose-700" />}
          </label>

          <label
            onClick={() => toggle("utilities")}
            className="flex items-center justify-between p-1.5 rounded hover:bg-slate-100 cursor-pointer select-none"
          >
            <div className="flex items-center gap-2 text-slate-700 font-medium">
              <span className="w-2.5 h-2.5 rounded bg-amber-500"></span>
              <span>Utilities Network</span>
            </div>
            {layers.utilities && <Check className="w-3.5 h-3.5 text-amber-700" />}
          </label>
        </div>
      )}
    </div>
  );
}
