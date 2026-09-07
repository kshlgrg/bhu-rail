"use client";

import React from "react";
import Link from "next/link";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MOCK_PARCELS } from "@/data/parcels";
import { formatArea } from "@/lib/formatters";
import {
  UserCheck,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Landmark,
  FileCheck,
  Layers,
} from "lucide-react";

function MyLandContent() {
  // Demo Citizen (Suresh Chandra Yadav) parcels: 0101, 0103, 0108
  const myParcels = MOCK_PARCELS.filter((p) =>
    ["IN-HR-GGM-KDP-0101-0000", "IN-HR-GGM-KDP-0103-0000", "IN-HR-GGM-KDP-0108-0000"].includes(p.ulpin)
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="My Land"
        subtitle="View sovereign land parcels and titles associated with your Aadhaar identity."
        breadcrumbs={[{ label: "Citizen Dashboard", href: "/citizen/dashboard" }, { label: "My Land" }]}
        badge={<Badge variant="success">3 Verified Parcels</Badge>}
      />

      {/* Citizen Profile Card */}
      <div className="p-5 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center font-bold text-lg">
            S
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900">Suresh Chandra Yadav</h3>
            <p className="text-xs text-slate-500 font-mono">aadhaar-sha256-a9f82d1b</p>
            <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-600">
              <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                Aadhaar e-KYC Verified
              </span>
              <span>• Kadarpur, Gurugram, Haryana</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/services/land-upi">
            <Button size="sm" variant="secondary" className="gap-1.5 text-xs font-semibold">
              <Landmark className="w-3.5 h-3.5 text-emerald-600" />
              <span>Land UPI Status</span>
            </Button>
          </Link>
          <Link href="/explorer">
            <Button size="sm" variant="secondary" className="gap-1.5 text-xs font-semibold">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>GIS Boundary</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Property Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500">
            Connected Land Holdings
          </h2>
          <span className="text-xs text-slate-500">Live PostGIS & Jamabandi Sync</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {myParcels.map((parcel, idx) => (
            <Card key={parcel.ulpin} className="p-5 border-slate-200 bg-white hover:shadow-md transition-all flex flex-col justify-between">
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                      Parcel 0{idx + 1}
                    </span>
                    <h3 className="text-base font-bold text-slate-900">
                      Survey No. {parcel.survey_number}
                    </h3>
                  </div>
                  <Badge variant="success">Verified</Badge>
                </div>

                {/* ULPIN */}
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">ULPIN</span>
                  <div className="font-mono text-xs font-bold text-slate-900 truncate">
                    {parcel.ulpin}
                  </div>
                </div>

                {/* Attributes */}
                <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-500">Location</span>
                    <p className="font-bold text-slate-800">{parcel.village}, {parcel.district}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500">Area</span>
                    <p className="font-bold text-slate-800">{formatArea(parcel.spatial.area_sq_meters)}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500">Ownership</span>
                    <p className="font-bold text-emerald-700">✓ Verified (100%)</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500">Land Use</span>
                    <p className="font-bold text-slate-800">{parcel.land_use}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500">Encumbrance</span>
                    <p className="font-bold text-emerald-700">✓ No Active Mortgage</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500">Dispute</span>
                    <p className="font-bold text-emerald-700">✓ No Active Injunction</p>
                  </div>
                </div>
              </div>

              {/* View Parcel 360° CTA */}
              <div className="pt-4 mt-2">
                <Link href={`/parcel/${parcel.ulpin}`}>
                  <Button variant="primary" className="w-full justify-center font-bold text-xs bg-emerald-700 hover:bg-emerald-800 text-white">
                    <span>View Parcel 360°</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CitizenMyLandPage() {
  return (
    <ProtectedRoute allowedRoles={["citizen", "admin"]}>
      <MyLandContent />
    </ProtectedRoute>
  );
}
