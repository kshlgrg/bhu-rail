"use client";

import React from "react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MOCK_MASTER_PLANS } from "@/data/master-plans";
import { formatDate } from "@/lib/formatters";
import { Compass, ArrowRight, ExternalLink } from "lucide-react";

export default function MasterPlanPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Metropolitan Master Plan Alignment (GMDA 2031)"
        subtitle="Cross-department spatial alignment between cadastre parcels and Gurugram Metropolitan Development Authority statutory master plan sectors."
        breadcrumbs={[
          { label: "Planning", href: "/planning/land-use" },
          { label: "Master Plan" },
        ]}
        badge={<Badge variant="info">GMDA Statutory</Badge>}
      />

      <Card header="Cadastral Master Plan Alignment Records">
        <DataTable
          columns={[
            {
              key: "plan_reference",
              header: "Master Plan Ref",
              render: (m) => <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 text-xs inline-block">{m.plan_reference}</span>,
            },
            {
              key: "ulpin",
              header: "Target Parcel",
              render: (m) => <span className="font-mono text-emerald-700 font-semibold text-xs">{m.ulpin}</span>,
            },
            {
              key: "planning_authority",
              header: "Planning Authority",
              render: (m) => <span className="text-slate-800 font-medium text-xs">{m.planning_authority}</span>,
            },
            {
              key: "zone_category",
              header: "Zone Allocation",
              render: (m) => <Badge variant="info">{m.zone_category}</Badge>,
            },
            {
              key: "development_status",
              header: "Infrastructure Status",
              render: (m) => (
                <Badge variant={m.development_status.includes("RESTRICTED") ? "danger" : "success"}>
                  {m.development_status}
                </Badge>
              ),
            },
            {
              key: "restriction_notes",
              header: "Statutory Buffer & Restrictions",
              render: (m) => <span className="text-slate-600 text-[11px] max-w-xs block leading-tight font-normal">{m.restriction_notes || "Conforming development."}</span>,
            },
            {
              key: "actions",
              header: "Action",
              render: (m) => (
                <Link href={`/parcel/${m.ulpin}`}>
                  <Button size="sm" variant="secondary" className="py-1 px-2 text-[11px] gap-1">
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                </Link>
              ),
            },
          ]}
          data={MOCK_MASTER_PLANS}
          keyExtractor={(m) => m.plan_reference + m.ulpin}
        />
      </Card>
    </div>
  );
}
