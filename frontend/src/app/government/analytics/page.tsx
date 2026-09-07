"use client";

import React from "react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import {
  BarChart3,
  Layers,
  CheckCircle2,
  AlertTriangle,
  ArrowLeftRight,
  ClipboardList,
  ShieldCheck,
  Building2,
  PieChart,
} from "lucide-react";

export default function GovernmentAnalyticsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Land Governance Analytics"
        subtitle="Operational metrics, verification efficiency, judicial dispute ratios, and transaction clearance analytics."
        breadcrumbs={[{ label: "Officer Dashboard", href: "/dashboard/government" }, { label: "Analytics" }]}
        badge={<Badge variant="info">Prototype / Demo Data</Badge>}
      />

      {/* 6 Key Operational Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <Card className="p-4 bg-white border-slate-200">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Parcel Coverage</span>
          <div className="text-2xl font-black text-slate-900 mt-1">12,480</div>
          <span className="text-[10px] text-emerald-700 font-semibold mt-0.5 block">100% PostGIS Geocoded</span>
        </Card>

        <Card className="p-4 bg-white border-slate-200">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Record Verification</span>
          <div className="text-2xl font-black text-emerald-700 mt-1">94.2%</div>
          <span className="text-[10px] text-slate-500 mt-0.5 block">Reconciliation Rate</span>
        </Card>

        <Card className="p-4 bg-white border-slate-200">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Active Disputes</span>
          <div className="text-2xl font-black text-rose-600 mt-1">48</div>
          <span className="text-[10px] text-slate-500 mt-0.5 block">0.38% Total Ratio</span>
        </Card>

        <Card className="p-4 bg-white border-slate-200">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Transactions</span>
          <div className="text-2xl font-black text-blue-600 mt-1">1,420</div>
          <span className="text-[10px] text-slate-500 mt-0.5 block">Conveyance Deeds</span>
        </Card>

        <Card className="p-4 bg-white border-slate-200">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Restrictions</span>
          <div className="text-2xl font-black text-amber-600 mt-1">72</div>
          <span className="text-[10px] text-slate-500 mt-0.5 block">Active Court/Bank Stays</span>
        </Card>

        <Card className="p-4 bg-white border-slate-200">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Applications</span>
          <div className="text-2xl font-black text-purple-600 mt-1">348</div>
          <span className="text-[10px] text-slate-500 mt-0.5 block">Citizen Service Queue</span>
        </Card>
      </div>

      {/* Restrained Professional Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Parcels by Land Use */}
        <Card header="Parcels by Land Use Classification">
          <div className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-700">Residential (R-1 / R-2)</span>
                <span className="text-slate-900 font-bold">7,738 parcels (62%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: "62%" }}></div>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-700">Agricultural</span>
                <span className="text-slate-900 font-bold">2,995 parcels (24%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: "24%" }}></div>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-700">Commercial</span>
                <span className="text-slate-900 font-bold">1,372 parcels (11%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "11%" }}></div>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-700">Public & Institutional</span>
                <span className="text-slate-900 font-bold">375 parcels (3%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: "3%" }}></div>
              </div>
            </div>
          </div>
        </Card>

        {/* Chart 2: Applications by Status */}
        <Card header="Applications by Lifecycle Status">
          <div className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-700">Completed & Sanctioned</span>
                <span className="text-slate-900 font-bold">223 applications (64%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: "64%" }}></div>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-700">Under Review / Nodal Check</span>
                <span className="text-slate-900 font-bold">77 applications (22%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: "22%" }}></div>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-700">Submitted / Initial Intake</span>
                <span className="text-slate-900 font-bold">35 applications (10%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "10%" }}></div>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-700">Rejected / Returned with Notice</span>
                <span className="text-slate-900 font-bold">13 applications (4%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-rose-600 h-2.5 rounded-full" style={{ width: "4%" }}></div>
              </div>
            </div>
          </div>
        </Card>

        {/* Chart 3: Disputes by Status */}
        <Card header="Dispute Breakdown by Nature & Relief">
          <div className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-700">Active Injunction Freeze</span>
                <span className="text-slate-900 font-bold">20 cases (42%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-rose-600 h-2.5 rounded-full" style={{ width: "42%" }}></div>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-700">Partition & Share Challenges</span>
                <span className="text-slate-900 font-bold">15 cases (31%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: "31%" }}></div>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-700">Boundary & Right of Way Suits</span>
                <span className="text-slate-900 font-bold">9 cases (19%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: "19%" }}></div>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-700">Discharged / Compromise Recorded</span>
                <span className="text-slate-900 font-bold">4 cases (8%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: "8%" }}></div>
              </div>
            </div>
          </div>
        </Card>

        {/* Chart 4: Transaction Outcomes */}
        <Card header="Transaction Validation Outcomes">
          <div className="space-y-4 text-xs">
            <div className="space-y-1.5">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-700">Eligible / Sanctioned Transfer</span>
                <span className="text-slate-900 font-bold">1,250 transactions (88%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: "88%" }}></div>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-700">Blocked by Active Court Injunction</span>
                <span className="text-slate-900 font-bold">114 transactions (8%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-rose-600 h-2.5 rounded-full" style={{ width: "8%" }}></div>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between font-semibold">
                <span className="text-slate-700">Halted Pending Bank Lien Clearance</span>
                <span className="text-slate-900 font-bold">56 transactions (4%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: "4%" }}></div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Verification Results Matrix */}
      <Card header="Automated Cross-Department Verification Yield">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
            <div className="flex items-center justify-between">
              <span className="font-bold text-emerald-900">Automatic Canonical Match</span>
              <Badge variant="success">86%</Badge>
            </div>
            <p className="text-slate-600 mt-2 leading-relaxed">
              Deeds and Jamabandis that match DGPS PostGIS polygons with zero attribute variance.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-900">Manual Review Required</span>
              <Badge variant="warning">11%</Badge>
            </div>
            <p className="text-slate-600 mt-2 leading-relaxed">
              Transliteration spelling variations or legacy survey coordinate discrepancies.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200">
            <div className="flex items-center justify-between">
              <span className="font-bold text-rose-900">Boundary Discrepancy Flagged</span>
              <Badge variant="danger">3%</Badge>
            </div>
            <p className="text-slate-600 mt-2 leading-relaxed">
              Area differences exceeding ±2% tolerance requiring physical surveyor remeasurement.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
