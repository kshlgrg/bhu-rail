"use client";

import React from "react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { MOCK_ZONING_DEFINITIONS } from "@/data/zoning";
import {
  Building2,
  CheckCircle2,
  XCircle,
  ArrowRight,
} from "lucide-react";

export default function ZoningPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Urban Zoning & Development Control Regulations"
        subtitle="Floor Area Ratio (FAR), maximum permissible building heights, setback norms, and conforming activity schedules."
        breadcrumbs={[
          { label: "Planning", href: "/government/planning?tab=zoning" },
          { label: "Zoning" },
        ]}
        badge={<Badge variant="success">Haryana DCR 2023</Badge>}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {MOCK_ZONING_DEFINITIONS.map((zone) => (
          <Card key={zone.zoneCode} className="p-5 border-slate-200 bg-white flex flex-col justify-between hover:shadow-md transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div>
                  <span className="text-xl font-bold text-slate-900 block">{zone.zoneCode}</span>
                  <span className="text-xs text-slate-500 block mt-0.5">{zone.zoneName}</span>
                </div>
                <Badge variant={zone.category === "RESIDENTIAL" ? "success" : zone.category === "COMMERCIAL" ? "info" : "warning"}>
                  {zone.category}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Max FAR</span>
                  <span className="text-base font-bold text-emerald-700 mt-0.5 block">{zone.far}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Max Height</span>
                  <span className="text-base font-bold text-slate-800 mt-0.5 block">{zone.maxHeightMeters}m</span>
                </div>
              </div>

              {/* Permitted Activities */}
              <div className="space-y-1.5 text-xs">
                <span className="text-slate-600 font-semibold block text-[11px] uppercase tracking-wider">
                  Permitted Activities:
                </span>
                <ul className="space-y-1">
                  {zone.permittedActivities.map((act, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-slate-600 text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Restrictions */}
              <div className="space-y-1.5 text-xs pt-2 border-t border-slate-100">
                <span className="text-slate-600 font-semibold block text-[11px] uppercase tracking-wider">
                  Restricted Activities:
                </span>
                <ul className="space-y-1">
                  {zone.restrictedActivities.map((rest, i) => (
                    <li key={i} className="flex items-start gap-1.5 text-rose-700 text-[11px]">
                      <XCircle className="w-3.5 h-3.5 text-rose-600 flex-shrink-0 mt-0.5" />
                      <span>{rest}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100">
              <Link href={`/explorer?q=${zone.category}`}>
                <Button size="sm" variant="secondary" className="w-full gap-1.5 text-xs font-bold">
                  <span>View Parcels in {zone.zoneCode}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
