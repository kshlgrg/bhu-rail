"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { formatDate } from "@/lib/formatters";
import {
  Scale,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Eye,
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  Calendar,
  Layers,
} from "lucide-react";

export interface DisputeItem {
  case_number: string;
  ulpin: string;
  survey_number: string;
  type: string;
  authority: string;
  status: "Active" | "Resolved";
  injunction: boolean;
  priority: "High" | "Normal";
  date_filed: string;
  petitioner: string;
  respondent: string;
  remarks: string;
  doc_title: string;
  next_hearing: string;
}

const DISPUTES_DATA: DisputeItem[] = [
  {
    case_number: "CIV-2025-01821",
    ulpin: "IN-HR-GGM-KDP-0104-0000",
    survey_number: "104",
    type: "Boundary Encroachment & Right of Way",
    authority: "Court of Sub-Divisional Magistrate Sohna",
    status: "Active",
    injunction: true,
    priority: "High",
    date_filed: "2024-03-12T00:00:00Z",
    next_hearing: "2026-04-10",
    petitioner: "Gram Panchayat Kadarpur",
    respondent: "Devendra Singh & Ors.",
    remarks: "Status Quo stay order on northern border strip (120 m²). Registry conveyance locked under rule RULE-JUDICIAL-INJUNCTION-ACTIVE.",
    doc_title: "Certified Interim Injunction Decree (SDM-SHN-2024-771)",
  },
  {
    case_number: "REV-2024-0941",
    ulpin: "IN-HR-GGM-KDP-0102-0000",
    survey_number: "102",
    type: "Co-Sharer Partition Dispute",
    authority: "Revenue Tehsildar Court Gurugram",
    status: "Active",
    injunction: false,
    priority: "Normal",
    date_filed: "2024-08-19T00:00:00Z",
    next_hearing: "2026-03-28",
    petitioner: "Anita Sharma",
    respondent: "Mohan Lal Sharma",
    remarks: "Partition of undivided ancestral share. No freeze order in effect; normal verification mandated.",
    doc_title: "Partition Notice & Jamabandi Khatauni Extract",
  },
  {
    case_number: "CIV-2023-0412",
    ulpin: "IN-HR-GGM-KDP-0101-0000",
    survey_number: "101",
    type: "Mutation Title Challenge",
    authority: "District Civil Judge Senior Division Gurugram",
    status: "Resolved",
    injunction: false,
    priority: "Normal",
    date_filed: "2023-01-15T00:00:00Z",
    next_hearing: "Closed / Dismissed",
    petitioner: "Kishan Chand",
    respondent: "Suresh Chandra Yadav",
    remarks: "Suit dismissed with prejudice on 14-Oct-2023. Clear title decree upheld in favor of Suresh Chandra Yadav.",
    doc_title: "Final Dismissal Decree & Title Declaration Order",
  },
  {
    case_number: "REV-2025-1102",
    ulpin: "IN-HR-GGM-KDP-0108-0000",
    survey_number: "108",
    type: "Agricultural Right-of-Way Passage Claim",
    authority: "Sub-Divisional Magistrate Sohna",
    status: "Active",
    injunction: false,
    priority: "High",
    date_filed: "2025-11-04T00:00:00Z",
    next_hearing: "2026-03-22",
    petitioner: "Adjoining Landholders Collective",
    respondent: "Gram Panchayat / Kisan Trust",
    remarks: "Claim for 4-meter tractor passage across southern parcel edge during subdivision.",
    doc_title: "Passage Demarcation Sketch & Inspection Memo",
  },
];

