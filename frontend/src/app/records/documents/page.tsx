"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { MOCK_DOCUMENTS } from "@/data/documents";
import { DocumentRecord } from "@/types/records";
import { formatDate } from "@/lib/formatters";
import {
  FolderOpen,
  Eye,
  ShieldCheck,
  Download,
  FileText,
  Filter,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

export default function DocumentsPage() {
  const [selectedDoc, setSelectedDoc] = useState<DocumentRecord | null>(null);
  const [verifyResult, setVerifyResult] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  const filteredDocs = MOCK_DOCUMENTS.filter((d) => {
    if (categoryFilter === "ALL") return true;
    return d.category === categoryFilter;
  });

  const handleVerify = (doc: DocumentRecord) => {
    setSelectedDoc(doc);
    setVerifyResult("PASS");
  };

  const handleView = (doc: DocumentRecord) => {
    setSelectedDoc(doc);
    setVerifyResult(null);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Verifiable Digital Public Document Repository"
        subtitle="Cryptographically sealed statutory land records, Jamabandi nakals, registry sale deeds, municipal permissions, and survey field books."
        breadcrumbs={[
          { label: "Records", href: "/records/ror" },
          { label: "Documents" },
        ]}
        badge={<Badge variant="success">W3C DID / SHA-256</Badge>}
      />

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {["ALL", "RoR", "DEED", "MORTGAGE", "SURVEY", "DISPUTE", "TAX", "BUILDING_PERMIT"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-colors ${
              categoryFilter === cat
                ? "bg-emerald-50 text-emerald-900 border border-emerald-300 font-bold shadow-2xs"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            {cat.replace("_", " ")}
          </button>
        ))}
      </div>

      <Card header="Sealed Cadastral Documents">
        <DataTable
          columns={[
            {
              key: "name",
              header: "Document Name",
              render: (d) => (
                <div className="max-w-xs">
                  <span className="font-bold text-slate-900 block">{d.name}</span>
                  <span className="text-[10px] font-mono font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200 mt-0.5 inline-block">{d.document_id}</span>
                </div>
              ),
            },
            {
              key: "category",
              header: "Category",
              render: (d) => <Badge variant="info">{d.category}</Badge>,
            },
            {
              key: "ulpin",
              header: "Parcel",
              render: (d) => <span className="font-mono text-emerald-700 font-medium">{d.ulpin}</span>,
            },
            {
              key: "issued_by",
              header: "Issuing Node",
              render: (d) => <span className="text-slate-600">{d.issued_by}</span>,
            },
            {
              key: "issued_date",
              header: "Issue Date",
              render: (d) => <span>{formatDate(d.issued_date)}</span>,
            },
            {
              key: "verification",
              header: "Integrity",
              render: (d) => (
                <div className="flex items-center gap-1 text-emerald-700 text-[11px] font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified</span>
                </div>
              ),
            },
            {
              key: "actions",
              header: "Actions",
              render: (d) => (
                <div className="flex items-center gap-1.5">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleView(d)}
                    className="py-1 px-2 text-[11px] gap-1"
                  >
                    <Eye className="w-3 h-3" />
                    <span>View</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleVerify(d)}
                    className="py-1 px-2 text-[11px] gap-1 text-emerald-700 hover:text-emerald-800"
                  >
                    <ShieldCheck className="w-3 h-3" />
                    <span>Verify</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => alert(`Downloading formal PDF artifact for ${d.name} (${d.file_size})...`)}
                    className="py-1 px-1.5 text-[11px] text-slate-500 hover:text-slate-800"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ),
            },
          ]}
          data={filteredDocs}
          keyExtractor={(d) => d.document_id}
        />
      </Card>

      {/* Document View / Verify Modal */}
      {selectedDoc && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedDoc(null)}
          title={selectedDoc.name}
          description={`Issued by ${selectedDoc.issued_by} • Verified SHA-256`}
          maxWidth="lg"
        >
          <div className="space-y-4 text-xs">
            {verifyResult && (
              <div className="p-3 rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>
                  <strong>Cryptographic Proof Valid:</strong> Byte payload matches registered ledger root fingerprint. Zero tampering detected.
                </span>
              </div>
            )}

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Document ID:</span>
                <span className="font-mono text-slate-900 font-bold">{selectedDoc.document_id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Associated ULPIN:</span>
                <span className="font-mono text-emerald-700 font-semibold">{selectedDoc.ulpin}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Category:</span>
                <Badge variant="info">{selectedDoc.category}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Format & Size:</span>
                <span className="text-slate-800 font-medium">{selectedDoc.format} ({selectedDoc.file_size})</span>
              </div>
              <div className="pt-2 border-t border-slate-200">
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">Cryptographic Hash (SHA-256)</span>
                <span className="font-mono text-emerald-700 text-[11px] break-all block mt-0.5">
                  {selectedDoc.doc_hash}
                </span>
              </div>
            </div>

            <div className="p-8 rounded-xl border border-dashed border-slate-200 bg-slate-50 text-center space-y-2">
              <FileText className="w-10 h-10 text-emerald-600 mx-auto" />
              <h4 className="font-semibold text-slate-900 text-sm">Authenticated Government Document Preview</h4>
              <p className="text-slate-600 text-xs max-w-sm mx-auto">
                Electronic copy certified with institutional PKI signature from {selectedDoc.issued_by}.
              </p>
            </div>

            <div className="pt-2 flex justify-between items-center">
              <Link href={`/parcel/${selectedDoc.ulpin}`}>
                <Button size="sm" variant="outline" className="gap-1 text-xs">
                  <span>Go to Parcel 360°</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Button>
              </Link>
              <Button
                size="sm"
                variant="primary"
                onClick={() => alert(`Downloading verified copy of ${selectedDoc.name}...`)}
                className="gap-1.5 text-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Certified Copy</span>
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
