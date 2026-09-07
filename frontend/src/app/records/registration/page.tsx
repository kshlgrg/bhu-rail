"use client";

import React from "react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MOCK_REGISTRATIONS } from "@/data/registrations";
import { formatDate, formatCurrency } from "@/lib/formatters";
import { FileCheck, ShieldCheck, Eye, ArrowRight } from "lucide-react";

export default function RegistrationPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Sub-Registrar Conveyance & Deed Registry"
        subtitle="Electronic registry of executed sale deeds, partition deeds, and gift deeds recorded under the Registration Act 1908."
        breadcrumbs={[
          { label: "Records", href: "/records/ror" },
          { label: "Registration" },
        ]}
        badge={<Badge variant="info">SRO Sohna</Badge>}
      />

      <Card header="Executed Registration Deeds">
        <DataTable
          columns={[
            {
              key: "deed_document_id",
              header: "Document ID",
              render: (reg) => (
                <div>
                  <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 text-xs inline-block">{reg.deed_document_id}</span>
                  <span className="text-[10px] text-slate-600 font-mono block mt-0.5">{reg.registration_id}</span>
                </div>
              ),
            },
            {
              key: "ulpin",
              header: "ULPIN",
              render: (reg) => <span className="font-mono text-emerald-700 font-semibold text-xs">{reg.ulpin}</span>,
            },
            {
              key: "registration_type",
              header: "Transaction Type",
              render: (reg) => <Badge variant="info">{reg.registration_type.replace("_", " ")}</Badge>,
            },
            {
              key: "registration_date",
              header: "Registration Date",
              render: (reg) => <span className="text-slate-700 font-medium text-xs">{formatDate(reg.registration_date)}</span>,
            },
            {
              key: "parties",
              header: "Parties (Buyer / Seller)",
              render: (reg) => (
                <div>
                  <span className="text-slate-900 font-bold block text-xs">{reg.buyer_name}</span>
                  <span className="text-[10px] text-slate-600 block">Ex: {reg.seller_name}</span>
                </div>
              ),
            },
            {
              key: "status",
              header: "Status",
              render: (reg) => <Badge variant="success">{reg.status}</Badge>,
            },
            {
              key: "verification",
              header: "Verification",
              render: (reg) => (
                <div className="flex items-center gap-1 text-emerald-700 text-[11px] font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Hash Intact</span>
                </div>
              ),
            },
            {
              key: "actions",
              header: "Action",
              render: (reg) => (
                <Link href={`/parcel/${reg.ulpin}`}>
                  <Button size="sm" variant="secondary" className="py-1 px-2.5 text-[11px] gap-1">
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                </Link>
              ),
            },
          ]}
          data={MOCK_REGISTRATIONS}
          keyExtractor={(reg) => reg.registration_id}
        />
      </Card>
    </div>
  );
}
