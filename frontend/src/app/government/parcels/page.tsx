"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { MOCK_PARCELS } from "@/data/parcels";
import { formatArea, formatDate } from "@/lib/formatters";
import {
  Layers,
  Search,
  Filter,
  ArrowRight,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Compass,
} from "lucide-react";

export default function GovernmentAllParcelsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [landUseFilter, setLandUseFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [disputeFilter, setDisputeFilter] = useState("ALL");
  const [encumbranceFilter, setEncumbranceFilter] = useState("ALL");

  const filteredParcels = useMemo(() => {
    return MOCK_PARCELS.filter((parcel) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesUlpin = parcel.ulpin.toLowerCase().includes(q);
        const matchesSurvey = parcel.survey_number.toLowerCase().includes(q);
        const matchesOwner = parcel.primary_owner?.toLowerCase().includes(q);
        if (!matchesUlpin && !matchesSurvey && !matchesOwner) return false;
      }

      // Land Use
      if (landUseFilter !== "ALL" && parcel.land_use !== landUseFilter) return false;

      // Status
      if (statusFilter !== "ALL" && parcel.status !== statusFilter) return false;

      // Dispute
      if (disputeFilter === "YES" && !parcel.has_dispute) return false;
      if (disputeFilter === "NO" && parcel.has_dispute) return false;

      // Encumbrance
      if (encumbranceFilter === "YES" && !parcel.has_encumbrance) return false;
      if (encumbranceFilter === "NO" && parcel.has_encumbrance) return false;

      return true;
    });
  }, [searchQuery, landUseFilter, statusFilter, disputeFilter, encumbranceFilter]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="All Parcels"
        subtitle="Government cadastral registry spanning statewide spatial geometries, ownership rights, encumbrance charges, and judicial restrictions."
        breadcrumbs={[{ label: "Officer Dashboard", href: "/dashboard/government" }, { label: "All Parcels" }]}
        badge={<Badge variant="info">Government Authority View</Badge>}
        actions={
          <Link href="/explorer">
            <Button size="sm" variant="secondary" className="gap-1.5 font-semibold">
              <Compass className="w-3.5 h-3.5 text-blue-600" />
              <span>Cadastral GIS Map</span>
            </Button>
          </Link>
        }
      />

      {/* Filter & Search Bar */}
      <Card className="p-4 bg-white border-slate-200 shadow-sm space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {/* Search Box */}
          <div className="lg:col-span-2">
            <Input
              placeholder="Search by ULPIN, Survey No, Owner..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={Search}
            />
          </div>

          {/* Land Use Filter */}
          <Select
            value={landUseFilter}
            onChange={(e) => setLandUseFilter(e.target.value)}
            options={[
              { label: "All Land Uses", value: "ALL" },
              { label: "Residential", value: "RESIDENTIAL" },
              { label: "Commercial", value: "COMMERCIAL" },
              { label: "Agricultural", value: "AGRICULTURAL" },
            ]}
          />

          {/* Dispute Filter */}
          <Select
            value={disputeFilter}
            onChange={(e) => setDisputeFilter(e.target.value)}
            options={[
              { label: "All Litigation Statuses", value: "ALL" },
              { label: "Active Court Injunction", value: "YES" },
              { label: "Clean / No Disputes", value: "NO" },
            ]}
          />

          {/* Encumbrance Filter */}
          <Select
            value={encumbranceFilter}
            onChange={(e) => setEncumbranceFilter(e.target.value)}
            options={[
              { label: "All Mortgage Statuses", value: "ALL" },
              { label: "Active Bank Mortgage", value: "YES" },
              { label: "No Encumbrances", value: "NO" },
            ]}
          />
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span>Showing <strong>{filteredParcels.length}</strong> of {MOCK_PARCELS.length} pilot parcels</span>
          <button
            onClick={() => {
              setSearchQuery("");
              setLandUseFilter("ALL");
              setStatusFilter("ALL");
              setDisputeFilter("ALL");
              setEncumbranceFilter("ALL");
            }}
            className="text-blue-700 hover:text-blue-800 font-semibold"
          >
            Reset Filters
          </button>
        </div>
      </Card>

      {/* Parcels Table */}
      <Card header="Cadastral Parcels Directory">
        <DataTable
          columns={[
            {
              key: "ulpin",
              header: "ULPIN & Cadastral ID",
              render: (p) => (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200/90 whitespace-nowrap shadow-2xs">
                  <span className="font-mono font-bold text-slate-900 text-xs tracking-tight select-all">
                    {p.ulpin}
                  </span>
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-white text-slate-600 border border-slate-200">
                    v{p.version}
                  </span>
                </div>
              ),
            },
            {
              key: "survey_number",
              header: "Survey No.",
              render: (p) => (
                <span className="font-mono font-bold text-slate-900 text-xs whitespace-nowrap">
                  Plot {p.survey_number}
                </span>
              ),
            },
            {
              key: "village",
              header: "Village",
              render: (p) => <span className="font-medium text-slate-700 text-xs whitespace-nowrap">{p.village}</span>,
            },
            {
              key: "primary_owner",
              header: "Owner",
              render: (p) => (
                <span className="font-bold text-slate-900 text-xs whitespace-nowrap">
                  {p.primary_owner || "—"}
                </span>
              ),
            },
            {
              key: "area_sq_meters",
              header: "Area",
              render: (p) => (
                <div className="whitespace-nowrap">
                  <span className="font-semibold text-slate-800 text-xs block">{formatArea(p.spatial.area_sq_meters)}</span>
                  <span className="text-[10px] text-slate-500 font-normal block">
                    ({(p.spatial.area_sq_meters * 1.19599).toFixed(1)} sq yd)
                  </span>
                </div>
              ),
            },
            {
              key: "land_use",
              header: "Land Use",
              render: (p) => (
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-slate-100 text-slate-700 border border-slate-200 whitespace-nowrap">
                  {p.land_use || "RESIDENTIAL"}
                </span>
              ),
            },
            {
              key: "status",
              header: "Cadastre Status",
              render: (p) => {
                if (p.status === "ACTIVE") {
                  return <Badge variant="success" dot={true}>Clear Title</Badge>;
                }
                if (p.status === "FROZEN_BY_COURT") {
                  return <Badge variant="danger" dot={true}>Injunction Active</Badge>;
                }
                if (p.status === "MUTATION_PENDING") {
                  return <Badge variant="info" dot={true}>Mutation Pending</Badge>;
                }
                return <Badge variant="warning" dot={true}>Transfer Locked</Badge>;
              },
            },
            {
              key: "risk",
              header: "Title & Encumbrance",
              render: (p) => {
                if (p.has_dispute) {
                  return <Badge variant="danger" dot={true}>Dispute Registered</Badge>;
                }
                if (p.has_encumbrance) {
                  return <Badge variant="warning" dot={true}>Mortgage Active</Badge>;
                }
                return <Badge variant="success" dot={true}>Clear Title</Badge>;
              },
            },
            {
              key: "last_updated",
              header: "Last Updated",
              render: (p) => <span className="text-slate-600 text-xs font-medium whitespace-nowrap">{formatDate(p.spatial.survey_date)}</span>,
            },
            {
              key: "actions",
              header: "Action",
              render: (p) => (
                <Link href={`/parcel/${p.ulpin}`} className="inline-block">
                  <Button
                    size="sm"
                    variant="outline"
                    className="whitespace-nowrap text-xs font-semibold px-2.5 py-1 h-7 gap-1 bg-white hover:bg-slate-50 border-slate-300 text-slate-800 hover:text-slate-950 shadow-2xs"
                  >
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3 text-slate-400" />
                  </Button>
                </Link>
              ),
            },
          ]}
          data={filteredParcels}
          keyExtractor={(p) => p.ulpin}
          emptyMessage="No cadastral parcels match the selected criteria."
        />
      </Card>
    </div>
  );
}
