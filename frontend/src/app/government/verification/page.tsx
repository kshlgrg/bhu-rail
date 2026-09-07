"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { formatDate } from "@/lib/formatters";
import {
  CheckSquare,
  AlertTriangle,
  CheckCircle2,
  FileWarning,
  Eye,
  ArrowRight,
  Database,
  Building2,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";

export interface VerificationRecord {
  record_id: string;
  ulpin: string;
  survey_number: string;
  record_type: string;
  source: string;
  submitted: string;
  status: "Pending" | "Verified" | "Mismatch" | "Requires Review";
  assigned_to: string;
  comparison_fields: {
    field: string;
    source_val: string;
    canonical_val: string;
    match: boolean;
  }[];
}

const INITIAL_QUEUE: VerificationRecord[] = [
  {
    record_id: "VR-2026-0101",
    ulpin: "IN-HR-GGM-KDP-0101-0000",
    survey_number: "101",
    record_type: "Ownership & Jamabandi",
    source: "Haryana Jamabandi Ingestion",
    submitted: "2026-03-04T10:00:00Z",
    status: "Verified",
    assigned_to: "Rajeshwar Sharma (Tehsildar)",
    comparison_fields: [
      { field: "Owner Name", source_val: "Suresh Chandra Yadav", canonical_val: "Suresh Chandra Yadav", match: true },
      { field: "Survey Number", source_val: "101", canonical_val: "101", match: true },
      { field: "Area", source_val: "1,850 m²", canonical_val: "1,850 m²", match: true },
      { field: "Land Use", source_val: "Residential", canonical_val: "Residential", match: true },
      { field: "Encumbrance", source_val: "Clear", canonical_val: "Clear", match: true },
    ],
  },
  {
    record_id: "VR-2026-0102",
    ulpin: "IN-HR-GGM-KDP-0102-0000",
    survey_number: "102",
    record_type: "Cadastral Area & Deed",
    source: "Sub-Registrar Registry",
    submitted: "2026-03-05T09:15:00Z",
    status: "Mismatch",
    assigned_to: "Rajeshwar Sharma (Tehsildar)",
    comparison_fields: [
      { field: "Owner Name", source_val: "Anita Sharma", canonical_val: "Anita Sharma", match: true },
      { field: "Area", source_val: "1,850 m²", canonical_val: "1,820 m²", match: false },
      { field: "Encumbrance", source_val: "Active Mortgage (SBI)", canonical_val: "Active Mortgage (SBI)", match: true },
      { field: "Boundary Geometry", source_val: "Pre-DGPS Legacy Deed", canonical_val: "PostGIS DGPS Polygon", match: false },
    ],
  },
  {
    record_id: "VR-2026-0104",
    ulpin: "IN-HR-GGM-KDP-0104-0000",
    survey_number: "104",
    record_type: "Judicial Restriction",
    source: "SDM Revenue Court",
    submitted: "2026-03-03T14:30:00Z",
    status: "Requires Review",
    assigned_to: "Vikram Malhotra (SDM Officer)",
    comparison_fields: [
      { field: "Owner Name", source_val: "Devendra Singh", canonical_val: "Devendra Singh", match: true },
      { field: "Injunction Status", source_val: "Status Quo Issued", canonical_val: "Transfer Freeze Active", match: true },
      { field: "Disputed Segment", source_val: "Northern Boundary (120 m²)", canonical_val: "Parcel Polygon Unaltered", match: false },
    ],
  },
  {
    record_id: "VR-2026-0108",
    ulpin: "IN-HR-GGM-KDP-0108-0000",
    survey_number: "108",
    record_type: "Subdivision Survey",
    source: "DGPS Field Survey",
    submitted: "2026-03-02T11:00:00Z",
    status: "Pending",
    assigned_to: "Amit Rawat (Head Surveyor)",
    comparison_fields: [
      { field: "Owner Name", source_val: "Gram Panchayat / Kisan Collective", canonical_val: "Gram Panchayat / Kisan Collective", match: true },
      { field: "Parent Area", source_val: "10,000 m²", canonical_val: "10,000 m²", match: true },
      { field: "Split Partition 1", source_val: "4,500 m²", canonical_val: "Pending Verification", match: false },
      { field: "Split Partition 2", source_val: "5,500 m²", canonical_val: "Pending Verification", match: false },
    ],
  },
];

export default function RecordVerificationPage() {
  const [queue, setQueue] = useState<VerificationRecord[]>(INITIAL_QUEUE);
  const [activeRecord, setActiveRecord] = useState<VerificationRecord | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Verified":
        return <Badge variant="success">✓ Verified</Badge>;
      case "Mismatch":
        return <Badge variant="danger">⚠ Discrepancy Detected</Badge>;
      case "Requires Review":
        return <Badge variant="warning">⚠ Requires Review</Badge>;
      default:
        return <Badge variant="info">⏱ Verification Pending</Badge>;
    }
  };

  const handleVerify = (recId: string) => {
    setQueue(queue.map((r) => (r.record_id === recId ? { ...r, status: "Verified" } : r)));
    setActiveRecord(null);
    setToastMessage(`Record ${recId} confirmed MATCH and signed into canonical ledger.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleFlagDiscrepancy = (recId: string) => {
    setQueue(queue.map((r) => (r.record_id === recId ? { ...r, status: "Mismatch" } : r)));
    setActiveRecord(null);
    setToastMessage(`Discrepancy flagged on ${recId}. Surveyor summons generated.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Record Verification"
        subtitle="Reconciliation queue between disparate departmental records (Jamabandi, Sub-Registrar Deeds, Municipal Tax, and DGPS Cadastral Layers)."
        breadcrumbs={[{ label: "Officer Dashboard", href: "/dashboard/government" }, { label: "Record Verification" }]}
        badge={<Badge variant="warning">126 Queue Items</Badge>}
      />

      {toastMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Queue Table */}
      <Card header="Departmental Ingestion & Verification Queue">
        <DataTable
          columns={[
            {
              key: "record_id",
              header: "Record ID",
              render: (r) => (
                <div>
                  <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 text-xs inline-block">{r.record_id}</span>
                  <span className="text-[10px] text-slate-600 block mt-0.5 font-medium">{r.record_type}</span>
                </div>
              ),
            },
            {
              key: "ulpin",
              header: "ULPIN",
              render: (r) => (
                <div>
                  <span className="font-mono font-bold text-emerald-700 text-xs">{r.ulpin}</span>
                  <span className="text-[10px] text-slate-600 block mt-0.5">Plot {r.survey_number}</span>
                </div>
              ),
            },
            {
              key: "source",
              header: "Source Node",
              render: (r) => <span className="font-semibold text-slate-700">{r.source}</span>,
            },
            {
              key: "submitted",
              header: "Submitted",
              render: (r) => <span>{formatDate(r.submitted)}</span>,
            },
            {
              key: "status",
              header: "Status",
              render: (r) => getStatusBadge(r.status),
            },
            {
              key: "assigned_to",
              header: "Assigned To",
              render: (r) => <span className="text-xs text-slate-600 font-medium">{r.assigned_to}</span>,
            },
            {
              key: "actions",
              header: "Action",
              render: (r) => (
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => setActiveRecord(r)}
                  className="py-1 px-3 text-[11px] gap-1 font-bold shadow-sm"
                >
                  <Eye className="w-3 h-3" />
                  <span>Review Record</span>
                </Button>
              ),
            },
          ]}
          data={queue}
          keyExtractor={(r) => r.record_id}
        />
      </Card>

      {/* Verification Workspace Modal */}
      {activeRecord && (
        <Modal
          isOpen={true}
          onClose={() => setActiveRecord(null)}
          title={`Verification Workspace: ${activeRecord.record_id}`}
          description={`Comparing incoming record from ${activeRecord.source} with Bhu-Rail Canonical Data.`}
          maxWidth="2xl"
        >
          <div className="space-y-6">
            {/* Header info */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-slate-500 font-bold block text-[10px] uppercase">ULPIN</span>
                <span className="font-mono font-bold text-slate-900">{activeRecord.ulpin}</span>
              </div>
              <div>
                <span className="text-slate-500 font-bold block text-[10px] uppercase">Survey Plot</span>
                <span className="font-bold text-slate-900">Plot {activeRecord.survey_number}</span>
              </div>
              <div>
                <span className="text-slate-500 font-bold block text-[10px] uppercase">Current Queue Status</span>
                {getStatusBadge(activeRecord.status)}
              </div>
            </div>

            {/* Side-by-side comparison table */}
            <div>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                Field-by-Field Canonical Cross-Check
              </h4>

              <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-[10px] uppercase tracking-wider text-slate-500 font-bold border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3">Attribute Field</th>
                      <th className="px-4 py-3">Source Record Value</th>
                      <th className="px-4 py-3">Canonical Parcel Data</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {activeRecord.comparison_fields.map((f, idx) => (
                      <tr key={idx} className={f.match ? "bg-white" : "bg-rose-50/40"}>
                        <td className="px-4 py-3 font-bold text-slate-900">{f.field}</td>
                        <td className="px-4 py-3 text-slate-700 font-mono">{f.source_val}</td>
                        <td className="px-4 py-3 text-slate-700 font-mono">{f.canonical_val}</td>
                        <td className="px-4 py-3">
                          {f.match ? (
                            <Badge variant="success">✓ Verified Match</Badge>
                          ) : (
                            <Badge variant="danger">⚠ Discrepancy Detected</Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Discrepancy explanation if applicable */}
            {activeRecord.comparison_fields.some((f) => !f.match) && (
              <div className="p-4 rounded-xl border border-amber-300 bg-amber-50 text-xs text-amber-900 space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <AlertTriangle className="w-4 h-4 text-amber-700" />
                  <span>Variance Detected in Statutory Record</span>
                </div>
                <p className="leading-relaxed">
                  Discrepancy detected between the submitted source document and the canonical PostGIS GIS boundary. Re-survey or legal rectification required before finalizing title certificate.
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 border-t border-slate-100 flex flex-wrap justify-end gap-2.5">
              <Button size="sm" variant="secondary" onClick={() => setActiveRecord(null)}>
                Cancel
              </Button>
              <button
                onClick={() => handleFlagDiscrepancy(activeRecord.record_id)}
                className="px-3.5 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm transition-all"
              >
                Flag Discrepancy
              </button>
              <Button
                size="sm"
                onClick={() => handleVerify(activeRecord.record_id)}
                className="font-bold shadow-sm"
              >
                Verify & Approve Match
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
