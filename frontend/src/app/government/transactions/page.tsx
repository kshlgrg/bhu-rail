"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { formatDate, formatCurrency } from "@/lib/formatters";
import {
  ArrowLeftRight,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Eye,
  ShieldCheck,
  ShieldAlert,
  Building2,
  FileCheck,
  UserCheck,
} from "lucide-react";

export interface TransactionRecord {
  transaction_id: string;
  ulpin: string;
  survey_number: string;
  type: string;
  applicant: string;
  date: string;
  validation: string;
  status: "Eligible" | "Under Review" | "Blocked" | "Completed";
  consideration: number;
  checks: {
    name: string;
    description: string;
    passed: boolean;
    rule_code: string;
    details: string;
  }[];
}

const TRANSACTIONS_DATA: TransactionRecord[] = [
  {
    transaction_id: "TXN-2026-0819",
    ulpin: "IN-HR-GGM-KDP-0101-0000",
    survey_number: "101",
    type: "Sale Deed Conveyance",
    applicant: "Suresh Chandra Yadav -> Ramesh Kumar",
    date: "2026-03-05T10:00:00Z",
    validation: "All 5 Checks Passed",
    status: "Eligible",
    consideration: 8500000,
    checks: [
      { name: "Identity Verification", description: "Aadhaar e-KYC biometric token", passed: true, rule_code: "RULE-AUTH-EKYC-VERIFIED", details: "Biometric token validated." },
      { name: "Ownership Verification", description: "Canonical Jamabandi Title", passed: true, rule_code: "RULE-ROR-FREEHOLD-CLEAR", details: "100% Freehold ownership verified." },
      { name: "Encumbrance Check", description: "Bank charges & mortgage search", passed: true, rule_code: "RULE-ENCUMBRANCE-NIL", details: "Zero active bank liens." },
      { name: "Court Check", description: "Judicial injunction registry", passed: true, rule_code: "RULE-JUDICIAL-INJUNCTION-NONE", details: "No active stays or injunctions." },
      { name: "Planning Check", description: "GMDA Master Plan & FAR zoning", passed: true, rule_code: "RULE-PLANNING-ZONING-PASS", details: "Conforms to Residential zoning R-1." },
    ],
  },
  {
    transaction_id: "TXN-2026-0820",
    ulpin: "IN-HR-GGM-KDP-0104-0000",
    survey_number: "104",
    type: "Sale Deed Transfer",
    applicant: "Devendra Singh -> Sunil Mehta",
    date: "2026-03-04T14:30:00Z",
    validation: "Court Injunction Block",
    status: "Blocked",
    consideration: 6200000,
    checks: [
      { name: "Identity Verification", description: "Aadhaar e-KYC biometric token", passed: true, rule_code: "RULE-AUTH-EKYC-VERIFIED", details: "Biometric identity verified." },
      { name: "Ownership Verification", description: "Canonical Jamabandi Title", passed: true, rule_code: "RULE-ROR-FREEHOLD-CLEAR", details: "Title record present." },
      { name: "Encumbrance Check", description: "Bank charges & mortgage search", passed: true, rule_code: "RULE-ENCUMBRANCE-NIL", details: "No bank mortgage." },
      { name: "Court Check", description: "Judicial injunction registry", passed: false, rule_code: "RULE-JUDICIAL-INJUNCTION-ACTIVE", details: "TRANSFER BLOCKED: SDM Sohna Status Quo Stay (Case CIV-2025-01821)." },
      { name: "Planning Check", description: "GMDA Master Plan & FAR zoning", passed: true, rule_code: "RULE-PLANNING-ZONING-PASS", details: "Agricultural classification." },
    ],
  },
  {
    transaction_id: "TXN-2026-0821",
    ulpin: "IN-HR-GGM-KDP-0102-0000",
    survey_number: "102",
    type: "Mortgage Refinance",
    applicant: "Anita Sharma -> HDFC Bank",
    date: "2026-03-03T11:15:00Z",
    validation: "Prior Charge Exists",
    status: "Under Review",
    consideration: 4500000,
    checks: [
      { name: "Identity Verification", description: "Aadhaar e-KYC biometric token", passed: true, rule_code: "RULE-AUTH-EKYC-VERIFIED", details: "Biometric identity confirmed." },
      { name: "Ownership Verification", description: "Canonical Jamabandi Title", passed: true, rule_code: "RULE-ROR-FREEHOLD-CLEAR", details: "Title confirmed." },
      { name: "Encumbrance Check", description: "Bank charges & mortgage search", passed: false, rule_code: "RULE-ENCUMBRANCE-ACTIVE", details: "Active SBI charge for ₹45 Lakh requires discharge certificate or pari-passu NOC." },
      { name: "Court Check", description: "Judicial injunction registry", passed: true, rule_code: "RULE-JUDICIAL-INJUNCTION-NONE", details: "No court stays." },
      { name: "Planning Check", description: "GMDA Master Plan & FAR zoning", passed: true, rule_code: "RULE-PLANNING-ZONING-PASS", details: "Commercial R-Zone." },
    ],
  },
  {
    transaction_id: "TXN-2026-0798",
    ulpin: "IN-HR-GGM-KDP-0103-0000",
    survey_number: "103",
    type: "Inheritance Mutation",
    applicant: "Late R. Yadav -> Suresh C. Yadav",
    date: "2026-02-18T09:00:00Z",
    validation: "Completed & Sealed",
    status: "Completed",
    consideration: 0,
    checks: [
      { name: "Identity Verification", description: "Legal heir survivor certificate", passed: true, rule_code: "RULE-AUTH-EKYC-VERIFIED", details: "Survivor certificates validated." },
      { name: "Ownership Verification", description: "Ancestral pedigree tree", passed: true, rule_code: "RULE-ROR-FREEHOLD-CLEAR", details: "Genealogy confirmed." },
      { name: "Encumbrance Check", description: "Zero lien clearance", passed: true, rule_code: "RULE-ENCUMBRANCE-NIL", details: "Clear freehold." },
      { name: "Court Check", description: "No probate caveat", passed: true, rule_code: "RULE-JUDICIAL-INJUNCTION-NONE", details: "No caveats filed." },
      { name: "Planning Check", description: "Residential Master Plan", passed: true, rule_code: "RULE-PLANNING-ZONING-PASS", details: "Sanctioned residential." },
    ],
  },
];

