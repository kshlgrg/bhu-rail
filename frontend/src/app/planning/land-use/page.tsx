"use client";

import React from "react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MOCK_LAND_USE } from "@/data/land-use";
import { MOCK_PARCELS } from "@/data/parcels";
import { formatArea } from "@/lib/formatters";
import { Layers, ArrowRight, Building } from "lucide-react";

export default function LandUsePage() {
  const tableData = MOCK_LAND_USE.map((l) => {
    const p = MOCK_PARCELS.find((parcel) => parcel.ulpin === l.ulpin);
    return {
      ...l,
      survey_number: p?.survey_number || "—",
      area: p?.spatial.area_sq_meters || 0,
    };
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Statutory Land Use Classifications"
        subtitle="Town and Country Planning statutory zoning overlays. Controls permissible activities, master plan alignments, and change of land use (CLU) clearance."
        breadcrumbs={[
          { label: "Planning", href: "/planning/land-use" },
          { label: "Land Use" },
        ]}
        badge={<Badge variant="info">Master Plan 2031</Badge>}
      />

      <Card header="Cadastral Land Use Classifications">
        <DataTable
          columns={[
            {
              key: "ulpin",
              header: "ULPIN",
              render: (l) => (
                <div>
                  <span className="font-mono text-emerald-700 font-bold block text-xs">{l.ulpin}</span>
                  <span className="text-[10px] text-slate-600 block mt-0.5">Plot {l.survey_number}</span>
                </div>
              ),
            },
            {
              key: "land_use_category",
              header: "Current Land Use",
              render: (l) => (
                <Badge
                  variant={
                    l.land_use_category === "RESIDENTIAL"
                      ? "success"
                      : l.land_use_category === "COMMERCIAL"
                      ? "info"
                      : "warning"
                  }
                >
                  {l.land_use_category}
                </Badge>
              ),
            },
            {
              key: "zoning_category",
              header: "Permitted Use Zone",
              render: (l) => <span className="font-bold text-slate-900 text-xs">{l.zoning_category}</span>,
            },
            {
              key: "area",
              header: "Parcel Area",
              render: (l) => <span className="font-semibold text-slate-800 text-xs">{formatArea(l.area)}</span>,
            },
            {
              key: "status",
              header: "Regulatory Status",
              render: (l) => (
                <Badge variant={l.is_acquisition_zone ? "danger" : "success"}>
                  {l.is_acquisition_zone ? "ACQUISITION ZONE" : "CONFORMING USE"}
                </Badge>
              ),
            },
            {
              key: "source",
              header: "Statutory Source",
              render: (l) => <span className="text-slate-600 text-[11px] font-medium">{l.source}</span>,
            },
            {
              key: "actions",
              header: "Action",
              render: (l) => (
                <Link href={`/parcel/${l.ulpin}`}>
                  <Button size="sm" variant="secondary" className="py-1 px-2.5 text-[11px] gap-1">
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                </Link>
              ),
            },
          ]}
          data={tableData}
          keyExtractor={(l) => l.ulpin}
        />
      </Card>
    </div>
  );
}
