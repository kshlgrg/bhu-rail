"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { MOCK_APPLICATIONS } from "@/data/applications";
import { formatDate } from "@/lib/formatters";
import {
  ClipboardList,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Eye,
  ArrowRight,
  User,
  ShieldCheck,
  Send,
} from "lucide-react";

export default function GovernmentApplicationsPage() {
  const [apps, setApps] = useState(MOCK_APPLICATIONS);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedApp, setSelectedApp] = useState<any | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [requestInfoText, setRequestInfoText] = useState("");
  const [showRequestInfoInput, setShowRequestInfoInput] = useState(false);

  const filtered = apps.filter((a) => {
    if (statusFilter === "ALL") return true;
    if (statusFilter === "PENDING") return a.status === "SUBMITTED";
    if (statusFilter === "UNDER_REVIEW") return a.status === "UNDER_REVIEW";
    if (statusFilter === "APPROVED") return a.status === "APPROVED" || a.status === "COMPLETED";
    if (statusFilter === "REJECTED") return a.status === "REJECTED";
    return true;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "COMPLETED":
      case "APPROVED":
        return <Badge variant="success">✓ Approved</Badge>;
      case "UNDER_REVIEW":
        return <Badge variant="warning">⏱ Under Review</Badge>;
      case "REJECTED":
        return <Badge variant="danger">✗ Rejected</Badge>;
      default:
        return <Badge variant="info">⏱ Pending Intake</Badge>;
    }
  };

  const handleApprove = (appId: string) => {
    setApps(apps.map((a) => (a.id === appId ? { ...a, status: "APPROVED" } : a)));
    setSelectedApp(null);
    setToastMessage(`Application ${appId} APPROVED. Land record mutation sanctioned.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleReject = (appId: string) => {
    setApps(apps.map((a) => (a.id === appId ? { ...a, status: "REJECTED" } : a)));
    setSelectedApp(null);
    setToastMessage(`Application ${appId} REJECTED. Notice issued to applicant.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSendInfoRequest = (appId: string) => {
    setSelectedApp(null);
    setShowRequestInfoInput(false);
    setRequestInfoText("");
    setToastMessage(`Information request dispatched to applicant for ${appId}.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Citizen Applications Console"
        subtitle="Operational inbox for revenue officers: review, sanction, request information, or reject citizen land service applications."
        breadcrumbs={[{ label: "Officer Dashboard", href: "/dashboard/government" }, { label: "Applications" }]}
        badge={<Badge variant="info">348 Total Applications</Badge>}
      />

      {toastMessage && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {["ALL", "PENDING", "UNDER_REVIEW", "APPROVED", "REJECTED"].map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors border ${
              statusFilter === st
                ? "bg-blue-50 text-blue-900 border-blue-300 font-bold shadow-2xs"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
            }`}
          >
            {st === "ALL" ? "All Applications" : st.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Applications Table */}
      <Card header="Citizen Service Intake Registry">
        <DataTable
          columns={[
            {
              key: "application_number",
              header: "Application ID",
              render: (a) => (
                <div>
                  <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 text-xs inline-block">{a.application_number}</span>
                  <span className="text-[10px] text-slate-600 block mt-0.5 font-medium">{a.department}</span>
                </div>
              ),
            },
            {
              key: "applicant_name",
              header: "Citizen",
              render: (a) => (
                <div>
                  <span className="font-bold text-slate-800 block">{a.applicant_name}</span>
                  <span className="text-[10px] font-mono text-slate-500">{(a as any).applicant_identity_hash || "aadhaar-sha256-verified"}</span>
                </div>
              ),
            },
            {
              key: "service_name",
              header: "Service",
              render: (a) => <span className="font-bold text-slate-700">{a.service_name}</span>,
            },
            {
              key: "ulpin",
              header: "ULPIN",
              render: (a) => (
                <div>
                  <span className="font-mono font-bold text-emerald-700 text-xs">{a.ulpin}</span>
                  <span className="text-[10px] text-slate-500 block">Plot {a.survey_number} ({a.village})</span>
                </div>
              ),
            },
            {
              key: "submitted_date",
              header: "Date",
              render: (a) => <span>{formatDate(a.submitted_date)}</span>,
            },
            {
              key: "status",
              header: "Status",
              render: (a) => getStatusBadge(a.status),
            },
            {
              key: "assigned_officer",
              header: "Assigned Officer",
              render: () => <span className="text-xs text-slate-600 font-medium">Rajeshwar Sharma (Tehsildar)</span>,
            },
            {
              key: "actions",
              header: "Action",
              render: (a) => (
                <Button
                  size="sm"
                  variant="primary"
                  onClick={() => {
                    setSelectedApp(a);
                    setShowRequestInfoInput(false);
                  }}
                  className="py-1 px-3 text-[11px] gap-1 font-bold shadow-sm"
                >
                  <Eye className="w-3 h-3" />
                  <span>Review</span>
                </Button>
              ),
            },
          ]}
          data={filtered}
          keyExtractor={(a) => a.id}
          emptyMessage="No applications match the selected status."
        />
      </Card>

      {/* Review & Action Modal */}
      {selectedApp && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedApp(null)}
          title={`Review Application: ${selectedApp.application_number}`}
          description={`Submitted by ${selectedApp.applicant_name} for ${selectedApp.service_name}`}
        >
          <div className="space-y-4 text-xs">
            {/* Metadata Summary */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-2 gap-3">
              <div>
                <span className="text-slate-500 font-bold block text-[10px] uppercase">Applicant</span>
                <span className="font-bold text-slate-900 text-sm">{selectedApp.applicant_name}</span>
                <span className="text-[10px] font-mono text-slate-500 block">{(selectedApp as any).applicant_identity_hash || "aadhaar-sha256-verified"}</span>
              </div>
              <div>
                <span className="text-slate-500 font-bold block text-[10px] uppercase">Service Type</span>
                <span className="font-bold text-emerald-700 text-sm">{selectedApp.service_name}</span>
                <span className="text-[10px] text-slate-500 block">{selectedApp.department}</span>
              </div>
              <div>
                <span className="text-slate-500 font-bold block text-[10px] uppercase">Target Parcel</span>
                <span className="font-mono font-bold text-slate-900">{selectedApp.ulpin}</span>
                <span className="text-[10px] text-slate-500 block">Plot {selectedApp.survey_number} • {selectedApp.village}</span>
              </div>
              <div>
                <span className="text-slate-500 font-bold block text-[10px] uppercase">Current Status</span>
                {getStatusBadge(selectedApp.status)}
              </div>
            </div>

            {/* Applicant Remarks */}
            <div className="p-3 rounded-xl bg-white border border-slate-200">
              <span className="text-slate-500 font-bold block text-[10px] uppercase">Applicant Remarks</span>
              <p className="text-slate-700 mt-1 leading-relaxed">{selectedApp.remarks}</p>
            </div>

            {/* Optional Request Information text area */}
            {showRequestInfoInput && (
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 space-y-2 animate-in fade-in">
                <label className="text-xs font-bold text-blue-900 block">
                  Specify Required Information / Missing Document
                </label>
                <textarea
                  rows={3}
                  value={requestInfoText}
                  onChange={(e) => setRequestInfoText(e.target.value)}
                  placeholder="e.g. Please provide registered deed copy or clarify co-sharer consent..."
                  className="w-full rounded-lg border border-blue-300 p-2.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex justify-end gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowRequestInfoInput(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleSendInfoRequest(selectedApp.id)}
                    className="gap-1 font-bold"
                  >
                    <Send className="w-3 h-3" />
                    <span>Send Request to Citizen</span>
                  </Button>
                </div>
              </div>
            )}

            {/* Operational Action Buttons */}
            <div className="pt-3 border-t border-slate-100 flex flex-wrap justify-between gap-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={() => setShowRequestInfoInput(!showRequestInfoInput)}
                className="gap-1.5 font-semibold text-blue-700 border-blue-200 hover:bg-blue-50"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Request Information</span>
              </Button>

              <div className="flex gap-2">
                <button
                  onClick={() => handleReject(selectedApp.id)}
                  className="px-3.5 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm transition-all"
                >
                  Reject Application
                </button>
                <Button
                  size="sm"
                  onClick={() => handleApprove(selectedApp.id)}
                  className="font-bold shadow-sm"
                >
                  Approve Application
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
