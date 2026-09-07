"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { MOCK_PROPERTY_TAX } from "@/data/property-tax";
import { formatCurrency, formatDate } from "@/lib/formatters";
import { Receipt, CheckCircle2, AlertTriangle, ArrowRight, Download, CreditCard } from "lucide-react";

export default function PropertyTaxPage() {
  const taxes = Object.values(MOCK_PROPERTY_TAX);
  const [payModalParcel, setPayModalParcel] = useState<string | null>(null);

  const handleSimulatePayment = (ulpin: string) => {
    setPayModalParcel(ulpin);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Municipal Property Tax & Assessment Registry"
        subtitle="Universal property tax assessments, automated conveyance clearance NOCs, and payment history under the Municipal Corporation of Gurugram (MCG)."
        breadcrumbs={[
          { label: "Property", href: "/property/tax" },
          { label: "Property Tax" },
        ]}
        badge={<Badge variant="success">MCG Revenue Gateway</Badge>}
      />

      <Card header="Cadastral Property Tax Assessments (Assessment Year 2024-2025)">
        <DataTable
          columns={[
            {
              key: "assessment_reference",
              header: "Assessment ID",
              render: (t) => (
                <div>
                  <span className="font-mono font-bold text-slate-900 block">{t.assessment_reference}</span>
                  <span className="text-[10px] text-slate-500 font-mono">{t.tax_record_id}</span>
                </div>
              ),
            },
            {
              key: "ulpin",
              header: "Target Parcel",
              render: (t) => <span className="font-mono text-emerald-700 font-semibold">{t.ulpin}</span>,
            },
            {
              key: "assessment_year",
              header: "Year",
              render: (t) => <span className="font-bold text-slate-800">{t.assessment_year}</span>,
            },
            {
              key: "annual_tax_amount",
              header: "Annual Tax",
              render: (t) => <span className="font-mono font-medium text-slate-800">{formatCurrency(t.annual_tax_amount)}</span>,
            },
            {
              key: "outstanding_amount",
              header: "Outstanding Arrears",
              render: (t) => (
                <span className={`font-mono font-bold ${t.outstanding_amount > 0 ? "text-rose-600" : "text-emerald-700"}`}>
                  {formatCurrency(t.outstanding_amount)}
                </span>
              ),
            },
            {
              key: "tax_status",
              header: "Tax Status",
              render: (t) => (
                <Badge variant={t.tax_status === "PAID" ? "success" : "danger"}>
                  {t.tax_status}
                </Badge>
              ),
            },
            {
              key: "actions",
              header: "Action",
              render: (t) => (
                <div className="flex gap-2">
                  <Link href={`/parcel/${t.ulpin}`}>
                    <Button size="sm" variant="secondary" className="py-1 px-2.5 text-[11px] gap-1">
                      <span>Receipts</span>
                      <ArrowRight className="w-3 h-3" />
                    </Button>
                  </Link>
                  {t.outstanding_amount > 0 && (
                    <Button
                      size="sm"
                      variant="primary"
                      onClick={() => handleSimulatePayment(t.ulpin)}
                      className="py-1 px-2.5 text-[11px] gap-1"
                    >
                      <CreditCard className="w-3 h-3" />
                      <span>Pay Dues</span>
                    </Button>
                  )}
                </div>
              ),
            },
          ]}
          data={taxes}
          keyExtractor={(t) => t.tax_record_id}
        />
      </Card>

      {/* Simulated Payment Modal */}
      {payModalParcel && (
        <Modal
          isOpen={true}
          onClose={() => setPayModalParcel(null)}
          title="Simulated Property Tax Payment Gateway"
          description="Demo Public Infrastructure Simulation • No real funds transferred"
          maxWidth="md"
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Target ULPIN:</span>
                <span className="font-mono text-emerald-700 font-semibold">{payModalParcel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Outstanding Balance:</span>
                <span className="font-bold text-rose-600 font-mono">
                  {formatCurrency(MOCK_PROPERTY_TAX[payModalParcel]?.outstanding_amount || 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Authority:</span>
                <span className="text-slate-800 font-medium">Municipal Corporation of Gurugram</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs">
              Instant reconciliation via UPI Bharat BillPay mock protocol.
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setPayModalParcel(null)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  alert(`Payment of ${formatCurrency(MOCK_PROPERTY_TAX[payModalParcel]?.outstanding_amount || 0)} simulated successfully! Receipt MCG-RCT-2024-DEMO generated.`);
                  setPayModalParcel(null);
                }}
                className="gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Confirm Simulated Payment</span>
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
