"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { MOCK_APPLICATIONS } from "@/data/applications";
import { formatDate, formatDateTime } from "@/lib/formatters";
import {
  FileText,
  ArrowLeft,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  Download,
  Building,
  ExternalLink,
} from "lucide-react";

export default function ApplicationDetailPage() {
  const params = useParams();
  const appId = Array.isArray(params?.id) ? params.id[0] : (params?.id as string);

  const application = MOCK_APPLICATIONS.find((a) => a.id === appId);

  if (!application) {
    return (
      <div className="py-12">
        <EmptyState
          icon={AlertCircle}
          title="Application Not Found"
          description={`No application record found matching ID ${appId}.`}
          actionLabel="Return to Applications"
          onAction={() => (window.location.href = "/applications")}
        />
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "COMPLETED":
      case "APPROVED":
        return <Badge variant="success">{status}</Badge>;
      case "UNDER_REVIEW":
        return <Badge variant="info">Under Review</Badge>;
      case "REJECTED":
        return <Badge variant="danger">Rejected</Badge>;
      default:
        return <Badge variant="warning">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Application: ${application.application_number}`}
        subtitle={`Tracking details for ${application.service_name}.`}
        breadcrumbs={[
          { label: "Applications", href: "/applications" },
          { label: application.application_number },
        ]}
        actions={
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => alert(`Downloading formal receipt for ${application.application_number}...`)}
              className="gap-1.5 text-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Receipt</span>
            </Button>
            <Link href="/applications">
              <Button size="sm" variant="secondary" className="gap-1.5 text-xs">
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </Button>
            </Link>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Details & Timeline */}
        <div className="lg:col-span-2 space-y-6">
          <Card header="Application Metadata">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-slate-500 block font-semibold">Service Name</span>
                <span className="text-slate-900 font-bold mt-0.5 block">{application.service_name}</span>
              </div>
              <div>
                <span className="text-slate-500 block font-semibold">Current Status</span>
                <span className="mt-0.5 block">{getStatusBadge(application.status)}</span>
              </div>
              <div>
                <span className="text-slate-500 block font-semibold">Department</span>
                <span className="text-slate-800 mt-0.5 block">{application.department}</span>
              </div>
              <div>
                <span className="text-slate-500 block font-semibold">Applicant Name</span>
                <span className="text-slate-800 mt-0.5 block">{application.applicant_name}</span>
              </div>
              <div>
                <span className="text-slate-500 block font-semibold">Submission Date</span>
                <span className="text-slate-800 mt-0.5 block">{formatDateTime(application.submitted_date)}</span>
              </div>
              <div>
                <span className="text-slate-500 block font-semibold">Last Processed</span>
                <span className="text-slate-800 mt-0.5 block">{formatDateTime(application.last_updated)}</span>
              </div>
            </div>

            {application.remarks && (
              <div className="mt-4 p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700">
                <span className="text-slate-500 font-semibold block mb-1">Official Remarks:</span>
                <p className="text-slate-800 leading-relaxed">{application.remarks}</p>
              </div>
            )}
          </Card>

          {/* Departmental Review Timeline */}
          <Card header="Processing Timeline & Department Audit">
            <div className="space-y-4 relative pl-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {application.timeline.map((step, idx) => (
                <div key={idx} className="relative space-y-1 text-xs">
                  <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-white" />
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-xs">{step.status}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{formatDateTime(step.date)}</span>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">{step.note}</p>
                  <span className="text-[10px] text-emerald-700 font-semibold block">Actor: {step.actor}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Col: Associated Parcel Card */}
        <div className="space-y-4">
          <Card header="Linked Cadastral Parcel">
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-slate-900">Plot {application.survey_number}</span>
                <Badge variant="info">{application.village}</Badge>
              </div>
              <p className="font-mono text-[11px] text-slate-500 break-all">{application.ulpin}</p>
              <div className="pt-3 border-t border-slate-200">
                <Link href={`/parcel/${application.ulpin}`} className="w-full">
                  <Button size="sm" variant="secondary" className="w-full gap-1.5 text-xs">
                    <span>Inspect Parcel 360°</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
