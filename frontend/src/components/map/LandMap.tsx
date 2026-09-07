"use client";

import React, { useState, useMemo, useEffect } from "react";
import { ParcelBasic } from "../../types/parcel";
import { LayerControl, LayerState } from "./LayerControl";
import { MapControls } from "./MapControls";
import { ParcelPopup } from "./ParcelPopup";
import { cn } from "../../lib/utils";
import { Compass } from "lucide-react";

export interface LandMapProps {
  parcels: ParcelBasic[];
  selectedUlpin?: string;
  onSelectParcel?: (parcel: ParcelBasic) => void;
  className?: string;
}

export function LandMap({
  parcels,
  selectedUlpin,
  onSelectParcel,
  className,
}: LandMapProps) {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [hoveredUlpin, setHoveredUlpin] = useState<string | null>(null);
  const [activePopupParcel, setActivePopupParcel] = useState<ParcelBasic | null>(null);

  const [layers, setLayers] = useState<LayerState>({
    cadastral: true,
    zoning: false,
    restrictions: true,
    utilities: false,
  });

  // Projection bounds for Kadarpur cluster
  const bounds = useMemo(() => {
    return {
      minLng: 77.0808,
      maxLng: 77.0848,
      minLat: 28.4107,
      maxLat: 28.4134,
    };
  }, []);

  // Convert GPS [lng, lat] to SVG coordinate [x, y] in a 800x520 viewport
  const projectPoint = (lng: number, lat: number) => {
    const width = 800;
    const height = 520;
    const padding = 50;

    const x =
      padding +
      ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * (width - 2 * padding);
    // Invert Y because latitude goes north (up) but SVG goes down
    const y =
      height -
      padding -
      ((lat - bounds.minLat) / (bounds.maxLat - bounds.minLat)) * (height - 2 * padding);

    return [x, y];
  };

  // Smoothly zoom and center whenever selectedUlpin updates
  useEffect(() => {
    if (!selectedUlpin) return;
    const target = parcels.find((p) => p.ulpin === selectedUlpin);
    if (target) {
      setActivePopupParcel(target);
      const [cx, cy] = projectPoint(target.spatial.centroid[1], target.spatial.centroid[0]);
      const targetZoom = 1.45;
      setZoom(targetZoom);
      setPan({
        x: Math.round(400 / targetZoom - cx),
        y: Math.round(260 / targetZoom - cy),
      });
    }
  }, [selectedUlpin]);

  const handleParcelClick = (parcel: ParcelBasic) => {
    setActivePopupParcel(parcel);
    if (onSelectParcel) {
      onSelectParcel(parcel);
    }
  };

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.25, 2.5));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.75));
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  return (
    <div
      className={cn(
        "relative w-full h-[520px] rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 select-none shadow-sm",
        className
      )}
    >
      {/* GIS Grid Background */}
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(to right, #f1f5f9 1px, transparent 1px), linear-gradient(to bottom, #f1f5f9 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Layer and Map Controls */}
      <LayerControl layers={layers} onChange={setLayers} />
      <MapControls onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} onReset={handleReset} />

      {/* Compass North Arrow */}
      <div className="absolute bottom-4 left-4 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/90 border border-slate-200 text-[10px] font-mono text-slate-600 shadow-sm">
        <Compass className="w-3.5 h-3.5 text-emerald-700" />
        <span>N 28°24&apos;41&quot; E 77°04&apos;55&quot; (WGS84 EPSG:4326)</span>
      </div>

      {/* Interactive SVG Cadastral Canvas */}
      <svg
        viewBox="0 0 800 520"
        className="w-full h-full cursor-grab active:cursor-grabbing transition-transform duration-200"
        style={{
          transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
        }}
      >
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Road and Abatement Buffer Representation */}
        <path
          d="M 40 480 Q 400 460 760 480"
          stroke="#cbd5e1"
          strokeWidth="14"
          fill="none"
          strokeDasharray="4 4"
        />
        <text x="360" y="475" fill="#64748b" fontSize="9" fontWeight="bold" letterSpacing="2">
          VILLAGE ROAD (6M PERIPHERY)
        </text>

        {/* Render Parcels */}
        {layers.cadastral &&
          parcels.map((parcel) => {
            const rawCoords = parcel.geometry.coordinates[0];
            const svgPoints = rawCoords
              .map((pt) => projectPoint(pt[0], pt[1]).join(","))
              .join(" ");

            const isSelected = selectedUlpin === parcel.ulpin || activePopupParcel?.ulpin === parcel.ulpin;
            const isHovered = hoveredUlpin === parcel.ulpin;

            // Compute parcel center
            const [cx, cy] = projectPoint(parcel.spatial.centroid[1], parcel.spatial.centroid[0]);

            // Styling based on status & layers
            let fillColor = "#10b981"; // base emerald
            let fillOpacity = 0.25;
            let strokeColor = "#059669";

            if (layers.zoning) {
              if (parcel.land_use === "COMMERCIAL") {
                fillColor = "#3b82f6"; // Blue for commercial
                strokeColor = "#2563eb";
              } else if (parcel.land_use === "AGRICULTURAL") {
                fillColor = "#84cc16"; // Olive for agricultural
                strokeColor = "#65a30d";
              }
            }

            if (layers.restrictions && parcel.has_dispute) {
              fillColor = "#ef4444"; // Crimson for court stay
              fillOpacity = 0.35;
              strokeColor = "#dc2626";
            } else if (layers.restrictions && parcel.has_encumbrance) {
              fillColor = "#f59e0b"; // Amber for mortgage
              fillOpacity = 0.35;
              strokeColor = "#d97706";
            }

            if (isSelected) {
              fillOpacity = 0.45;
              strokeColor = "#2563eb";
            } else if (isHovered) {
              fillOpacity = 0.35;
            }

            return (
              <g
                key={parcel.ulpin}
                onClick={() => handleParcelClick(parcel)}
                onMouseEnter={() => setHoveredUlpin(parcel.ulpin)}
                onMouseLeave={() => setHoveredUlpin(null)}
                className="cursor-pointer transition-all duration-200"
              >
                <polygon
                  points={svgPoints}
                  fill={fillColor}
                  fillOpacity={isSelected ? 0.48 : fillOpacity}
                  stroke={isSelected ? "#2563eb" : strokeColor}
                  strokeWidth={isSelected ? "4" : isHovered ? "2.5" : "1.5"}
                  filter={isSelected ? "url(#glow)" : undefined}
                />

                {/* Survey Number Label with Selection Halo */}
                {isSelected && (
                  <circle
                    cx={cx}
                    cy={cy - 6}
                    r="18"
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="2"
                    strokeDasharray="4 3"
                  />
                )}
                <circle cx={cx} cy={cy - 6} r="13" fill="#ffffff" stroke={isSelected ? "#2563eb" : strokeColor} strokeWidth={isSelected ? "2.5" : "1.5"} />
                <text
                  x={cx}
                  y={cy - 2}
                  textAnchor="middle"
                  fill="#0f172a"
                  fontSize="10"
                  fontWeight="bold"
                >
                  {parcel.survey_number}
                </text>

                {/* Area Label */}
                <text
                  x={cx}
                  y={cy + 14}
                  textAnchor="middle"
                  fill="#475569"
                  fontSize="8"
                  fontWeight="medium"
                >
                  {parcel.spatial.area_sq_meters.toFixed(0)} m²
                </text>
              </g>
            );
          })}

        {/* Utility network overlay */}
        {layers.utilities && (
          <g>
            <path
              d="M 120 440 L 280 440 L 480 440 L 680 440"
              stroke="#fbbf24"
              strokeWidth="2.5"
              fill="none"
              strokeDasharray="6 3"
            />
            <circle cx="120" cy="440" r="4" fill="#fbbf24" />
            <circle cx="280" cy="440" r="4" fill="#fbbf24" />
            <circle cx="480" cy="440" r="4" fill="#fbbf24" />
            <circle cx="680" cy="440" r="4" fill="#fbbf24" />
            <text x="380" y="432" fill="#fbbf24" fontSize="8" fontWeight="bold">
              ⚡ DHBVN 11kV Feeder Line
            </text>
          </g>
        )}
      </svg>

      {/* Selected Parcel Card Popup */}
      {activePopupParcel && (
        <ParcelPopup
          parcel={activePopupParcel}
          onClose={() => setActivePopupParcel(null)}
        />
      )}
    </div>
  );
}
