"use client";

import React from "react";
import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Landmark,
  FileCheck,
  Scissors,
  Receipt,
  SendHorizontal,
  FolderOpen,
  ArrowRight,
  ShieldCheck,
  Clock,
  Compass,
} from "lucide-react";

export default function ServicesDirectoryPage() {
  const serviceCategories = [
    {
      title: "Land UPI Instant Title & Collateral Clearance",
      desc: "Open API for commercial banks and NBFCs to query title verification, active liens, and court stays in sub-100ms for instant loan sanctioning.",
      icon: Landmark,
      badge: "Killer Demo 3",
      href: "/services/land-upi",
      color: "text-emerald-400",
    },
    {
      title: "Online Deed Registration & Conveyance Pre-Check",
      desc: "Deterministic rule engine pre-validation before booking sub-registrar registry appointments. Prevents fraudulent sales on disputed parcels.",
      icon: FileCheck,
      badge: "SRO Rail",
      href: "/governance/transactions",
      color: "text-cyan-400",
    },
    {
      title: "Statutory Cadastral Subdivision Partitioning",
      desc: "Surveyor portal for geodesic polygon bisection with automated area conservation proof and immediate child ULPIN generation.",
      icon: Scissors,
      badge: "Killer Demo 2",
      href: "/governance/subdivision",
      color: "text-blue-400",
    },
    {
      title: "Municipal Property Tax No-Dues Certificate (NOC)",
      desc: "Instant conveyance clearance verification confirming zero outstanding property tax dues with Municipal Corporation of Gurugram.",
      icon: Receipt,
      badge: "Municipal Gateway",
      href: "/property/tax",
      color: "text-amber-400",
    },
    {
      title: "Citizen Grievances & Record Correction",
      desc: "File formal requests for name spelling corrections, boundary resurveys, or certified Jamabandi copies with SLA tracking.",
      icon: SendHorizontal,
      badge: "Citizen Portal",
      href: "/requests",
      color: "text-purple-400",
    },
    {
      title: "Digital Public Document Locker",
      desc: "Access cryptographically signed Jamabandi nakals, registry sale deeds, mutation orders, and municipal sanction letters.",
      icon: FolderOpen,
      badge: "DigiLocker DPI",
      href: "/records/documents",
      color: "text-rose-400",
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Land Digital Public Infrastructure Services"
        subtitle="Standardized citizen, institutional, and inter-departmental digital services connecting cadastral registries, financial institutions, and municipal bodies."
        breadcrumbs={[{ label: "Services" }]}
        badge={<Badge variant="success">Open DPI Protocol v1</Badge>}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {serviceCategories.map((srv) => {
          const Icon = srv.icon;
          return (
            <Card key={srv.title} className="p-5 border-slate-200 bg-white flex flex-col justify-between hover:shadow-md transition-all">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                    <Icon className={`w-5 h-5 ${srv.color}`} />
                  </div>
                  <Badge variant="info">{srv.badge}</Badge>
                </div>
                <h3 className="font-bold text-slate-900 text-sm">{srv.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{srv.desc}</p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100">
                <Link href={srv.href}>
                  <Button size="sm" variant="secondary" className="w-full gap-1.5 text-xs py-2 font-bold">
                    <span>Launch Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
