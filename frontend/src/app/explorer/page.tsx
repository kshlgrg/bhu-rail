"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { LandMap } from "@/components/map/LandMap";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { MOCK_PARCELS } from "@/data/parcels";
import { ParcelBasic } from "@/types/parcel";
import { useSearch } from "@/hooks/useSearch";
import { formatArea } from "@/lib/formatters";
import { LandSearchBox } from "@/components/explorer/LandSearchBox";
import { SelectedParcelPanel } from "@/components/explorer/SelectedParcelPanel";
import { DemoSearchScenario, findMatchingParcel } from "@/data/demo-searches";
import { Compass, ArrowRight } from "lucide-react";

function ExplorerInner() {
  const searchParams = useSearchParams();
  const urlUlpin = searchParams?.get("ulpin");

  const {
    query,
    setQuery,
    landUseFilter,
    setLandUseFilter,
    statusFilter,
    setStatusFilter,
    results,
    totalResults,
  } = useSearch(MOCK_PARCELS);

  const [selectedParcel, setSelectedParcel] = useState<ParcelBasic | null>(MOCK_PARCELS[0]);

  // Sync with URL parameter if present
  useEffect(() => {
    if (urlUlpin) {
      const match = MOCK_PARCELS.find((p) => p.ulpin === urlUlpin);
      if (match) {
        setSelectedParcel(match);
        setQuery(match.ulpin);
      }
    }
  }, [urlUlpin, setQuery]);

  const handleSelectScenario = (scenario: DemoSearchScenario) => {
    setQuery(scenario.primaryValue);
    const target = findMatchingParcel(scenario);
    if (target) {
      setSelectedParcel(target);
      if (landUseFilter !== "ALL" && target.land_use !== landUseFilter) {
        setLandUseFilter("ALL");
      }
    }
  };

  const handleClear = () => {
    setQuery("");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Land Cadastral Explorer"
        subtitle="Search, inspect, and analyze cadastral geometries and unified land attributes across Kadarpur Pilot Sector."
        breadcrumbs={[{ label: "Land Explorer" }]}
        badge={<Badge variant="success">EPSG:4326 PostGIS</Badge>}
      />

      {/* Search and Filters Bar */}
      <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col md:flex-row items-center gap-3">
        <div className="flex-1 w-full relative">
          <LandSearchBox
            value={query}
            onChange={(val) => setQuery(val)}
            onSelectScenario={handleSelectScenario}
            onClear={handleClear}
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={landUseFilter}
            onChange={(e) => setLandUseFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
          >
            <option value="ALL">All Land Uses</option>
            <option value="RESIDENTIAL">Residential</option>
            <option value="COMMERCIAL">Commercial</option>
            <option value="AGRICULTURAL">Agricultural</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="LOCKED_IN_TRANSFER">Locked in Transfer</option>
          </select>
        </div>
      </div>

      {/* Map & Results Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left / Top: Interactive GIS Map */}
        <div className="lg:col-span-8 space-y-3">
          <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm bg-white">
            <LandMap
              parcels={results}
              selectedUlpin={selectedParcel?.ulpin}
              onSelectParcel={(p) => setSelectedParcel(p)}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>
              Showing <strong className="text-slate-900 font-bold">{totalResults}</strong> cadastral parcels
            </span>
            <span>Click any polygon on map to highlight and view 360° profile</span>
          </div>
        </div>

        {/* Right: Selected Parcel Inspector & Records List */}
        <div className="lg:col-span-4 space-y-4">
          {/* Selected Parcel Summary Panel */}
          {selectedParcel && (
            <div className="space-y-2">
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Selected Parcel Summary
                </span>
                <span className="text-[10px] font-mono text-slate-400">Live CAD State</span>
              </div>
              <SelectedParcelPanel parcel={selectedParcel} />
            </div>
          )}

          {/* Cadastral Records List */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Cadastral Records
              </h3>
              <span className="text-[11px] text-slate-500 font-mono">{results.length} found</span>
            </div>

            <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
              {results.length === 0 ? (
                <EmptyState
                  icon={Compass}
                  title="No Parcels Match Query"
                  description="Try clearing search filters or search for '101', '102', '104' or 'Suresh'."
                  actionLabel="Reset Search"
                  onAction={() => {
                    setQuery("");
                    setLandUseFilter("ALL");
                    setStatusFilter("ALL");
                  }}
                />
              ) : (
                results.map((p) => {
                  const isSelected = selectedParcel?.ulpin === p.ulpin;
                  return (
                    <div
                      key={p.ulpin}
                      onClick={() => setSelectedParcel(p)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? "bg-emerald-50/60 border-emerald-500 shadow-md ring-1 ring-emerald-500"
                          : "bg-white border-slate-200 hover:border-slate-300 shadow-sm"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-slate-900 text-sm">Plot {p.survey_number}</span>
                          {p.has_dispute || p.survey_number === "104" ? (
                            <Badge variant="danger">⚠ Injunction Active</Badge>
                          ) : p.has_encumbrance || p.survey_number === "102" ? (
                            <Badge variant="warning">⚠ Mortgage Active</Badge>
                          ) : p.survey_number === "108" ? (
                            <Badge variant="success">🌾 Agricultural</Badge>
                          ) : p.survey_number === "103" ? (
                            <Badge variant="info">✓ Verified</Badge>
                          ) : (
                            <Badge variant="success">✓ Clear Title</Badge>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">v{p.version}</span>
                      </div>

                      <p className="text-[11px] font-mono text-slate-500 mt-1 truncate">{p.ulpin}</p>

                      <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-100 text-[11px] text-slate-700">
                        <div>
                          <span className="text-slate-400 block text-[10px] font-semibold">Owner</span>
                          <span className="font-bold truncate block">{p.primary_owner || "—"}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px] font-semibold">Area</span>
                          <span className="font-bold block">{formatArea(p.spatial.area_sq_meters)}</span>
                        </div>
                      </div>

                      <div className="mt-2.5 flex gap-2">
                        <Link href={`/parcel/${p.ulpin}`} className="w-full">
                          <Button
                            size="sm"
                            variant={isSelected ? "primary" : "secondary"}
                            className="w-full gap-1 text-[11px] py-1 font-semibold"
                          >
                            <span>Open Parcel 360°</span>
                            <ArrowRight className="w-3 h-3" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExplorerPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-slate-500 text-xs">
          Loading Cadastral Explorer...
        </div>
      }
    >
      <ExplorerInner />
    </Suspense>
  );
}
