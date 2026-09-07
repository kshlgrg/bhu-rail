"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useParcel } from "@/hooks/useParcel";
import { useAuth } from "@/context/AuthContext";
import { PageHeader } from "@/components/layout/PageHeader";
import { ParcelHeader } from "@/components/parcel/ParcelHeader";
import { ParcelTabs } from "@/components/parcel/ParcelTabs";
import { Skeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ArrowLeft, AlertCircle } from "lucide-react";

export default function ParcelDetailPage() {
  const params = useParams();
  const rawUlpin = Array.isArray(params?.ulpin) ? params.ulpin[0] : (params?.ulpin as string) || "";
  const ulpin = decodeURIComponent(rawUlpin);

  const { role } = useAuth();
  const { parcel, loading, error } = useParcel(ulpin);
  const [activeTab, setActiveTab] = useState("overview");

  const isCitizen = role === "citizen";

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-44 w-full rounded-2xl" />
        <Skeleton className="h-96 w-full rounded-2xl" />
      </div>
    );
  }

  if (error || !parcel) {
    return (
      <div className="py-12">
        <EmptyState
          icon={AlertCircle}
          title="Parcel Not Found"
          description={`Unable to locate cadastral records for ULPIN ${ulpin}. Verify the identification number or select from the cadastral explorer.`}
          actionLabel="Return to Land Explorer"
          onAction={() => (window.location.href = "/explorer")}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Parcel 360° — Plot ${parcel.survey_number}`}
        subtitle={
          isCitizen
            ? "Citizen Property Passport: Verified identity, cadastral area, title rights, municipal zoning, and statutory certificates."
            : "Administrative Master Profile: Comprehensive multi-department registry spanning spatial geometries, canonical reconciliation, deed audits, and transfer validation."
        }
        breadcrumbs={[
          {
            label: isCitizen ? "Citizen Dashboard" : "Officer Dashboard",
            href: isCitizen ? "/dashboard/citizen" : "/dashboard/government",
          },
          { label: `Plot ${parcel.survey_number}` },
        ]}
        badge={
          <Badge variant={isCitizen ? "success" : "info"}>
            {isCitizen ? "Citizen Read-Only View" : "Government Detailed View"}
          </Badge>
        }
        actions={
          <Link href="/explorer">
            <Button size="sm" variant="secondary" className="gap-1 text-xs font-semibold">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Explorer</span>
            </Button>
          </Link>
        }
      />

      <ParcelHeader parcel={parcel} onNavigateTab={(tab) => setActiveTab(tab)} />

      <ParcelTabs parcel={parcel} defaultTab={activeTab} />
    </div>
  );
}
