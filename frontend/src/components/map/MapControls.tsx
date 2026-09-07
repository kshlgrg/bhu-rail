"use client";

import React from "react";
import { Plus, Minus, RotateCcw, Maximize2 } from "lucide-react";

export interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

export function MapControls({ onZoomIn, onZoomOut, onReset }: MapControlsProps) {
  return (
    <div className="absolute top-4 right-4 z-20 flex flex-col gap-1.5 bg-white/95 backdrop-blur-md p-1.5 rounded-lg border border-slate-200 shadow-md">
      <button
        onClick={onZoomIn}
        className="p-1.5 rounded text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
        title="Zoom In"
      >
        <Plus className="w-4 h-4" />
      </button>
      <button
        onClick={onZoomOut}
        className="p-1.5 rounded text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
        title="Zoom Out"
      >
        <Minus className="w-4 h-4" />
      </button>
      <div className="h-px bg-slate-200 my-0.5" />
      <button
        onClick={onReset}
        className="p-1.5 rounded text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
        title="Reset View"
      >
        <RotateCcw className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