export default function GovernmentDisputesPage() {
  const [disputes, setDisputes] = useState<DisputeItem[]>(DISPUTES_DATA);
  const [filter, setFilter] = useState("ALL");
  const [selectedDispute, setSelectedDispute] = useState<DisputeItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const filtered = disputes.filter((d) => {
    if (filter === "ALL") return true;
    if (filter === "ACTIVE") return d.status === "Active";
    if (filter === "RESOLVED") return d.status === "Resolved";
    if (filter === "INJUNCTION") return d.injunction;
    if (filter === "HIGH_PRIORITY") return d.priority === "High";
    return true;
  });

  const handleRecordAction = (caseNo: string) => {
    setSelectedDispute(null);
    setToastMessage(`Administrative note & hearing notice logged for case ${caseNo}.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dispute Registry"
        subtitle="Revenue and civil court judicial repository tracking title litigation, injunctions, and transfer stay decrees."
        breadcrumbs={[{ label: "Officer Dashboard", href: "/dashboard/government" }, { label: "Disputes" }]}
        badge={<Badge variant="danger">48 Active Disputes</Badge>}
      />

      {toastMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {[
          { id: "ALL", label: "All Cases" },
          { id: "ACTIVE", label: "Active" },
          { id: "RESOLVED", label: "Resolved" },
          { id: "INJUNCTION", label: "Injunction Active" },
          { id: "HIGH_PRIORITY", label: "High Priority" },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors border ${
              filter === f.id
                ? "bg-blue-50 text-blue-900 border-blue-300 font-bold shadow-2xs"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Disputes Table */}
      <Card header="Litigation & Stay Order Registry">
        <DataTable
          columns={[
            {
              key: "case_number",
              header: "Case Number",
              render: (d) => (
                <div>
                  <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 text-xs inline-block">{d.case_number}</span>
                  <span className="text-[10px] text-slate-600 truncate max-w-[180px] block mt-0.5 font-medium">{d.authority}</span>
                </div>
              ),
            },
            {
              key: "ulpin",
              header: "ULPIN",
              render: (d) => (
                <div>
                  <span className="font-mono font-bold text-emerald-700 text-xs">{d.ulpin}</span>
                  <span className="text-[10px] text-slate-500 block">Plot {d.survey_number}</span>
                </div>
              ),
            },
            {
              key: "type",
              header: "Type",
              render: (d) => <span className="font-semibold text-slate-800">{d.type}</span>,
            },
            {
              key: "authority",
              header: "Authority",
              render: (d) => <span className="text-slate-600">{d.authority}</span>,
            },
            {
              key: "status",
              header: "Status",
              render: (d) => (
                <Badge variant={d.status === "Active" ? "danger" : "success"}>
                  {d.status === "Active" ? "⚠ Active Litigation" : "✓ Resolved"}
                </Badge>
              ),
            },
            {
              key: "injunction",
              header: "Injunction",
              render: (d) => (
                <Badge variant={d.injunction ? "danger" : "success"}>
                  {d.injunction ? "⚠ Injunction Active" : "✓ No Active Injunction"}
                </Badge>
              ),
            },
            {
              key: "priority",
              header: "Priority",
              render: (d) => (
                <Badge variant={d.priority === "High" ? "danger" : "info"}>
                  {d.priority}
                </Badge>
              ),
            },
            {
              key: "date_filed",
              header: "Date",
              render: (d) => <span>{formatDate(d.date_filed)}</span>,
            },
            {
              key: "actions",
              header: "Action",
              render: (d) => (
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => setSelectedDispute(d)}
                  className="py-1 px-3 text-[11px] gap-1 font-bold shadow-sm"
                >
                  <Eye className="w-3 h-3" />
                  <span>Review Case</span>
                </Button>
              ),
            },
          ]}
          data={filtered}
          keyExtractor={(d) => d.case_number}
          emptyMessage="No dispute records found for the selected filter."
        />
      </Card>

      {/* Case Detail Modal */}
      {selectedDispute && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedDispute(null)}
          title={`Judicial Case File: ${selectedDispute.case_number}`}
          description={selectedDispute.authority}
          maxWidth="xl"
        >
          <div className="space-y-4 text-xs">
            {/* Summary Grid */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div>
                <span className="text-slate-500 font-bold block text-[10px] uppercase">ULPIN Target</span>
                <span className="font-mono font-bold text-slate-900">{selectedDispute.ulpin}</span>
                <span className="text-[10px] text-slate-500 block">Plot {selectedDispute.survey_number}</span>
              </div>
              <div>
                <span className="text-slate-500 font-bold block text-[10px] uppercase">Litigation Status</span>
                <Badge variant={selectedDispute.status === "Active" ? "danger" : "success"}>
                  {selectedDispute.status === "Active" ? "⚠ Active Litigation" : "✓ Resolved"}
                </Badge>
              </div>
              <div>
                <span className="text-slate-500 font-bold block text-[10px] uppercase">Injunction Freeze</span>
                <Badge variant={selectedDispute.injunction ? "danger" : "success"}>
                  {selectedDispute.injunction ? "⚠ Injunction Active" : "✓ No Active Injunction"}
                </Badge>
              </div>
            </div>

            {/* Parties */}
            <div className="p-4 rounded-xl bg-white border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="text-slate-500 font-bold block text-[10px] uppercase">Petitioner</span>
                <span className="font-bold text-slate-900 text-sm">{selectedDispute.petitioner}</span>
              </div>
              <div>
                <span className="text-slate-500 font-bold block text-[10px] uppercase">Respondent</span>
                <span className="font-bold text-slate-900 text-sm">{selectedDispute.respondent}</span>
              </div>
            </div>

            {/* Injunction Details */}
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 space-y-1 text-rose-900">
              <span className="font-bold block text-[10px] uppercase">Stay Order & Judicial Restrictions</span>
              <p className="leading-relaxed">{selectedDispute.remarks}</p>
            </div>

            {/* Related Documents & Timeline */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <span className="text-slate-500 font-bold block text-[10px] uppercase">Case Documents & Timeline</span>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span className="font-semibold text-slate-800">{selectedDispute.doc_title}</span>
                </div>
                <button
                  onClick={() => alert(`Opening judicial decree copy for ${selectedDispute.case_number}`)}
                  className="text-blue-700 hover:text-blue-800 font-bold text-xs"
                >
                  View Document &rarr;
                </button>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between text-[11px] text-slate-500">
                <span>Filed: {formatDate(selectedDispute.date_filed)}</span>
                <span className="font-bold text-slate-700">Next Hearing: {selectedDispute.next_hearing}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-100 flex flex-wrap justify-between gap-2">
              <div className="flex gap-2">
                <Link href={`/parcel/${selectedDispute.ulpin}`}>
                  <Button size="sm" variant="secondary" className="gap-1 font-semibold">
                    <Layers className="w-3.5 h-3.5 text-blue-600" />
                    <span>View Parcel</span>
                  </Button>
                </Link>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => alert("Viewing verified case document archive.")}
                  className="gap-1 font-semibold"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>View Documents</span>
                </Button>
              </div>

              <div className="flex gap-2">
                <Button size="sm" variant="ghost" onClick={() => setSelectedDispute(null)}>
                  Close
                </Button>
                <Button
                  size="sm"
                  onClick={() => handleRecordAction(selectedDispute.case_number)}
                  className="font-bold shadow-sm"
                >
                  Record Action
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
