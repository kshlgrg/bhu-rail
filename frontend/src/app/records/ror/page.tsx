"use client";

import React from "react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MOCK_ROR } from "@/data/ror";
import { formatDate } from "@/lib/formatters";
import { FileText, Eye, ArrowRight, ShieldCheck } from "lucide-react";

export default function RoRPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Record of Rights (RoR / Jamabandi)"
        subtitle="Authoritative ownership registry under the Haryana Land Revenue Act. Connects freehold ownership shares and deed documentation hashes to verified ULPIN assets."
        breadcrumbs={[
          { label: "Records", href: "/records/ror" },
          { label: "RoR / Jamabandi" },
        ]}
        badge={<Badge variant="success">Revenue Sync Active</Badge>}
      />

      <Card header="Jamabandi Ownership Registry (Kadarpur Pilot)">
        <DataTable
          columns={[
            {
              key: "ulpin",
              header: "Parcel & ULPIN",
              render: (r) => (
                <div>
                  <span className="font-mono text-emerald-700 font-bold block text-xs">{r.ulpin}</span>
                  <span className="text-[10px] text-slate-600 font-mono">Right #{r.right_id}</span>
                </div>
              ),
            },
            {
              key: "holder_name",
              header: "Recorded Title Holder",
              render: (r) => (
                <div>
                  <span className="font-bold text-slate-900 block text-xs">{r.holder_name}</span>
                  <span className="text-[10px] text-slate-600 font-mono">{r.holder_identity_hash}</span>
                </div>
              ),
            },
            {
              key: "type",
              header: "Right Type",
              render: (r) => <Badge variant="success">{r.type.replace("_", " ")}</Badge>,
            },
            {
              key: "share_fraction",
              header: "Share",
              render: (r) => <span className="font-mono font-bold text-slate-900 text-xs">{r.share_fraction}</span>,
            },
            {
              key: "is_active",
              header: "Record Status",
              render: (r) => (
                <Badge variant={r.is_active ? "success" : "neutral"}>
                  {r.is_active ? "ACTIVE TITLE" : "SUPERSEDED"}
                </Badge>
              ),
            },
            {
              key: "issuing_authority",
              header: "Issuing Authority",
              render: (r) => <span className="text-slate-800 font-medium text-xs">{r.issuing_authority}</span>,
            },
            {
              key: "valid_from",
              header: "Effective Date",
              render: (r) => <span className="text-slate-700 font-medium text-xs">{formatDate(r.valid_from)}</span>,
            },
            {
              key: "actions",
              header: "Action",
              render: (r) => (
                <Link href={`/parcel/${r.ulpin}`}>
                  <Button size="sm" variant="secondary" className="py-1 px-2.5 text-[11px] gap-1">
                    <span>View Record</span>
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                </Link>
              ),
            },
          ]}
          data={MOCK_ROR}
          keyExtractor={(r) => r.right_id}
        />
      </Card>
    </div>
  );
}
