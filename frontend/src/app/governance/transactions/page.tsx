"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { MOCK_TRANSACTIONS } from "@/services/mock/governance-service";
import { TransactionRecord } from "@/types/governance";
import { formatDate, formatDateTime } from "@/lib/formatters";
import {
  Layers,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  Eye,
  ShieldCheck,
  Building,
  Clock,
} from "lucide-react";

export default function TransactionsPage() {
  const [selectedTx, setSelectedTx] = useState<TransactionRecord | null>(null);

  return (
    <div className="space-y-6">
      <PageHeader
        title="DPI Transaction Monitoring & Pre-Validation"
        subtitle="Automated multi-department consensus protocol inspecting identity, ownership, encumbrances, and revenue court stays before registry execution."
        breadcrumbs={[
          { label: "Governance", href: "/governance/transactions" },
          { label: "Transactions" },
        ]}
        badge={<Badge variant="success">Deterministic Rules Engine</Badge>}
      />

      <Card header="Recent Parcel Lifecycle Transactions">
        <DataTable
          columns={[
            {
              key: "transaction_id",
              header: "Transaction ID",
              render: (tx) => (
                <div>
                  <span className="font-mono font-bold text-slate-900 bg-slate-50 px-2 py-0.5 rounded border border-slate-200/90 text-xs inline-block whitespace-nowrap shadow-2xs">{tx.transaction_id}</span>
                  <span className="text-[10px] text-slate-600 block mt-0.5 whitespace-nowrap">{tx.executed_by_department}</span>
                </div>
              ),
            },
            {
              key: "ulpin",
              header: "Target ULPIN",
              render: (tx) => <span className="font-mono text-emerald-700 font-semibold text-xs">{tx.ulpin}</span>,
            },
            {
              key: "type",
              header: "Transaction Type",
              render: (tx) => <Badge variant="info">{tx.type.replace("_", " ")}</Badge>,
            },
            {
              key: "applicant_name",
              header: "Applicant / Parties",
              render: (tx) => (
                <div>
                  <span className="text-slate-900 font-bold block">{tx.applicant_name}</span>
                  <span className="text-[10px] text-slate-600">{tx.applicant_role}</span>
                </div>
              ),
            },
            {
              key: "submitted_date",
              header: "Date",
              render: (tx) => <span className="text-slate-700 font-medium text-xs">{formatDate(tx.submitted_date)}</span>,
            },
            {
              key: "status",
              header: "Engine Status",
              render: (tx) => (
                <Badge variant={tx.status === "VALIDATED" ? "success" : tx.status === "REJECTED" ? "danger" : "warning"}>
                  {tx.status}
                </Badge>
              ),
            },
            {
              key: "final_decision",
              header: "Decision",
              render: (tx) => (
                <Badge variant={tx.final_decision === "APPROVED" ? "success" : "danger"}>
                  {tx.final_decision === "APPROVED" ? "PERMITTED" : "BLOCKED"}
                </Badge>
              ),
            },
            {
              key: "actions",
              header: "Action",
              render: (tx) => (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setSelectedTx(tx)}
                  className="py-1 px-2.5 text-[11px] gap-1"
                >
                  <Eye className="w-3 h-3" />
                  <span>Inspect Steps</span>
                </Button>
              ),
            },
          ]}
          data={MOCK_TRANSACTIONS}
          keyExtractor={(tx) => tx.transaction_id}
        />
      </Card>

      {/* Transaction Steps Modal */}
      {selectedTx && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedTx(null)}
          title={`Pre-Validation Protocol: ${selectedTx.transaction_id}`}
          description={`Target ULPIN: ${selectedTx.ulpin} • Department: ${selectedTx.executed_by_department}`}
          maxWidth="lg"
        >
          <div className="space-y-4 text-xs">
            {/* Final Decision Highlight */}
            <div
              className={`p-4 rounded-xl border flex items-center justify-between ${
                selectedTx.final_decision === "APPROVED"
                  ? "bg-emerald-50 border-emerald-200 text-emerald-950"
                  : "bg-rose-50 border-rose-200 text-rose-950"
              }`}
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider block">Final Engine Decision:</span>
                <span className="text-base font-black mt-0.5 block">
                  {selectedTx.final_decision === "APPROVED" ? "TRANSFER PERMITTED (100% CLEAR)" : "TRANSFER BLOCKED (RESTRICTION FOUND)"}
                </span>
                <p className="text-[11px] mt-1 leading-relaxed opacity-90">{selectedTx.decision_reason}</p>
              </div>
              <Badge variant={selectedTx.final_decision === "APPROVED" ? "success" : "danger"} size="md">
                {selectedTx.final_decision}
              </Badge>
            </div>

            {/* Validation Steps Pipeline */}
            <div className="space-y-2">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-600 block">
                Deterministic Rule Validation Steps
              </span>

              <div className="space-y-2">
                {selectedTx.validation_steps.map((st, i) => (
                  <div
                    key={i}
                    className={`p-3 rounded-lg border flex items-start justify-between gap-3 ${
                      st.status === "PASSED"
                        ? "bg-emerald-50/70 border-emerald-200"
                        : "bg-rose-50 border-rose-200"
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      {st.status === "PASSED" ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <span className="font-bold text-slate-900 block">{st.step}</span>
                        <p className="text-slate-600 text-[11px] mt-0.5 leading-relaxed">{st.message}</p>
                      </div>
                    </div>
                    <Badge variant={st.status === "PASSED" ? "success" : "danger"}>
                      {st.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200 flex justify-end gap-2">
              <Link href={`/parcel/${selectedTx.ulpin}`}>
                <Button size="sm" variant="outline" className="text-xs">
                  Inspect Parcel 360°
                </Button>
              </Link>
              <Button size="sm" variant="secondary" onClick={() => setSelectedTx(null)} className="text-xs">
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
