"use client";

import React, { useState } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { PageHeader } from "@/components/layout/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { MOCK_DOCUMENTS } from "@/data/documents";
import { formatDate } from "@/lib/formatters";
import {
  FolderOpen,
  Eye,
  ShieldCheck,
  Download,
  CheckCircle2,
  FileText,
} from "lucide-react";

function CitizenDocumentsContent() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [activeDocPreview, setActiveDocPreview] = useState<any | null>(null);
  const [verificationFeedback, setVerificationFeedback] = useState<string | null>(null);

  const categories = [
    { id: "ALL", label: "All Documents" },
    { id: "RoR", label: "RoR (Jamabandi)" },
    { id: "DEED", label: "Registration Deeds" },
    { id: "MORTGAGE", label: "Mortgage Charges" },
    { id: "SURVEY", label: "Survey & Spatial" },
    { id: "TAX", label: "Property Tax" },
    { id: "DISPUTE", label: "Dispute & Court" },
    { id: "BUILDING_PERMIT", label: "Building Permission" },
  ];

  const filteredDocs = MOCK_DOCUMENTS.filter((doc) => {
    if (selectedCategory === "ALL") return true;
    return doc.category === selectedCategory;
  });

  const handleVerify = (doc: any) => {
    setVerificationFeedback(
      `SHA-256 Digest: ${doc.doc_hash}\nResult: 100% VALID. Cryptographic signature matches Haryana State Registry Block.`
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Documents"
        subtitle="Certified statutory land records, conveyance deeds, municipal clearances, and tax receipts."
        breadcrumbs={[{ label: "Citizen Dashboard", href: "/citizen/dashboard" }, { label: "My Documents" }]}
        badge={<Badge variant="success">{MOCK_DOCUMENTS.length} Digital Originals</Badge>}
      />

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors border ${
              selectedCategory === cat.id
                ? "bg-emerald-50 text-emerald-900 border-emerald-300 font-bold shadow-2xs"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Verification Feedback Banner */}
      {verificationFeedback && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-start justify-between gap-3 animate-in fade-in">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
            <pre className="font-mono text-[11px] whitespace-pre-wrap">{verificationFeedback}</pre>
          </div>
          <button
            onClick={() => setVerificationFeedback(null)}
            className="text-emerald-700 hover:text-emerald-900 font-bold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Documents Table */}
      <Card header="Verified Digital Document Locker">
        <DataTable
          columns={[
            {
              key: "name",
              header: "Document",
              render: (d) => (
                <div>
                  <span className="font-bold text-slate-900 block">{d.name}</span>
                  <span className="text-[10px] font-mono font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 mt-0.5 inline-block">{d.document_id}</span>
                </div>
              ),
            },
            {
              key: "category",
              header: "Type",
              render: (d) => (
                <Badge
                  variant={
                    d.category === "RoR" || d.category === "DEED"
                      ? "success"
                      : d.category === "DISPUTE"
                      ? "danger"
                      : d.category === "MORTGAGE"
                      ? "warning"
                      : "info"
                  }
                >
                  {d.category}
                </Badge>
              ),
            },
            {
              key: "ulpin",
              header: "Parcel",
              render: (d) => (
                <div>
                  <span className="font-bold text-slate-700 block">Kadarpur Pilot</span>
                  <span className="font-mono text-[10px] text-emerald-700">{d.ulpin}</span>
                </div>
              ),
            },
            {
              key: "issued_date",
              header: "Date",
              render: (d) => <span>{formatDate(d.issued_date)}</span>,
            },
            {
              key: "verification",
              header: "Verification",
              render: () => (
                <div className="flex items-center gap-1 text-emerald-700 font-semibold text-xs">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Tamper Proof</span>
                </div>
              ),
            },
            {
              key: "actions",
              header: "Action",
              render: (d) => (
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => setActiveDocPreview(d)}
                    className="py-1 px-2.5 text-[11px] gap-1 font-semibold"
                  >
                    <Eye className="w-3 h-3 text-slate-400" />
                    <span>View</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleVerify(d)}
                    className="py-1 px-2.5 text-[11px] gap-1 font-semibold text-emerald-700 border-emerald-300 hover:bg-emerald-50"
                  >
                    <ShieldCheck className="w-3 h-3" />
                    <span>Verify</span>
                  </Button>
                </div>
              ),
            },
          ]}
          data={filteredDocs}
          keyExtractor={(d) => d.document_id}
          emptyMessage="No documents found in this category."
        />
      </Card>

      {/* Document Preview Modal */}
      {activeDocPreview && (
        <Modal
          isOpen={true}
          onClose={() => setActiveDocPreview(null)}
          title={activeDocPreview.name}
          description={`Certified Digital Document • ${activeDocPreview.document_id}`}
        >
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-500 font-bold block text-[10px] uppercase">Issuing Node</span>
                <span className="font-semibold text-slate-800">{activeDocPreview.issued_by}</span>
              </div>
              <div>
                <span className="text-slate-500 font-bold block text-[10px] uppercase">Issued Date</span>
                <span className="font-semibold text-slate-800">{formatDate(activeDocPreview.issued_date)}</span>
              </div>
              <div>
                <span className="text-slate-500 font-bold block text-[10px] uppercase">Format & File Size</span>
                <span className="font-semibold text-slate-800">{activeDocPreview.format} ({activeDocPreview.file_size})</span>
              </div>
              <div>
                <span className="text-slate-500 font-bold block text-[10px] uppercase">Connected ULPIN</span>
                <span className="font-mono text-emerald-700 font-bold">{activeDocPreview.ulpin}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
              <span className="text-emerald-800 font-bold block text-[10px] uppercase">Cryptographic Document Digest</span>
              <span className="font-mono text-[10px] text-emerald-900 break-all block mt-1">
                {activeDocPreview.doc_hash}
              </span>
            </div>

            {/* Mock Visual Document Page Preview */}
            <div className="border border-slate-200 rounded-xl p-6 bg-white shadow-inner space-y-3 text-center">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <FileText className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-sm text-slate-900">GOVERNMENT OF HARYANA</h4>
              <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
                Certified Digital Extract under National Land Digital Public Infrastructure (Bhu-Rail). Digitally signed by competent revenue authority.
              </p>
              <div className="pt-2 text-[10px] font-mono text-slate-400">
                Seal Hash Verified • Timestamped at Ledger Block 01
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button size="sm" variant="secondary" onClick={() => setActiveDocPreview(null)}>
                Close
              </Button>
              <Button
                size="sm"
                onClick={() => alert(`Downloading signed certified PDF copy for ${activeDocPreview.document_id}`)}
                className="gap-1.5 font-bold bg-emerald-700 hover:bg-emerald-800 text-white"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Certified PDF</span>
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default function CitizenDocumentsPage() {
  return (
    <ProtectedRoute allowedRoles={["citizen", "admin"]}>
      <CitizenDocumentsContent />
    </ProtectedRoute>
  );
}
