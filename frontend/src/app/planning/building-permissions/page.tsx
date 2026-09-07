"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MOCK_BUILDING_PERMISSIONS } from "@/data/building-permissions";
import { formatDate } from "@/lib/formatters";
import { FileCheck, ArrowRight, Eye, AlertCircle } from "lucide-react";

export default function BuildingPermissionsPage() {
  const [filter, setFilter] = useState("ALL");

  const filtered = MOCK_BUILDING_PERMISSIONS.filter((b) => {
    if (filter === "ALL") return true;
    return b.approval_status === filter;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Municipal Building Permissions & Sanctions"
        subtitle="Verification of architectural approvals, permissible built-up areas, FAR sanctions, and occupancy certifications under the Municipal Corporation of Gurugram."
        breadcrumbs={[
          { label: "Planning", href: "/planning/land-use" },
          { label: "Building Permissions" },
        ]}
        badge={<Badge variant="success">MCG Online Sanctions</Badge>}
      />

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {["ALL", "APPROVED", "PENDING", "REJECTED"].map((st) => (
          <button
            key={st}
            onClick={() => setFilter(st)}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              filter === st
                ? "bg-slate-900 text-white font-semibold shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      <Card header="Building Permission Applications">
        <DataTable
          columns={[
            {
              key: "application_number",
              header: "Application / Sanction ID",
              render: (b) => (
                <div>
                  <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 text-xs inline-block">{b.application_number}</span>
                  <span className="text-[10px] text-slate-600 font-mono block mt-0.5">{b.permission_id}</span>
                </div>
              ),
            },
            {
              key: "ulpin",
              header: "Parcel",
              render: (b) => <span className="font-mono text-emerald-700 font-semibold text-xs">{b.ulpin}</span>,
            },
            {
              key: "building_type",
              header: "Project Type",
              render: (b) => <span className="font-bold text-slate-900 text-xs">{b.building_type}</span>,
            },
            {
              key: "authority",
              header: "Sanctioning Authority",
              render: (b) => <span className="text-slate-800 font-medium text-xs">{b.authority}</span>,
            },
            {
              key: "approval_status",
              header: "Status",
              render: (b) => (
                <Badge
                  variant={
                    b.approval_status === "APPROVED"
                      ? "success"
                      : b.approval_status === "PENDING"
                      ? "warning"
                      : "danger"
                  }
                >
                  {b.approval_status}
                </Badge>
              ),
            },
            {
              key: "approved_area_sq_meters",
              header: "Sanctioned Area",
              render: (b) => <span className="font-semibold text-slate-800 text-xs">{b.approved_area_sq_meters ? `${b.approved_area_sq_meters} m²` : "—"}</span>,
            },
            {
              key: "permission_date",
              header: "Sanction Date",
              render: (b) => <span className="text-slate-700 font-medium text-xs">{formatDate(b.permission_date)}</span>,
            },
            {
              key: "actions",
              header: "Action",
              render: (b) => (
                <Link href={`/parcel/${b.ulpin}`}>
                  <Button size="sm" variant="secondary" className="py-1 px-2 text-[11px] gap-1">
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                </Link>
              ),
            },
          ]}
          data={filtered}
          keyExtractor={(b) => b.permission_id}
          emptyMessage="No permissions match selected filter."
        />
      </Card>
    </div>
  );
}
