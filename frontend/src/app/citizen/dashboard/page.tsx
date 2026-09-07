"use client";

import React from "react";
import Link from "next/link";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { MOCK_PARCELS } from "@/data/parcels";
import { MOCK_APPLICATIONS } from "@/data/applications";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatArea } from "@/lib/formatters";
import {
  UserCheck,
  FileText,
  FolderOpen,
  Bell,
  MapPin,
  ArrowRight,
  ShieldCheck,
  Compass,
  CheckCircle2,
  Calendar,
  Layers,
  Landmark,
} from "lucide-react";

function CitizenDashboardContent() {
  const { user } = useAuth();

  // Suresh Chandra Yadav's 3 parcels
  const citizenParcels = MOCK_PARCELS.filter((p) =>
    ["IN-HR-GGM-KDP-0101-0000", "IN-HR-GGM-KDP-0103-0000", "IN-HR-GGM-KDP-0108-0000"].includes(p.ulpin)
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Citizen Dashboard
            </h1>
            <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
              Verified Citizen
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Your connected view of sovereign land records, applications, and certified title documents.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/citizen/applications">
            <Button size="sm" className="gap-1.5 shadow-sm font-semibold bg-emerald-700 hover:bg-emerald-800 text-white">
              <FileText className="w-3.5 h-3.5" />
              <span>New Application</span>
            </Button>
          </Link>
          <Link href="/explorer">
            <Button variant="secondary" size="sm" className="gap-1.5 font-semibold">
              <Compass className="w-3.5 h-3.5" />
              <span>GIS Explorer</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero / Summary Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-700 to-teal-700 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-1">
          <div className="text-xs uppercase font-bold tracking-wider opacity-90">
            Welcome back
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold">{user?.name || "Suresh Chandra Yadav"}</div>
          <p className="text-xs opacity-90 max-w-xl">
            Aadhaar-linked land holdings authenticated under Haryana Revenue Jamabandi Integration. All 3 properties are in good standing with verified cadastral boundaries.
          </p>
        </div>
      </div>

      {/* 4 Metric Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href="/citizen/my-land">
          <Card className="p-5 hover:border-emerald-300 transition-all cursor-pointer bg-white">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                My Parcels
              </span>
              <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
                <UserCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-black text-slate-900">3</span>
              <span className="text-xs text-slate-500 ml-2">Kadarpur</span>
            </div>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">
              All 100% Freehold Clear
            </p>
          </Card>
        </Link>

        <Link href="/citizen/applications">
          <Card className="p-5 hover:border-blue-300 transition-all cursor-pointer bg-white">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Active Applications
              </span>
              <div className="p-2 rounded-xl bg-blue-50 text-blue-700">
                <FileText className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-black text-slate-900">2</span>
              <span className="text-xs text-slate-500 ml-2">In Review</span>
            </div>
            <p className="text-[11px] text-blue-600 font-semibold mt-1">
              Mutation & NOC in progress
            </p>
          </Card>
        </Link>

        <Link href="/citizen/documents">
          <Card className="p-5 hover:border-purple-300 transition-all cursor-pointer bg-white">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Documents
              </span>
              <div className="p-2 rounded-xl bg-purple-50 text-purple-700">
                <FolderOpen className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-black text-slate-900">8</span>
              <span className="text-xs text-slate-500 ml-2">Verified</span>
            </div>
            <p className="text-[11px] text-purple-600 font-semibold mt-1">
              Deeds, Jamabandis & Tax
            </p>
          </Card>
        </Link>

        <Link href="/citizen/notifications">
          <Card className="p-5 hover:border-amber-300 transition-all cursor-pointer bg-white">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Notifications
              </span>
              <div className="p-2 rounded-xl bg-amber-50 text-amber-700">
                <Bell className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-3xl font-black text-slate-900">4</span>
              <span className="text-xs text-slate-500 ml-2">Unread</span>
            </div>
            <p className="text-[11px] text-amber-600 font-semibold mt-1">
              Latest: Tax Receipt Ready
            </p>
          </Card>
        </Link>
      </div>

      {/* MY LAND Property Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-slate-900 tracking-tight">MY LAND</h2>
            <p className="text-xs text-slate-500">
              Parcels registered and confirmed under your digital identity
            </p>
          </div>
          <Link
            href="/citizen/my-land"
            className="text-xs text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1"
          >
            <span>View All Parcels</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {citizenParcels.map((parcel, idx) => (
            <Card key={parcel.ulpin} className="p-5 flex flex-col justify-between hover:shadow-md transition-shadow bg-white">
              <div className="space-y-3">
                {/* Card Top Pill */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                    Parcel 0{idx + 1}
                  </span>
                  <Badge variant="success">Verified</Badge>
                </div>

                {/* ULPIN & Survey */}
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">ULPIN</span>
                  <div className="font-mono text-xs font-bold text-slate-900 truncate">
                    {parcel.ulpin}
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-500">Survey No.</span>
                    <p className="font-bold text-slate-800">{parcel.survey_number}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500">Location</span>
                    <p className="font-bold text-slate-800">{parcel.village}, {parcel.district}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500">Area</span>
                    <p className="font-bold text-slate-800">{formatArea(parcel.spatial.area_sq_meters)}</p>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500">Land Use</span>
                    <p className="font-bold text-slate-800">{parcel.land_use}</p>
                  </div>
                </div>

                {/* Status Badges */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Encumbrance</span>
                    <span className="font-bold text-emerald-700">✓ No Active Mortgage</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block">Dispute</span>
                    <span className="font-bold text-emerald-700">✓ No Active Injunction</span>
                  </div>
                </div>
              </div>

              {/* View Parcel CTA */}
              <div className="pt-4 mt-2">
                <Link href={`/parcel/${parcel.ulpin}`}>
                  <Button variant="secondary" className="w-full justify-center font-bold text-xs">
                    <span>View Parcel 360°</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Active Applications Quick Tracker */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-slate-900 tracking-tight">Active Applications</h2>
          <Link
            href="/citizen/applications"
            className="text-xs text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1"
          >
            <span>Manage All Applications</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MOCK_APPLICATIONS.slice(0, 2).map((app) => (
            <Card key={app.id} className="p-4 bg-white hover:border-slate-300 transition-all">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-slate-700">
                  {app.application_number}
                </span>
                <Badge
                  variant={
                    app.status === "COMPLETED"
                      ? "success"
                      : app.status === "REJECTED"
                      ? "danger"
                      : "warning"
                  }
                >
                  {app.status === "COMPLETED"
                    ? "✓ Completed"
                    : app.status === "REJECTED"
                    ? "✗ Rejected"
                    : "⏱ " + app.status.replace("_", " ")}
                </Badge>
              </div>
              <p className="font-bold text-slate-900 text-sm mt-1">{app.service_name}</p>
              <div className="flex items-center justify-between text-xs text-slate-500 mt-2 pt-2 border-t border-slate-100">
                <span>Plot {app.survey_number} • Kadarpur</span>
                <Link
                  href={`/citizen/applications`}
                  className="text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CitizenDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["citizen", "admin"]}>
      <CitizenDashboardContent />
    </ProtectedRoute>
  );
}
