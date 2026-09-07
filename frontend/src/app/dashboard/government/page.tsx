"use client";

import React from "react";
import Link from "next/link";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Shield,
  Layers,
  CheckSquare,
  Scale,
  ClipboardList,
  AlertTriangle,
  ArrowLeftRight,
  ArrowRight,
  CheckCircle2,
  Clock,
  Building2,
  FileCheck,
  ShieldAlert,
  Compass,
  FileWarning,
} from "lucide-react";

function GovernmentOfficerDashboardContent() {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Government Officer Dashboard
            </h1>
            <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
              Authorized Console
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Land administration, verification and governance overview.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/government/verification">
            <Button size="sm" className="gap-1.5 font-bold shadow-sm">
              <CheckSquare className="w-3.5 h-3.5" />
              <span>Verification Queue (126)</span>
            </Button>
          </Link>
          <Link href="/government/parcels">
            <Button variant="secondary" size="sm" className="gap-1.5 font-bold">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>All Parcels</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Officer Persona Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-blue-900 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-[11px] uppercase font-bold tracking-wider text-slate-400">
              Logged in as Administrative Officer
            </div>
            <div className="text-2xl font-extrabold">{user?.name || "Rajeshwar Sharma"}</div>
            <div className="text-xs text-slate-300 flex items-center gap-2 pt-0.5">
              <span>{user && "department" in user ? user.department : "Revenue Administration"}</span>
              <span>•</span>
              <span className="font-mono text-emerald-400">
                {user && "officerId" in user ? user.officerId : "HR-REV-GGM-0842"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold">
              District Gurugram • Tehsil Sohna
            </div>
          </div>
        </div>
      </div>

      {/* 6 Key Operational Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <Link href="/government/parcels">
          <Card className="p-4 hover:border-blue-300 transition-all cursor-pointer bg-white">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Total Parcels</span>
            <div className="text-2xl font-black text-slate-900 mt-1">12,480</div>
            <span className="text-[10px] text-slate-500 mt-0.5 block">State Cadastre</span>
          </Card>
        </Link>

        <Link href="/government/verification">
          <Card className="p-4 hover:border-amber-300 transition-all cursor-pointer bg-white">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Pending Verification</span>
            <div className="text-2xl font-black text-amber-600 mt-1">126</div>
            <span className="text-[10px] text-amber-700 font-semibold mt-0.5 block">Queue Action Req.</span>
          </Card>
        </Link>

        <Link href="/government/disputes">
          <Card className="p-4 hover:border-rose-300 transition-all cursor-pointer bg-white">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Active Disputes</span>
            <div className="text-2xl font-black text-rose-600 mt-1">48</div>
            <span className="text-[10px] text-rose-700 font-semibold mt-0.5 block">Revenue Court Stays</span>
          </Card>
        </Link>

        <Link href="/government/applications">
          <Card className="p-4 hover:border-purple-300 transition-all cursor-pointer bg-white">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Pending Applications</span>
            <div className="text-2xl font-black text-purple-600 mt-1">348</div>
            <span className="text-[10px] text-slate-500 mt-0.5 block">Mutation & NOCs</span>
          </Card>
        </Link>

        <Link href="/government/fraud-prevention">
          <Card className="p-4 hover:border-rose-300 transition-all cursor-pointer bg-white">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Restricted Parcels</span>
            <div className="text-2xl font-black text-rose-600 mt-1">72</div>
            <span className="text-[10px] text-slate-500 mt-0.5 block">Transfer Locked</span>
          </Card>
        </Link>

        <Link href="/government/transactions">
          <Card className="p-4 hover:border-blue-300 transition-all cursor-pointer bg-white">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Transactions in Review</span>
            <div className="text-2xl font-black text-blue-600 mt-1">31</div>
            <span className="text-[10px] text-slate-500 mt-0.5 block">Pre-Validation</span>
          </Card>
        </Link>
      </div>

      {/* Main Two-Column Workspaces: PENDING ACTIONS & IMPORTANT ALERTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* PENDING ACTIONS */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-emerald-600" />
              <span>Pending Actions</span>
            </h2>
            <span className="text-xs text-slate-500">Priority Operational Queue</span>
          </div>

          <div className="space-y-2.5">
            <Link href="/government/verification">
              <Card className="p-4 hover:border-blue-300 transition-all cursor-pointer bg-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xs">
                      126
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">Record Verification</h4>
                      <p className="text-[11px] text-slate-500">Cross-match Haryana Jamabandi records with DGPS boundary GIS.</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </div>
              </Card>
            </Link>

            <Link href="/records/registration">
              <Card className="p-4 hover:border-blue-300 transition-all cursor-pointer bg-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs">
                      14
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">Registration Review</h4>
                      <p className="text-[11px] text-slate-500">Sub-registrar conveyances awaiting deed hash reconciliation.</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </div>
              </Card>
            </Link>

            <Link href="/government/disputes">
              <Card className="p-4 hover:border-blue-300 transition-all cursor-pointer bg-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center font-bold text-xs">
                      8
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">Dispute Review</h4>
                      <p className="text-[11px] text-slate-500">Revenue court decrees and injunction freeze requests.</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </div>
              </Card>
            </Link>

            <Link href="/government/transactions">
              <Card className="p-4 hover:border-blue-300 transition-all cursor-pointer bg-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-xs">
                      31
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">Transaction Validation</h4>
                      <p className="text-[11px] text-slate-500">Multi-department automated pre-validation approvals.</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </div>
              </Card>
            </Link>

            <Link href="/government/planning?tab=building-permissions">
              <Card className="p-4 hover:border-blue-300 transition-all cursor-pointer bg-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-cyan-50 text-cyan-700 flex items-center justify-center font-bold text-xs">
                      12
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-slate-900">Planning Approval</h4>
                      <p className="text-[11px] text-slate-500">GMDA FAR setback and municipal building sanctions.</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </div>
              </Card>
            </Link>
          </div>
        </div>

        {/* IMPORTANT ALERTS */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>Important Alerts</span>
            </h2>
            <span className="text-xs text-rose-600 font-semibold">Action Recommended</span>
          </div>

          <div className="space-y-2.5">
            <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/70 space-y-1.5">
              <div className="flex items-center justify-between">
                <Badge variant="danger">⚠ Injunction Active</Badge>
                <span className="text-[10px] text-slate-500 font-mono">Case CIV-2025-01821</span>
              </div>
              <h4 className="font-bold text-xs text-slate-900">
                SDM Sohna Injunction Freeze on Plot 104
              </h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Deterministic rule `RULE-JUDICIAL-INJUNCTION-ACTIVE` enforced. Instant transfer locked until court discharge.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/70 space-y-1.5">
              <div className="flex items-center justify-between">
                <Badge variant="warning">⚠ Discrepancy Detected</Badge>
                <span className="text-[10px] text-slate-500 font-mono">Plot 102</span>
              </div>
              <h4 className="font-bold text-xs text-slate-900">
                Cadastral Area Variance Detected
              </h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Source deed registers 1,850 m² while DGPS PostGIS polygon measures 1,820 m². Verification required.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/70 space-y-1.5">
              <div className="flex items-center justify-between">
                <Badge variant="warning">⏱ Verification Pending</Badge>
                <span className="text-[10px] text-slate-500 font-mono">3 Deeds</span>
              </div>
              <h4 className="font-bold text-xs text-slate-900">
                Pending Sub-Registrar Biometric Auth
              </h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Awaiting witness token confirmation before final registry issuance.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/70 space-y-1.5">
              <div className="flex items-center justify-between">
                <Badge variant="info">⏱ Review Pending</Badge>
                <span className="text-[10px] text-slate-500 font-mono">Plot 108</span>
              </div>
              <h4 className="font-bold text-xs text-slate-900">
                Spatial Boundary Overlap Check
              </h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Subdivision request underway for 10,000 m² parent parcel into two child lots.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* RECENT ACTIVITY LOG */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            <span>Recent Activity Log</span>
          </h2>
          <Link href="/government/audit" className="text-xs text-blue-700 hover:text-blue-800 font-bold flex items-center gap-1">
            <span>View Full Audit Chain</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <Card className="p-0 overflow-hidden bg-white">
          <div className="divide-y divide-slate-100 text-xs">
            <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <div>
                  <span className="font-bold text-slate-900">Parcel updated:</span>
                  <span className="text-slate-600 ml-1.5">Plot 101 state hash verified on Block #01</span>
                </div>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">10 mins ago</span>
            </div>

            <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-blue-500" />
                <div>
                  <span className="font-bold text-slate-900">Record verified:</span>
                  <span className="text-slate-600 ml-1.5">Sale Deed No. 8921/2016 verified by Sub-Registrar</span>
                </div>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">42 mins ago</span>
            </div>

            <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <div>
                  <span className="font-bold text-slate-900">Dispute filed:</span>
                  <span className="text-slate-600 ml-1.5">Case CIV-2025-01821 lodged in Revenue Court for Plot 104</span>
                </div>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">2 hours ago</span>
            </div>

            <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-rose-600" />
                <div>
                  <span className="font-bold text-slate-900">Transaction blocked:</span>
                  <span className="text-slate-600 ml-1.5">Transfer halted by rule RULE-JUDICIAL-INJUNCTION-ACTIVE</span>
                </div>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">4 hours ago</span>
            </div>

            <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-purple-500" />
                <div>
                  <span className="font-bold text-slate-900">Subdivision approved:</span>
                  <span className="text-slate-600 ml-1.5">Parent 0108 split into 0108-A and 0108-B field book verified</span>
                </div>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">Yesterday</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default function GovernmentOfficerDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={["government", "admin"]}>
      <GovernmentOfficerDashboardContent />
    </ProtectedRoute>
  );
}
