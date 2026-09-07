"use client";

import React from "react";
import Link from "next/link";

interface BhuRailLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showTagline?: boolean;
  showHindiBadge?: boolean;
  variant?: "dark" | "light"; // "dark" = dark text for light bg, "light" = white text for dark bg (footer)
  className?: string;
  asLink?: boolean;
  href?: string;
}

export function BhuRailLogo({
  size = "md",
  showTagline = true,
  showHindiBadge = true,
  variant = "dark",
  className = "",
  asLink = true,
  href = "/",
}: BhuRailLogoProps) {
  // Dimension mapping
  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const titleSizes = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-2xl",
    xl: "text-3xl",
  };

  const taglineSizes = {
    sm: "text-[9px]",
    md: "text-[10px]",
    lg: "text-xs",
    xl: "text-sm",
  };

  const isLight = variant === "light";

  const Content = (
    <div className={`flex items-center gap-3 select-none group ${className}`}>
      {/* Sovereign Emblem: Cadastral Land Stack + High-Speed Digital Rail */}
      <div
        className={`relative ${iconSizes[size]} rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200 overflow-hidden flex-shrink-0 ${
          isLight ? "bg-slate-900 border border-slate-700" : "bg-gradient-to-br from-blue-900 via-slate-900 to-emerald-950 border border-slate-200"
        }`}
      >
        <svg
          viewBox="0 0 48 48"
          className="w-full h-full p-1.5"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="bhuRailGreen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="bhuRailBlue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#2563eb" />
            </linearGradient>
            <linearGradient id="goldAccent" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>

          {/* Cadastral Polygon Geometry (Bhu - Land Base) */}
          <polygon
            points="24,4 43,14 38,38 10,38 5,14"
            fill="none"
            stroke="url(#bhuRailGreen)"
            strokeWidth="2"
            strokeDasharray="2 2"
            opacity="0.6"
          />

          {/* Geodesic Cadastral Node Pins */}
          <circle cx="24" cy="4" r="2" fill="#34d399" />
          <circle cx="43" cy="14" r="2" fill="#34d399" />
          <circle cx="38" cy="38" r="2" fill="#34d399" />
          <circle cx="10" cy="38" r="2" fill="#34d399" />
          <circle cx="5" cy="14" r="2" fill="#34d399" />

          {/* High-Speed Rail Tracks in Converging Perspective (Rail - Digital Public Infrastructure) */}
          {/* Left Rail */}
          <path
            d="M 17 42 L 21 16"
            stroke="url(#bhuRailBlue)"
            strokeWidth="2.75"
            strokeLinecap="round"
          />
          {/* Right Rail */}
          <path
            d="M 31 42 L 27 16"
            stroke="url(#bhuRailBlue)"
            strokeWidth="2.75"
            strokeLinecap="round"
          />

          {/* Rail Track Sleepers / Ties (Horizontal Railway Lines) */}
          <line x1="16.5" y1="39" x2="31.5" y2="39" stroke="#93c5fd" strokeWidth="1.75" strokeLinecap="round" />
          <line x1="18" y1="33" x2="30" y2="33" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="19.5" y1="27" x2="28.5" y2="27" stroke="#93c5fd" strokeWidth="1.25" strokeLinecap="round" />
          <line x1="20.5" y1="21" x2="27.5" y2="21" stroke="#93c5fd" strokeWidth="1" strokeLinecap="round" />

          {/* Fast-Transit Digital Locomotive / Beacon Point at apex */}
          <circle cx="24" cy="13" r="3" fill="url(#goldAccent)" />
          <circle cx="24" cy="13" r="5" fill="#f59e0b" opacity="0.3" />
        </svg>
      </div>

      {/* Brand Name & Devanagari Script */}
      <div>
        <div className="flex items-center gap-2">
          <span
            className={`font-black tracking-tight ${titleSizes[size]} ${
              isLight ? "text-white" : "text-slate-900"
            }`}
          >
            Bhu<span className="text-blue-600">-Rail</span>
          </span>

          {showHindiBadge && (
            <span
              className={`px-1.5 py-0.5 rounded font-bold text-[10px] tracking-wide ${
                isLight
                  ? "bg-emerald-950/80 text-emerald-400 border border-emerald-800"
                  : "bg-emerald-50 text-emerald-800 border border-emerald-200"
              }`}
            >
              भू-रेल
            </span>
          )}
        </div>

        {showTagline && (
          <p
            className={`${taglineSizes[size]} font-semibold tracking-wider uppercase ${
              isLight ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Digital Public Infrastructure for Land
          </p>
        )}
      </div>
    </div>
  );

  if (asLink) {
    return <Link href={href}>{Content}</Link>;
  }

  return Content;
}

export default BhuRailLogo;
