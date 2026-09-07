"use client";

import React from "react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MOCK_DISPUTES } from "@/data/disputes";
import { formatDate } from "@/lib/formatters";
import { Scale, AlertTriangle, ShieldAlert, ArrowRight } from "lucide-react";

export default function DisputesPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Revenue Court Disputes & Injunction Registry"
        subtitle="Electronic integration with Sub-Divisional Magistrate (SDM) Revenue Courts. Ingests stay orders, status quo decrees, and boundary challenges to enforce automated registry locks."
        breadcrumbs={[
          { label: "Governance", href: "/governance/transactions" },
          { label: "Disputes & Stays" },
        ]}
        badge={<Badge variant="danger">1 Active Court Stay</Badge>}
      />

      {/* Prominent Banner for Disputed Demo Parcel Plot 104 */}
      <div className="p-5 rounded-2xl border-2 border-rose-300 bg-rose-50 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-lg bg-rose-100 text-rose-700 border border-rose-200">
              <AlertTriangle className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-base font-bold text-rose-950">
                COURT RESTRICTION ACTIVE: Plot 104 (Kadarpur)
              </h2>
              <p className="text-xs text-rose-800 font-mono">
                ULPIN: IN-HR-GGM-KDP-0104-0000 • Case: REV/COURT/SOHNA/2024/771
              </p>
            </div>
          </div>
          <Badge variant="danger" size="md">
            TRANSFER BLOCKED
          </Badge>
        </div>

        <p className="text-xs text-rose-900 leading-relaxed max-w-4xl">
          Order of the Court of Sub-Divisional Magistrate Sohna issued under Section 145 CrPC & Haryana Land Revenue Act. Status Quo decreed on northern boundary adjacent to village public pathway. Conveyance sale deeds, mutations, and mortgage registrations are automatedly frozen on the Bhu-Rail DPI.
        </p>

        <div className="pt-2 flex gap-3">
          <Link href="/governance/fraud-prevention">
            <Button size="sm" variant="danger" className="gap-1.5 text-xs">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Simulate Fraud Attempt Demo</span>
            </Button>
          </Link>
          <Link href="/parcel/IN-HR-GGM-KDP-0104-0000">
            <Button size="sm" variant="outline" className="gap-1.5 text-xs bg-white text-slate-800 border-slate-300 hover:bg-slate-50">
              <span>Inspect Plot 104 in 360°</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>

      <Card header="Active & Discharged Revenue Court Cases">
        <DataTable
          columns={[
            {
              key: "case_number",
              header: "Case Number",
              render: (d) => (
                <div>
                  <span className="font-mono font-bold text-slate-900 bg-slate-50 px-2 py-0.5 rounded border border-slate-200/90 text-xs inline-block whitespace-nowrap shadow-2xs">{d.case_number}</span>
                  <span className="text-[10px] text-slate-600 block mt-0.5 font-mono whitespace-nowrap">{d.dispute_id}</span>
                </div>
              ),
            },
            {
              key: "ulpin",
              header: "ULPIN",
              render: (d) => <span className="font-mono text-emerald-700 font-semibold text-xs">{d.ulpin}</span>,
            },
            {
              key: "type",
              header: "Dispute Type",
              render: (d) => <Badge variant="danger">{d.type.replace("_", " ")}</Badge>,
            },
            {
              key: "adjudicating_authority",
              header: "Adjudicating Authority",
              render: (d) => <span className="text-slate-800 font-medium text-xs">{d.adjudicating_authority}</span>,
            },
            {
              key: "parties",
              header: "Petitioner vs Respondent",
              render: (d) => (
                <div>
                  <span className="font-bold text-slate-900 block text-xs">{d.petitioner}</span>
                  <span className="text-[11px] text-slate-600 block font-medium">vs {d.respondent}</span>
                </div>
              ),
            },
            {
              key: "injunction",
              header: "Transfer Freeze",
              render: (d) => (
                <Badge variant={d.injunction_freeze_transfers ? "danger" : "neutral"}>
                  {d.injunction_freeze_transfers ? "TRANSFER FROZEN" : "NO INJUNCTION"}
                </Badge>
              ),
            },
            {
              key: "date_filed",
              header: "Date Filed",
              render: (d) => <span className="text-slate-700 font-medium text-xs">{formatDate(d.date_filed)}</span>,
            },
            {
              key: "actions",
              header: "Action",
              render: (d) => (
                <Link href={`/parcel/${d.ulpin}`}>
                  <Button size="sm" variant="secondary" className="py-1 px-2.5 text-[11px] gap-1">
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                </Link>
              ),
            },
          ]}
          data={MOCK_DISPUTES}
          keyExtractor={(d) => d.dispute_id}
        />
      </Card>
    </div>
  );
}
