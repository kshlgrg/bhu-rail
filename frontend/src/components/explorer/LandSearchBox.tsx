"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Search,
  X,
  MapPin,
  FileText,
  User,
  Wheat,
  ChevronRight,
  Clock,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import {
  DemoSearchScenario,
  RECENT_DEMO_SEARCHES,
  getMatchingDemoSearches,
  SearchTypeCategory,
} from "@/data/demo-searches";

export interface LandSearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  onSelectScenario: (scenario: DemoSearchScenario) => void;
  onClear: () => void;
  className?: string;
}

export function LandSearchBox({
  value,
  onChange,
  onSelectScenario,
  onClear,
  className = "",
}: LandSearchBoxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isTyping = Boolean(value.trim());
  const matchingResults = getMatchingDemoSearches(value);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < matchingResults.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : matchingResults.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < matchingResults.length) {
        handleItemClick(matchingResults[highlightedIndex]);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleItemClick = (scenario: DemoSearchScenario) => {
    onSelectScenario(scenario);
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const handleClearClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClear();
    setHighlightedIndex(-1);
    inputRef.current?.focus();
    setIsOpen(true);
  };

  const renderIcon = (category: SearchTypeCategory) => {
    switch (category) {
      case "ulpin":
        return <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />;
      case "survey":
        return <FileText className="w-4 h-4 text-blue-600 shrink-0" />;
      case "owner":
        return <User className="w-4 h-4 text-amber-600 shrink-0" />;
      case "agricultural":
      case "khasra":
        return <Wheat className="w-4 h-4 text-lime-600 shrink-0" />;
      default:
        return <MapPin className="w-4 h-4 text-slate-500 shrink-0" />;
    }
  };

  return (
    <div ref={containerRef} className={`relative w-full ${className}`}>
      {/* Main Search Input */}
      <div className="relative flex items-center">
        <div className="absolute left-3.5 text-slate-400 pointer-events-none flex items-center justify-center">
          <Search className="w-4 h-4" />
        </div>

        <input
          ref={inputRef}
          type="text"
          placeholder="Search by ULPIN, Survey No., Khasra No. or Owner Name"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            if (!isOpen) setIsOpen(true);
            setHighlightedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:border-transparent transition-all shadow-sm"
        />

        {/* Clear 'X' button */}
        {value && (
          <button
            type="button"
            onClick={handleClearClick}
            className="absolute right-3 p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
            title="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Popover Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          {/* Header */}
          <div className="px-4 py-2.5 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {isTyping ? (
                <>
                  <Search className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-xs font-bold text-slate-700">Search Results</span>
                </>
              ) : (
                <>
                  <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-xs font-bold text-slate-800">Recent Searches</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Suggested Demo Parcels</span>
            </div>
          </div>

          {/* List or Empty State */}
          {matchingResults.length === 0 ? (
            <div className="p-5 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-800">No parcel found</p>
                <p className="text-[11px] text-slate-500">
                  Try searching by:
                </p>
              </div>

              {/* Suggestion Chips */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => handleItemClick(RECENT_DEMO_SEARCHES[0])}
                  className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 border border-slate-200 transition-colors"
                >
                  ULPIN: 0101
                </button>
                <button
                  type="button"
                  onClick={() => handleItemClick(RECENT_DEMO_SEARCHES[1])}
                  className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-slate-100 text-slate-700 hover:bg-amber-50 hover:text-amber-800 hover:border-amber-200 border border-slate-200 transition-colors"
                >
                  Survey No: 102
                </button>
                <button
                  type="button"
                  onClick={() => handleItemClick(RECENT_DEMO_SEARCHES[2])}
                  className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-slate-100 text-slate-700 hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 border border-slate-200 transition-colors"
                >
                  Owner: Rajesh Sharma
                </button>
                <button
                  type="button"
                  onClick={() => handleItemClick(RECENT_DEMO_SEARCHES[3])}
                  className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-slate-100 text-slate-700 hover:bg-lime-50 hover:text-lime-800 hover:border-lime-200 border border-slate-200 transition-colors"
                >
                  Survey No: 108 (Agri)
                </button>
              </div>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 max-h-[380px] overflow-y-auto">
              {matchingResults.map((scenario, index) => {
                const isHighlighted = highlightedIndex === index;
                return (
                  <div
                    key={scenario.id}
                    onClick={() => handleItemClick(scenario)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    className={`px-4 py-3 cursor-pointer flex items-center justify-between gap-3 transition-colors ${
                      isHighlighted ? "bg-slate-50/90" : "bg-white hover:bg-slate-50/60"
                    }`}
                  >
                    {/* Left: Icon + Primary Text + Secondary metadata */}
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-xl bg-slate-100/80 border border-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                        {renderIcon(scenario.searchTypeCategory)}
                      </div>

                      <div className="min-w-0 space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-slate-900 truncate">
                            {scenario.primaryValue}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
                          <span className="text-slate-600 font-semibold">{scenario.searchType}</span>
                          <span>·</span>
                          <span className="truncate">{scenario.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Status Badge + Chevron */}
                    <div className="flex items-center gap-2.5 shrink-0">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-md border tracking-wide uppercase ${scenario.statusBadge.colorClass}`}
                      >
                        {scenario.statusBadge.label}
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Dropdown Footer info note */}
          <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-600">
            <span>Click any parcel to inspect GIS geometry & 360° profile</span>
            <span className="font-mono text-slate-600">Kadarpur Sector</span>
          </div>
        </div>
      )}
    </div>
  );
}