export default function GovernmentTransactionsPage() {
  const [transactions, setTransactions] = useState<TransactionRecord[]>(TRANSACTIONS_DATA);
  const [selectedTxn, setSelectedTxn] = useState<TransactionRecord | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Eligible":
        return <Badge variant="success">✓ Clear / Eligible</Badge>;
      case "Completed":
        return <Badge variant="success">✓ Completed</Badge>;
      case "Under Review":
        return <Badge variant="warning">⏱ Under Review</Badge>;
      case "Blocked":
        return <Badge variant="danger">⚠ Injunction Active</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  const handleApproveTxn = (id: string) => {
    setTransactions(transactions.map((t) => (t.transaction_id === id ? { ...t, status: "Completed" } : t)));
    setSelectedTxn(null);
    setToastMessage(`Transaction ${id} sanctioned. State transition block committed to Trust Ledger.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Land Transactions"
        subtitle="Automated pre-validation engine executing multi-departmental deterministic rules before deed registration."
        breadcrumbs={[{ label: "Officer Dashboard", href: "/dashboard/government" }, { label: "Transactions" }]}
        badge={<Badge variant="info">31 in Pipeline</Badge>}
      />

      {toastMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Transactions Table */}
      <Card header="Land Transaction Pre-Validation Pipeline">
        <DataTable
          columns={[
            {
              key: "transaction_id",
              header: "Transaction ID",
              render: (t) => (
                <div>
                  <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 text-xs inline-block">{t.transaction_id}</span>
                  <span className="text-[10px] text-slate-600 block mt-0.5 font-medium">{t.type}</span>
                </div>
              ),
            },
            {
              key: "ulpin",
              header: "ULPIN",
              render: (t) => (
                <div>
                  <span className="font-mono font-bold text-emerald-700 text-xs">{t.ulpin}</span>
                  <span className="text-[10px] text-slate-500 block">Plot {t.survey_number}</span>
                </div>
              ),
            },
            {
              key: "type",
              header: "Type",
              render: (t) => <span className="font-semibold text-slate-800">{t.type}</span>,
            },
            {
              key: "applicant",
              header: "Applicant / Parties",
              render: (t) => <span className="text-slate-700 font-medium">{t.applicant}</span>,
            },
            {
              key: "date",
              header: "Date",
              render: (t) => <span>{formatDate(t.date)}</span>,
            },
            {
              key: "validation",
              header: "Validation Check",
              render: (t) => (
                <span className={`font-semibold text-xs ${t.status === "Blocked" ? "text-rose-700" : "text-slate-700"}`}>
                  {t.validation}
                </span>
              ),
            },
            {
              key: "status",
              header: "Status",
              render: (t) => getStatusBadge(t.status),
            },
            {
              key: "actions",
              header: "Action",
              render: (t) => (
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => setSelectedTxn(t)}
                  className="py-1 px-3 text-[11px] gap-1 font-bold shadow-sm"
                >
                  <Eye className="w-3 h-3" />
                  <span>Inspect</span>
                </Button>
              ),
            },
          ]}
          data={transactions}
          keyExtractor={(t) => t.transaction_id}
        />
      </Card>

      {/* Transaction Detail Modal */}
      {selectedTxn && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedTxn(null)}
          title={`Transaction Inspection: ${selectedTxn.transaction_id}`}
          description={`Pre-validation verification for ${selectedTxn.type}`}
          maxWidth="xl"
        >
          <div className="space-y-4 text-xs">
            {/* Metadata Summary */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-2 gap-3">
              <div>
                <span className="text-slate-500 font-bold block text-[10px] uppercase">Parties</span>
                <span className="font-bold text-slate-900 text-sm">{selectedTxn.applicant}</span>
              </div>
              <div>
                <span className="text-slate-500 font-bold block text-[10px] uppercase">ULPIN Target</span>
                <span className="font-mono font-bold text-slate-900">{selectedTxn.ulpin}</span>
                <span className="text-[10px] text-slate-500 block">Plot {selectedTxn.survey_number}</span>
              </div>
              <div>
                <span className="text-slate-500 font-bold block text-[10px] uppercase">Consideration</span>
                <span className="font-mono font-bold text-slate-900">{selectedTxn.consideration ? formatCurrency(selectedTxn.consideration) : "N/A (Statutory Mutation)"}</span>
              </div>
              <div>
                <span className="text-slate-500 font-bold block text-[10px] uppercase">Status</span>
                {getStatusBadge(selectedTxn.status)}
              </div>
            </div>

            {/* Multi-Stage Pre-Validation Check List */}
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                Deterministic Pre-Validation Stages
              </h4>

              <div className="space-y-2">
                {selectedTxn.checks.map((check, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border flex items-start justify-between gap-3 ${
                      check.passed
                        ? "bg-white border-slate-200"
                        : "bg-rose-50 border-rose-200 text-rose-900"
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      {check.passed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-rose-600 mt-0.5 flex-shrink-0" />
                      )}
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{check.name}</span>
                          <span className="font-mono text-[10px] text-slate-500">[{check.rule_code}]</span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-0.5 leading-relaxed">{check.details}</p>
                      </div>
                    </div>

                    <Badge variant={check.passed ? "success" : "danger"}>
                      {check.passed
                        ? check.name.includes("Identity") || check.name.includes("Ownership")
                          ? "✓ Verified"
                          : "✓ Clear"
                        : check.name.includes("Court")
                        ? "⚠ Injunction Active"
                        : check.name.includes("Encumbrance")
                        ? "⚠ Mortgage Active"
                        : "⚠ Requires Review"}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Final Decision Box */}
            <div className={`p-4 rounded-xl border ${selectedTxn.status === "Blocked" ? "bg-rose-50 border-rose-200 text-rose-900" : "bg-emerald-50 border-emerald-200 text-emerald-900"}`}>
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-xs uppercase tracking-wider block">Final Engine Decision</span>
                  <p className="font-extrabold text-sm mt-0.5">
                    {selectedTxn.status === "Blocked"
                      ? "TRANSFER BLOCKED (Deterministic Legal Freeze)"
                      : "TRANSFER ELIGIBLE FOR SUB-REGISTRAR EXECUTION"}
                  </p>
                </div>
                <Badge variant={selectedTxn.status === "Blocked" ? "danger" : "success"}>
                  {selectedTxn.status === "Blocked" ? "⚠ Injunction Active" : "✓ Clear Title"}
                </Badge>
              </div>
            </div>

            {/* Action buttons */}
            <div className="pt-2 border-t border-slate-100 flex justify-end gap-2">
              <Button size="sm" variant="secondary" onClick={() => setSelectedTxn(null)}>
                Close
              </Button>
              {selectedTxn.status === "Eligible" && (
                <Button size="sm" onClick={() => handleApproveTxn(selectedTxn.transaction_id)} className="font-bold">
                  Sanction & Commit Ledger Block
                </Button>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
