"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { DataTable } from "@/components/ui/DataTable";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { MOCK_APPLICATIONS } from "@/data/applications";
import { MOCK_PARCELS } from "@/data/parcels";
import { formatDate } from "@/lib/formatters";
import {
  FileText,
  ArrowRight,
  Plus,
  CheckCircle2,
  Clock,
  Building2,
  FileCheck,
  Search,
  Check,
} from "lucide-react";

export default function ApplicationsPage() {
  const [applications, setApplications] = useState(MOCK_APPLICATIONS);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Application Wizard state
  const [step, setStep] = useState(1);
  const [service, setService] = useState("Ownership Verification");
  const [selectedParcel, setSelectedParcel] = useState("IN-HR-GGM-KDP-0101-0000");
  const [applicantRemarks, setApplicantRemarks] = useState("");
  const [submittedApp, setSubmittedApp] = useState<any | null>(null);

  const availableServices = [
    "Ownership Verification",
    "Document Request",
    "Record Correction",
    "Mutation Request",
    "Survey Request",
  ];

  const citizenParcels = MOCK_PARCELS.filter((p) =>
    ["IN-HR-GGM-KDP-0101-0000", "IN-HR-GGM-KDP-0103-0000", "IN-HR-GGM-KDP-0108-0000"].includes(p.ulpin)
  );

  const filteredApps = applications.filter((app) => {
    if (statusFilter === "ALL") return true;
    return app.status === statusFilter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return <Badge variant="success">✓ Completed</Badge>;
      case "APPROVED":
        return <Badge variant="success">✓ Approved</Badge>;
      case "UNDER_REVIEW":
        return <Badge variant="warning">⏱ Under Review</Badge>;
      case "SUBMITTED":
        return <Badge variant="info">⏱ Submitted</Badge>;
      case "REJECTED":
        return <Badge variant="danger">✗ Rejected</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };

  const handleOpenWizard = () => {
    setStep(1);
    setSubmittedApp(null);
    setApplicantRemarks("");
    setIsModalOpen(true);
  };

  const handleSubmitApplication = () => {
    const newId = `APP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const parcelObj = citizenParcels.find((p) => p.ulpin === selectedParcel);

    const newAppRecord = {
      id: newId,
      application_number: newId,
      service_name: service,
      service_type: "TITLE_VERIFICATION" as const,
      ulpin: selectedParcel,
      survey_number: parcelObj?.survey_number || "101",
      village: "Kadarpur",
      applicant_name: "Suresh Chandra Yadav",
      department: "Revenue & Land Records",
      submitted_date: new Date().toISOString(),
      status: "SUBMITTED" as const,
      last_updated: new Date().toISOString(),
      remarks: applicantRemarks || "Application submitted via Citizen Portal.",
      timeline: [
        {
          status: "SUBMITTED",
          date: new Date().toISOString(),
          actor: "Suresh Chandra Yadav (Citizen)",
          note: "Application submitted via Citizen Portal.",
        },
      ],
    };

    setApplications([newAppRecord, ...applications]);
    setSubmittedApp({
      applicationId: newId,
      expectedStatus: "Submitted (Pending Review)",
      selectedParcel: `Plot ${parcelObj?.survey_number || "101"} (${selectedParcel})`,
      service,
    });
    setStep(5);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Applications"
        subtitle="Track your land services, verification requests, and mutation status."
        breadcrumbs={[{ label: "Citizen Dashboard", href: "/dashboard/citizen" }, { label: "My Applications" }]}
        badge={<Badge variant="info">{applications.length} Total</Badge>}
        actions={
          <Button onClick={handleOpenWizard} size="sm" className="gap-1.5 font-bold shadow-sm">
            <Plus className="w-4 h-4" />
            <span>New Application</span>
          </Button>
        }
      />

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {["ALL", "SUBMITTED", "UNDER_REVIEW", "APPROVED", "COMPLETED", "REJECTED"].map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition-colors border ${
              statusFilter === st
                ? "bg-emerald-50 text-emerald-900 border-emerald-300 font-bold shadow-2xs"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
            }`}
          >
            {st === "ALL" ? "All Applications" : st.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Applications Table */}
      <Card header="My Application History">
        <DataTable
          columns={[
            {
              key: "application_number",
              header: "Application ID",
              render: (app) => (
                <div>
                  <span className="font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 text-xs inline-block">{app.application_number}</span>
                  <span className="text-[10px] text-slate-600 block mt-0.5 font-medium">{app.department}</span>
                </div>
              ),
            },
            {
              key: "service_name",
              header: "Service",
              render: (app) => (
                <div>
                  <span className="font-bold text-slate-800 block">{app.service_name}</span>
                  <span className="text-[10px] font-mono text-emerald-700">{app.ulpin}</span>
                </div>
              ),
            },
            {
              key: "survey_number",
              header: "Parcel",
              render: (app) => (
                <span className="font-semibold text-slate-700">
                  Plot {app.survey_number} ({app.village})
                </span>
              ),
            },
            {
              key: "submitted_date",
              header: "Submitted",
              render: (app) => <span>{formatDate(app.submitted_date)}</span>,
            },
            {
              key: "status",
              header: "Status",
              render: (app) => getStatusBadge(app.status),
            },
            {
              key: "last_updated",
              header: "Last Updated",
              render: (app) => <span>{formatDate(app.last_updated)}</span>,
            },
            {
              key: "actions",
              header: "Action",
              render: (app) => (
                <Link href={`/applications/${app.id}`}>
                  <Button size="sm" variant="secondary" className="py-1 px-2.5 text-[11px] gap-1 font-semibold">
                    <span>View Application</span>
                    <ArrowRight className="w-3 h-3 text-slate-400" />
                  </Button>
                </Link>
              ),
            },
          ]}
          data={filteredApps}
          keyExtractor={(app) => app.id}
          emptyMessage="No applications match the selected status."
        />
      </Card>

      {/* New Application Wizard Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={step === 5 ? "Application Submitted" : "New Citizen Application"}
        description={
          step === 5
            ? "Your request has been cryptographically recorded on the Land DPI."
            : `Step ${step} of 4: Please complete the application details.`
        }
      >
        <div className="space-y-4">
          {/* STEP 1: Select Service */}
          {step === 1 && (
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 block">1. Select Required Service</label>
              <div className="grid grid-cols-1 gap-2">
                {availableServices.map((svc) => (
                  <button
                    key={svc}
                    type="button"
                    onClick={() => setService(svc)}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between text-xs transition-all ${
                      service === svc
                        ? "border-emerald-500 bg-emerald-50/70 text-emerald-900 font-bold"
                        : "border-slate-200 hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <span>{svc}</span>
                    {service === svc && <Check className="w-4 h-4 text-emerald-600" />}
                  </button>
                ))}
              </div>
              <div className="pt-3 flex justify-end">
                <Button size="sm" onClick={() => setStep(2)}>
                  Next: Select Parcel &rarr;
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: Select Parcel */}
          {step === 2 && (
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 block">2. Select Your Land Parcel</label>
              <div className="grid grid-cols-1 gap-2">
                {citizenParcels.map((parcel) => (
                  <button
                    key={parcel.ulpin}
                    type="button"
                    onClick={() => setSelectedParcel(parcel.ulpin)}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between text-xs transition-all ${
                      selectedParcel === parcel.ulpin
                        ? "border-emerald-500 bg-emerald-50/70 text-emerald-900 font-bold"
                        : "border-slate-200 hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    <div>
                      <div className="font-bold">Plot {parcel.survey_number} — Kadarpur</div>
                      <div className="font-mono text-[10px] text-slate-500">{parcel.ulpin}</div>
                    </div>
                    {selectedParcel === parcel.ulpin && <Check className="w-4 h-4 text-emerald-600" />}
                  </button>
                ))}
              </div>
              <div className="pt-3 flex justify-between">
                <Button variant="secondary" size="sm" onClick={() => setStep(1)}>
                  &larr; Back
                </Button>
                <Button size="sm" onClick={() => setStep(3)}>
                  Next: Enter Details &rarr;
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: Enter Details */}
          {step === 3 && (
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-700 block">3. Application Details & Purpose</label>
              <textarea
                rows={4}
                value={applicantRemarks}
                onChange={(e) => setApplicantRemarks(e.target.value)}
                placeholder="State the reason or remarks for this service request (e.g. routine verification for bank financing, correction of spelling, mutation after registered sale deed)..."
                className="w-full rounded-xl border border-slate-300 p-3 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <div className="pt-3 flex justify-between">
                <Button variant="secondary" size="sm" onClick={() => setStep(2)}>
                  &larr; Back
                </Button>
                <Button size="sm" onClick={() => setStep(4)}>
                  Next: Review &rarr;
                </Button>
              </div>
            </div>
          )}

          {/* STEP 4: Review */}
          {step === 4 && (
            <div className="space-y-4">
              <label className="text-xs font-bold text-slate-700 block">4. Review Application Summary</label>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Applicant:</span>
                  <span className="font-bold text-slate-900">Suresh Chandra Yadav</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Service:</span>
                  <span className="font-bold text-emerald-700">{service}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Selected Parcel:</span>
                  <span className="font-mono text-slate-900 font-bold">{selectedParcel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Department:</span>
                  <span className="font-medium text-slate-800">Revenue & Land Records</span>
                </div>
                {applicantRemarks && (
                  <div className="pt-2 border-t border-slate-200">
                    <span className="text-slate-500 block text-[11px]">Remarks:</span>
                    <p className="text-slate-700 text-xs mt-0.5">{applicantRemarks}</p>
                  </div>
                )}
              </div>
              <div className="pt-3 flex justify-between">
                <Button variant="secondary" size="sm" onClick={() => setStep(3)}>
                  &larr; Back
                </Button>
                <Button size="sm" onClick={handleSubmitApplication} className="font-bold">
                  Submit Application
                </Button>
              </div>
            </div>
          )}

          {/* STEP 5: Application Submitted Confirmation */}
          {step === 5 && submittedApp && (
            <div className="space-y-4 text-center py-4">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>

              <h3 className="text-lg font-black text-slate-900">Application Submitted</h3>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Application ID:</span>
                  <span className="font-mono font-bold text-slate-900">{submittedApp.applicationId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Expected Status:</span>
                  <Badge variant="info">{submittedApp.expectedStatus}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Selected Parcel:</span>
                  <span className="font-bold text-slate-800">{submittedApp.selectedParcel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Service:</span>
                  <span className="font-bold text-emerald-700">{submittedApp.service}</span>
                </div>
              </div>

              <Button size="sm" onClick={() => setIsModalOpen(false)} className="w-full font-bold">
                Done (Return to Applications)
              </Button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
