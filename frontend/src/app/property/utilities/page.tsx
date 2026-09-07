"use client";

import React from "react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Zap, Droplet, Wifi, Flame, Activity, ArrowRight, ShieldCheck } from "lucide-react";

export default function UtilitiesPage() {
  const utilityCards = [
    {
      type: "ELECTRICITY",
      title: "Power Grid Infrastructure",
      provider: "Dakshin Haryana Bijli Vitran Nigam (DHBVN)",
      icon: Zap,
      status: "OPERATIONAL",
      color: "text-amber-400",
      stats: "11kV Feeder Line Active",
      details: "Smart meter metering deployed across Kadarpur pilot sector with automated telemetry.",
      reference: "GRID-DHBVN-SEC48-FEEDER-01",
      ulpinsConnected: ["IN-HR-GGM-KDP-0101-0000", "IN-HR-GGM-KDP-0102-0000", "IN-HR-GGM-KDP-0103-0000", "IN-HR-GGM-KDP-0104-0000", "IN-HR-GGM-KDP-0108-0000"],
    },
    {
      type: "WATER_SUPPLY",
      title: "Potable Treated Water Supply",
      provider: "GMDA Water Works Division",
      icon: Droplet,
      status: "OPERATIONAL",
      color: "text-blue-400",
      stats: "150mm Treated Water Feeder Pipeline",
      details: "Chandubudhera Water Treatment Plant supply corridor directly servicing pilot plots.",
      reference: "WTR-GMDA-WW-KDP-TRUNK",
      ulpinsConnected: ["IN-HR-GGM-KDP-0101-0000", "IN-HR-GGM-KDP-0102-0000"],
    },
    {
      type: "SEWERAGE",
      title: "Underground Sewerage Network",
      provider: "Municipal Corporation Gurugram (MCG)",
      icon: Activity,
      status: "OPERATIONAL",
      color: "text-emerald-400",
      stats: "Behrampur STP Trunk Network",
      details: "Underground gravity conduit connected with storm water drainage compliance.",
      reference: "SEW-MCG-BEHRAMPUR-04",
      ulpinsConnected: ["IN-HR-GGM-KDP-0101-0000"],
    },
    {
      type: "TELECOM_FIBER",
      title: "Optical Fiber & Smart City Grid",
      provider: "BharatNet / GMDA Smart City Digital Grid",
      icon: Wifi,
      status: "OPERATIONAL",
      color: "text-purple-400",
      stats: "Gigabit Underground Optical Conduit",
      details: "High availability fiber ring backing smart metering, CCTV and municipal surveillance.",
      reference: "BN-HR-GGM-FBR-SEC48",
      ulpinsConnected: ["IN-HR-GGM-KDP-0101-0000", "IN-HR-GGM-KDP-0102-0000"],
    },
    {
      type: "PIPED_GAS",
      title: "City Gas Distribution (CGD)",
      provider: "Haryana City Gas Distribution Ltd",
      icon: Flame,
      status: "PLANNED",
      color: "text-orange-400",
      stats: "Medium Pressure MDPE Pipeline",
      details: "Corridor survey completed; trunk line laid along primary sector periphery.",
      reference: "CGD-HCG-SOHNA-CORR",
      ulpinsConnected: ["IN-HR-GGM-KDP-0101-0000"],
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Public Utilities & Infrastructure Dashboard"
        subtitle="Multi-utility digital registry integrating electricity meters, piped water, underground sewerage, optical fiber, and piped city gas with parcel land records."
        breadcrumbs={[
          { label: "Property", href: "/property/tax" },
          { label: "Utilities" },
        ]}
        badge={<Badge variant="info">Smart City GIS Integration</Badge>}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {utilityCards.map((utl) => {
          const Icon = utl.icon;
          return (
            <Card key={utl.type} className="p-5 border-slate-200 bg-white shadow-2xs flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                      <Icon className={`w-5 h-5 ${utl.color}`} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{utl.title}</h3>
                      <p className="text-[10px] text-slate-500">{utl.provider}</p>
                    </div>
                  </div>
                  <Badge variant={utl.status === "OPERATIONAL" ? "success" : "warning"}>
                    {utl.status}
                  </Badge>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                  <span className="text-slate-500 block text-[10px] uppercase font-semibold">Capacity & Spec</span>
                  <span className="font-semibold text-slate-800 mt-0.5 block">{utl.stats}</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{utl.details}</p>

                <div className="text-[11px] text-slate-500 font-mono">
                  <span>Ref: {utl.reference}</span>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex justify-between items-center text-xs">
                <span className="text-slate-500">{utl.ulpinsConnected.length} Parcels Connected</span>
                <Link href={`/parcel/${utl.ulpinsConnected[0]}`}>
                  <Button size="sm" variant="secondary" className="gap-1 py-1 text-[11px]">
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3" />
                  </Button>
                </Link>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
