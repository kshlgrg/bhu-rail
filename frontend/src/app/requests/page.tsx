"use client";

import React, { useState } from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { DataTable } from "@/components/ui/DataTable";
import { CitizenRequest } from "@/types/services";
import { formatDate } from "@/lib/formatters";
import {
  SendHorizontal,
  Plus,
  CheckCircle2,
  Clock,
  SlidersHorizontal,
  ShieldCheck,
  AlertCircle,
  Eye,
} from "lucide-react";

export default function RequestsPage() {
  const [requests, setRequests] = useState<CitizenRequest[]>([
    {
      id: "REQ-2024-0041",
      reference_number: "GRV-HR-GGM-0041",
      category: "OWNERSHIP_VERIFICATION",
      title: "Title certification confirmation for SBI loan clearance",
      ulpin: "IN-HR-GGM-KDP-0101-0000",
      description: "Requesting authenticated Jamabandi extract for submission to lending institution.",
      priority: "HIGH",
      status: "RESOLVED",
      created_at: "2024-04-05T09:30:00Z",
      assigned_officer: "Naib Tehsildar Sohna",
    },
    {
      id: "REQ-2024-0038",
      reference_number: "GRV-HR-GGM-0038",
      category: "RECORD_CORRECTION",
      title: "Name spelling correction in Father's Name column",
      ulpin: "IN-HR-GGM-KDP-0101-0000",
      description: "Correction of Father's name from 'Suresh C. Yadav' to 'Suresh Chandra Yadav' as per Aadhaar e-KYC.",
      priority: "MEDIUM",
      status: "IN_PROGRESS",
      created_at: "2024-03-29T14:15:00Z",
      assigned_officer: "Halqa Patwari Kadarpur",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  // Form State
  const [category, setCategory] = useState("OWNERSHIP_VERIFICATION");
  const [ulpin, setUlpin] = useState("IN-HR-GGM-KDP-0101-0000");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"LOW" | "MEDIUM" | "HIGH">("MEDIUM");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      alert("Please fill in the title and description.");
      return;
    }

    const refNo = `GRV-HR-GGM-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReq: CitizenRequest = {
      id: `REQ-2024-${Math.floor(100 + Math.random() * 900)}`,
      reference_number: refNo,
      category: category as any,
      title,
      ulpin,
      description,
      priority,
      status: "OPEN",
      created_at: new Date().toISOString(),
      assigned_officer: "Intake Officer Sohna",
    };

    setRequests([newReq, ...requests]);
    setSubmittedRef(refNo);
    setIsModalOpen(false);

    // Reset Form
    setTitle("");
    setDescription("");
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Citizen Service Requests & Grievances"
        subtitle="Submit requests for title verification, record corrections, mutation, or resurvey with guaranteed tracking and departmental response timelines."
        breadcrumbs={[{ label: "Requests" }]}
        actions={
          <Button
            size="sm"
            variant="primary"
            onClick={() => setIsModalOpen(true)}
            className="gap-1.5 text-xs shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>New Request</span>
          </Button>
        }
      />

      {/* Submission Success Alert */}
      {submittedRef && (
        <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-950 flex items-center justify-between shadow-sm animate-in fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <div>
              <p className="text-xs font-bold text-emerald-950">
                Request Registered Successfully: Reference #{submittedRef}
              </p>
              <p className="text-[11px] text-emerald-800 mt-0.5">
                Your request has been routed to the Tehsildar & Halqa Patwari Kadarpur. Status updates will notify you in real-time.
              </p>
            </div>
          </div>
          <Button size="sm" variant="ghost" onClick={() => setSubmittedRef(null)} className="text-xs text-slate-600 hover:text-slate-900">
            Dismiss
          </Button>
        </div>
      )}

      {/* Requests Table */}
      <Card header="Active Citizen Requests">
        <DataTable
          columns={[
            {
              key: "reference_number",
              header: "Reference No",
              render: (r) => (
                <span className="font-mono font-bold text-slate-900 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200/90 text-xs inline-block whitespace-nowrap shadow-2xs">
                  {r.reference_number}
                </span>
              ),
            },
            {
              key: "category",
              header: "Category",
              render: (r) => <Badge variant="info">{r.category.replace("_", " ")}</Badge>,
            },
            {
              key: "title",
              header: "Subject & Description",
              render: (r) => (
                <div className="max-w-md">
                  <span className="font-bold text-slate-900 block text-xs">{r.title}</span>
                  <span className="text-[11px] text-slate-600 truncate block mt-0.5">{r.description}</span>
                </div>
              ),
            },
            {
              key: "priority",
              header: "Priority",
              render: (r) => (
                <Badge variant={r.priority === "HIGH" ? "danger" : r.priority === "MEDIUM" ? "warning" : "neutral"} dot={true}>
                  {r.priority}
                </Badge>
              ),
            },
            {
              key: "status",
              header: "Status",
              render: (r) => (
                <Badge variant={r.status === "RESOLVED" ? "success" : r.status === "IN_PROGRESS" ? "info" : "warning"} dot={true}>
                  {r.status.replace("_", " ")}
                </Badge>
              ),
            },
            {
              key: "created_at",
              header: "Filed On",
              render: (r) => <span className="font-medium text-slate-700 text-xs">{formatDate(r.created_at)}</span>,
            },
            {
              key: "actions",
              header: "Action",
              render: (r) => (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => alert(`Request Reference: ${r.reference_number}\nAssigned to: ${r.assigned_officer}\nStatus: ${r.status}\n\nDescription: ${r.description}`)}
                  className="py-1 px-2.5 text-[11px] gap-1"
                >
                  <Eye className="w-3 h-3" />
                  <span>Details</span>
                </Button>
              ),
            },
          ]}
          data={requests}
          keyExtractor={(r) => r.id}
          emptyMessage="No service requests registered."
        />
      </Card>

      {/* New Request Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Submit New Citizen Service Request"
        description="Select category, link your parcel, and enter details for revenue administration intake."
        maxWidth="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <Select
            label="Service Request Category"
            options={[
              { label: "Ownership Verification", value: "OWNERSHIP_VERIFICATION" },
              { label: "Record of Rights (RoR) Correction", value: "RECORD_CORRECTION" },
              { label: "Certified Document Copy Request", value: "DOCUMENT_REQUEST" },
              { label: "Mutation Ingestion Request", value: "MUTATION_REQUEST" },
              { label: "Cadastral Boundary Resurvey Request", value: "SURVEY_REQUEST" },
            ]}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />

          <Select
            label="Target Land Parcel"
            options={[
              { label: "Plot 101 — IN-HR-GGM-KDP-0101-0000 (Kadarpur)", value: "IN-HR-GGM-KDP-0101-0000" },
              { label: "Plot 102 — IN-HR-GGM-KDP-0102-0000 (Kadarpur)", value: "IN-HR-GGM-KDP-0102-0000" },
              { label: "Plot 103 — IN-HR-GGM-KDP-0103-0000 (Kadarpur)", value: "IN-HR-GGM-KDP-0103-0000" },
            ]}
            value={ulpin}
            onChange={(e) => setUlpin(e.target.value)}
          />

          <Input
            label="Subject / Short Title"
            placeholder="e.g. Discrepancy in recorded boundary setback or spelling"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700">Detailed Description & Reference</label>
            <textarea
              rows={4}
              placeholder="Provide exact details of the request, deed references, or reason for correction..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-2xs transition-all"
            />
          </div>

          <Select
            label="Priority Level"
            options={[
              { label: "Medium (Standard 7-Day SLA)", value: "MEDIUM" },
              { label: "High (Urgent Loan/Registry Clearance)", value: "HIGH" },
              { label: "Low (General Enquiry)", value: "LOW" },
            ]}
            value={priority}
            onChange={(e) => setPriority(e.target.value as any)}
          />

          <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="gap-1.5">
              <SendHorizontal className="w-3.5 h-3.5" />
              <span>Submit Request</span>
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
