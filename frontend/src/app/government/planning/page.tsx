"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { Tabs, TabItem } from "@/components/ui/Tabs";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import { MOCK_PARCELS } from "@/data/parcels";
import { formatArea } from "@/lib/formatters";
import {
  Building2,
  Layers,
  Compass,
  FileCheck,
  CheckCircle2,
  Flag,
  CheckSquare,
  Eye,
  AlertTriangle,
  Map,
} from "lucide-react";

function PlanningContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "land-use";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const tabs: TabItem[] = [
    { id: "land-use", label: "Land Use", icon: Map },
    { id: "zoning", label: "Zoning & FAR", icon: Building2 },
    { id: "master-plan", label: "GMDA Master Plan 2031", icon: Compass },
    { id: "building-permissions", label: "Building Permissions", icon: FileCheck, badge: "3" },
  ];

  const handleAction = (type: string, parcelUlpin: string) => {
    setToastMessage(`Action [${type}] recorded for ${parcelUlpin}. Logged into planning audit registry.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Planning & Urban Governance"
        subtitle="Statutory land use allocations, GMDA master plan alignment, FAR height zoning controls, and municipal building permission sanctions."
        breadcrumbs={[{ label: "Officer Dashboard", href: "/dashboard/government" }, { label: "Planning" }]}
        badge={<Badge variant="info">GMDA & MCG Authority</Badge>}
      />

      {toastMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="pt-2">
        {/* TAB 1: LAND USE */}
        {activeTab === "land-use" && (
          <Card header="Statutory Land Use Allocations (Kadarpur Pilot Sector)">
            <DataTable
              columns={[
                {
                  key: "ulpin",
                  header: "ULPIN",
                  render: (p) => (
                    <div>
                      <span className="font-mono font-bold text-slate-900 block">{p.ulpin}</span>
                      <span className="text-[10px] text-slate-500">Plot {p.survey_number}</span>
                    </div>
                  ),
                },
                {
                  key: "land_use",
                  header: "Land Use Category",
                  render: (p) => <Badge variant="success">{p.land_use || "RESIDENTIAL"}</Badge>,
                },
                {
                  key: "area",
                  header: "Total Area",
                  render: (p) => <span>{formatArea(p.spatial.area_sq_meters)}</span>,
                },
                {
                  key: "source",
                  header: "Authority Source",
                  render: () => <span className="text-slate-600">Town & Country Planning Haryana</span>,
                },
                {
                  key: "status",
                  header: "Sanction Status",
                  render: () => <Badge variant="success">SANCTIONED</Badge>,
                },
                {
                  key: "actions",
                  header: "Planning Actions",
                  render: (p) => (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleAction("Review", p.ulpin)}
                        className="py-1 px-2.5 text-[11px]"
                      >
                        Review
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAction("Verify", p.ulpin)}
                        className="py-1 px-2.5 text-[11px] text-emerald-700"
                      >
                        Verify
                      </Button>
                    </div>
                  ),
                },
              ]}
              data={MOCK_PARCELS}
              keyExtractor={(p) => p.ulpin}
            />
          </Card>
        )}

        {/* TAB 2: ZONING & FAR */}
        {activeTab === "zoning" && (
          <Card header="Development Regulations & FAR Controls">
            <DataTable
              columns={[
                {
                  key: "ulpin",
                  header: "ULPIN",
                  render: (p) => (
                    <div>
                      <span className="font-mono font-bold text-slate-900 block">{p.ulpin}</span>
                      <span className="text-[10px] text-slate-500">Plot {p.survey_number}</span>
                    </div>
                  ),
                },
                {
                  key: "zone",
                  header: "Zoning Sector",
                  render: (p) => <span className="font-bold text-slate-800">Zone R-1 (Low-Density Residential)</span>,
                },
                {
                  key: "far",
                  header: "Permissible FAR",
                  render: () => <span className="font-black text-slate-900 text-sm">1.75</span>,
                },
                {
                  key: "height",
                  header: "Height Limit",
                  render: () => <span className="font-medium text-slate-700">15.0 meters</span>,
                },
                {
                  key: "hazard",
                  header: "Flood Hazard",
                  render: () => <Badge variant="success">Zone 0 (Safe)</Badge>,
                },
                {
                  key: "actions",
                  header: "Actions",
                  render: (p) => (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleAction("Verify Zoning", p.ulpin)}
                        className="py-1 px-2.5 text-[11px]"
                      >
                        Verify
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleAction("Flag Setback Violation", p.ulpin)}
                        className="py-1 px-2.5 text-[11px] text-amber-700 border-amber-300"
                      >
                        Flag
                      </Button>
                    </div>
                  ),
                },
              ]}
              data={MOCK_PARCELS}
              keyExtractor={(p) => p.ulpin}
            />
          </Card>
        )}

        {/* TAB 3: MASTER PLAN */}
        {activeTab === "master-plan" && (
          <div className="space-y-4">
            <Card header="Gurugram-Manesar Urban Complex Master Plan 2031 Integration">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 font-bold block text-[10px] uppercase">Plan Authority</span>
                  <span className="text-sm font-extrabold text-slate-900 mt-1 block">Gurugram Metropolitan Dev Authority (GMDA)</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 font-bold block text-[10px] uppercase">Gazette Notification</span>
                  <span className="text-sm font-extrabold text-slate-900 mt-1 block">GMDA/TCP/2021-31/KDP</span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 font-bold block text-[10px] uppercase">Infrastructure Corridor</span>
                  <span className="text-sm font-extrabold text-emerald-700 mt-1 block">24m Proposed Arterial Sector Road</span>
                </div>
              </div>
            </Card>

            <Card header="Sector Master Plan Overlays">
              <DataTable
                columns={[
                  { key: "ulpin", header: "ULPIN", render: (p) => <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 text-xs inline-block">{p.ulpin}</span> },
                  { key: "survey", header: "Survey Plot", render: (p) => <span className="font-medium text-slate-800">Plot {p.survey_number}</span> },
                  { key: "alignment", header: "Master Plan Alignment", render: () => <span className="text-slate-700 text-xs">Conforms to 2031 Land Use Map</span> },
                  { key: "setback", header: "Road Widening Setback", render: (p) => <span className="text-slate-700 text-xs font-medium">{p.survey_number === "104" ? "4.5m Setback Reserved" : "Zero Setback Impact"}</span> },
                  {
                    key: "actions",
                    header: "Actions",
                    render: (p) => (
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => handleAction("Approve Alignment", p.ulpin)} className="py-1 px-2.5 text-[11px]">
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleAction("Flag Alignment", p.ulpin)} className="py-1 px-2.5 text-[11px]">
                          Flag
                        </Button>
                      </div>
                    ),
                  },
                ]}
                data={MOCK_PARCELS}
                keyExtractor={(p) => p.ulpin}
              />
            </Card>
          </div>
        )}

        {/* TAB 4: BUILDING PERMISSIONS */}
        {activeTab === "building-permissions" && (
          <Card header="Building Sanctions & Approvals (MCG Urban Branch)">
            <DataTable
              columns={[
                { key: "id", header: "Permit ID", render: () => <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 text-xs inline-block">BP-MCG-2023-0101</span> },
                { key: "ulpin", header: "Target Parcel", render: () => <span className="font-mono text-emerald-700 font-semibold text-xs">IN-HR-GGM-KDP-0101-0000</span> },
                { key: "type", header: "Project Type", render: () => <span className="font-bold text-slate-900 text-xs">G+2 Residential Villa</span> },
                { key: "area", header: "Sanctioned Area", render: () => <span className="font-medium text-slate-800 text-xs">320 m² Built-up</span> },
                { key: "status", header: "Status", render: () => <Badge variant="success">✓ Approved</Badge> },
                {
                  key: "actions",
                  header: "Sanction Actions",
                  render: () => (
                    <div className="flex gap-2">
                      <Button size="sm" variant="secondary" onClick={() => alert("Viewing full architectural blueprint and structural sanction.")} className="py-1 px-2.5 text-[11px]">
                        Review
                      </Button>
                      <Button size="sm" onClick={() => alert("Sanction stamp verified.")} className="py-1 px-2.5 text-[11px]">
                        Verify
                      </Button>
                    </div>
                  ),
                },
              ]}
              data={[{ id: "1" }]}
              keyExtractor={(b) => b.id}
            />
          </Card>
        )}
      </div>
    </div>
  );
}

export default function GovernmentPlanningPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500 text-xs">Loading Planning Console...</div>}>
      <PlanningContent />
    </Suspense>
  );
}
