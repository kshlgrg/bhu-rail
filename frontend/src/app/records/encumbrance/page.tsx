"use client";

import React from "react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MOCK_ENCUMBRANCES } from "@/data/encumbrances";
import { formatDate, formatCurrency } from "@/lib/formatters";
import { ShieldAlert, AlertTriangle, ArrowRight, CheckCircle2 } from "lucide-react";

export default function EncumbrancePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Central Encumbrance & Mortgage Registry"
        subtitle="Universal institutional lien registry integrating scheduled commercial banks, revenue tax liens, and statutory attachment notices."
        breadcrumbs={[
          { label: "Records", href: "/records/ror" },
          { label: "Encumbrance" },
        ]}
        badge={<Badge variant="warning">Bank API Sync</Badge>}
      />

      {/* Warning highlight for Plot 102 active mortgage */}
      <div className="p-4 rounded-xl border border-amber-200 bg-amber-50 text-amber-900 flex items-start gap-3 text-xs shadow-sm">
        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-amber-950 text-sm">Live Encumbrance Alert: Commercial Plot 102</h4>
          <p className="mt-0.5 leading-relaxed text-amber-800">
            ULPIN IN-HR-GGM-KDP-0102-0000 has an active equitable mortgage of ₹45,00,000 registered to State Bank of India (Gurugram Branch). The automated rule engine prevents any title conveyance or subdivision without an authorized Bank Discharge Certificate.
          </p>
        </div>
      </div>

      <Card header="Encumbrance Registry">
        <DataTable
          columns={[
            {
              key: "type",
              header: "Mortgage / Charge Type",
              render: (e) => <Badge variant={e.is_active ? "warning" : "neutral"}>{e.type.replace("_", " ")}</Badge>,
            },
            {
              key: "institution_name",
              header: "Lending Bank / Institution",
              render: (e) => (
                <div>
                  <span className="font-bold text-slate-900 block text-xs">{e.institution_name}</span>
                  <span className="text-[10px] text-slate-600 font-mono mt-0.5 block">Ref <span className="font-bold text-slate-800">#{e.reference_document_no}</span></span>
                </div>
              ),
            },
            {
              key: "ulpin",
              header: "Target Parcel",
              render: (e) => <span className="font-mono text-emerald-700 font-semibold text-xs">{e.ulpin}</span>,
            },
            {
              key: "claim_amount_inr",
              header: "Claim Amount",
              render: (e) => (
                <span className="font-mono font-bold text-slate-900 text-xs">
                  {formatCurrency(e.claim_amount_inr)}
                </span>
              ),
            },
            {
              key: "status",
              header: "Status",
              render: (e) => (
                <Badge variant={e.is_active ? "danger" : "success"}>
                  {e.is_active ? "ACTIVE LIEN" : "DISCHARGED / CLEAR"}
                </Badge>
              ),
            },
            {
              key: "date_registered",
              header: "Registered Date",
              render: (e) => <span className="text-slate-700 font-medium text-xs">{formatDate(e.date_registered)}</span>,
            },
            {
              key: "actions",
              header: "Action",
              render: (e) => (
                <Link href={`/parcel/${e.ulpin}`}>
                  <Button size="sm" variant="secondary" className="py-1 px-2.5 text-[11px] gap-1">
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                </Link>
              ),
            },
          ]}
          data={MOCK_ENCUMBRANCES}
          keyExtractor={(e) => e.encumbrance_id}
        />
      </Card>
    </div>
  );
}
