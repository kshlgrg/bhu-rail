"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { executeSubdivide } from "@/lib/api";
import { formatArea } from "@/lib/formatters";
import {
  Scissors,
  GitFork,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Layers,
  MapPin,
  Compass,
  FileCheck,
} from "lucide-react";

function SubdivisionContent() {
  const searchParams = useSearchParams();
  const defaultUlpin = searchParams.get("ulpin") || "IN-HR-GGM-KDP-0108-0000";

  // Step state
  const [currentStep, setCurrentStep] = useState(1);
  const [parentUlpin, setParentUlpin] = useState(defaultUlpin);
  const [heir1, setHeir1] = useState("Balwant Singh (Elder Son)");
  const [heir2, setHeir2] = useState("Gurpreet Singh (Younger Son)");
  const [surveyorLic, setSurveyorLic] = useState("SURV-LIC-HR-2024-991");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const steps = [
    { num: 1, label: "Select Parcel" },
    { num: 2, label: "Partition Workspace" },
    { num: 3, label: "Area Validation" },
    { num: 4, label: "Execute & Ledger Commit" },
  ];

  const handleExecuteSubdivision = async () => {
    try {
      setLoading(true);
      setResult(null);
      const res = await executeSubdivide({
        parent_ulpin: parentUlpin,
        splitting_line_coordinates: [], // Spatial engine bisects intelligently
        child_owners: [
          { owner_name: heir1, share: "1/1" },
          { owner_name: heir2, share: "1/1" },
        ],
        surveyor_license_no: surveyorLic,
        revenue_officer_approval_id: "REV-APPR-SOHNA-482",
      });
      setResult(res);
      setCurrentStep(4);
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Subdivision failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Spatial Subdivision & Cadastral Lineage Engine"
        subtitle="OGC-compliant geodesic polygon bisection. Mathematically guarantees area conservation, assigns child ULPINs, and records parcel genealogy."
        breadcrumbs={[
          { label: "Governance", href: "/governance/transactions" },
          { label: "Spatial Subdivision" },
        ]}
        badge={<Badge variant="info">Killer Demo 2</Badge>}
      />

      {/* 4-Step Progress Bar */}
      <div className="p-4 rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          {steps.map((st, idx) => (
            <React.Fragment key={st.num}>
              <div className="flex items-center gap-2">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                    currentStep >= st.num
                      ? "bg-blue-700 text-white shadow-sm"
                      : "bg-slate-100 text-slate-500"
                  }`}
                >
                  {st.num}
                </div>
                <span
                  className={`text-xs font-semibold hidden sm:inline ${
                    currentStep >= st.num ? "text-slate-900" : "text-slate-400"
                  }`}
                >
                  {st.label}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-2 sm:mx-4 ${
                    currentStep > st.num ? "bg-blue-600" : "bg-slate-200"
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Partition Form & Controls */}
        <div className="lg:col-span-7 space-y-4">
          {currentStep === 1 && (
            <Card header="Step 1: Select Parent Parcel for Partition">
              <div className="space-y-4 text-xs">
                <p className="text-slate-600">
                  Select an eligible agricultural parcel primed for legal partition under the Haryana Land Revenue Act.
                </p>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1">
                    Parent Parcel ULPIN
                  </label>
                  <select
                    value={parentUlpin}
                    onChange={(e) => setParentUlpin(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-2xs"
                  >
                    <option value="IN-HR-GGM-KDP-0108-0000">
                      Plot 108 — IN-HR-GGM-KDP-0108-0000 (10,000 m² Agricultural)
                    </option>
                  </select>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-slate-700">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Current Title Holder:</span>
                    <span className="font-bold text-slate-900">Sardar Balwant Singh Dhillon</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Recorded Total Area:</span>
                    <span className="font-bold text-emerald-700">10,000.0 m² (1.00 Hectare)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Encumbrance & Disputes:</span>
                    <span className="text-emerald-700 font-semibold">NIL (Clear Freehold)</span>
                  </div>
                </div>

                <Button
                  variant="primary"
                  onClick={() => setCurrentStep(2)}
                  className="w-full gap-1.5 text-xs py-2.5 bg-blue-600 hover:bg-blue-500 shadow-sm"
                >
                  <span>Proceed to Partition Workspace</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </Card>
          )}

          {currentStep === 2 && (
            <Card header="Step 2: Surveyor Partition Workspace">
              <div className="space-y-4 text-xs">
                <p className="text-slate-600">
                  Specify authorized surveyor credentials and assign legal co-heirs to resultant child parcels.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1">
                      Licensed Surveyor Credential
                    </label>
                    <input
                      type="text"
                      value={surveyorLic}
                      onChange={(e) => setSurveyorLic(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg font-mono text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-2xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1">
                      Bisection Vector Alignment
                    </label>
                    <input
                      type="text"
                      disabled
                      value="North-South Geodesic Bisection"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 shadow-2xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1">
                      Child Parcel 1 Assignee (West Half)
                    </label>
                    <input
                      type="text"
                      value={heir1}
                      onChange={(e) => setHeir1(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-2xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1">
                      Child Parcel 2 Assignee (East Half)
                    </label>
                    <input
                      type="text"
                      value={heir2}
                      onChange={(e) => setHeir2(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 shadow-2xs"
                    />
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" onClick={() => setCurrentStep(1)} className="text-xs">
                    Back
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => setCurrentStep(3)}
                    className="flex-1 gap-1.5 text-xs bg-blue-600 hover:bg-blue-500 shadow-sm"
                  >
                    <span>Inspect Area Validation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {currentStep === 3 && (
            <Card header="Step 3: Mathematical Area Conservation Verification">
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                    <span className="font-bold text-slate-900">Area Conservation Equation:</span>
                    <Badge variant="success">0.00% Geodesic Error</Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
                      <span className="text-slate-500 block text-[10px]">Parent Area</span>
                      <span className="font-bold text-slate-900">10,000 m²</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
                      <span className="text-slate-500 block text-[10px]">Child 1 (West)</span>
                      <span className="font-bold text-emerald-700">5,000 m²</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
                      <span className="text-slate-500 block text-[10px]">Child 2 (East)</span>
                      <span className="font-bold text-emerald-700">5,000 m²</span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setCurrentStep(2)} className="text-xs">
                    Back
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleExecuteSubdivision}
                    loading={loading}
                    className="flex-1 gap-1.5 text-xs bg-emerald-600 hover:bg-emerald-500 shadow-sm"
                  >
                    <Scissors className="w-4 h-4" />
                    <span>Execute Subdivision & Mint Child ULPINs</span>
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {currentStep === 4 && result && (
            <Card header="Subdivision Successfully Committed to Trust Ledger">
              <div className="space-y-4 text-xs">
                <div className="flex items-center gap-3 text-emerald-700 p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                  <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-emerald-950 text-sm">{result.message}</h4>
                    <p className="text-[11px] text-emerald-700 mt-0.5">
                      Parent asset retired to SUBDIVIDED. 2 child assets active.
                    </p>
                  </div>
                </div>

                {/* Child ULPINs Display */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-500 font-sans">Child Parcel #1</span>
                    <span className="text-emerald-700 font-bold block">{result.transaction_record?.resulting_ulpins?.[0] || `${parentUlpin}-C1`}</span>
                    <span className="text-slate-600 text-[11px] block font-sans">Assignee: {heir1} (5,000 m²)</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                    <span className="text-[10px] uppercase font-bold text-slate-500 font-sans">Child Parcel #2</span>
                    <span className="text-emerald-700 font-bold block">{result.transaction_record?.resulting_ulpins?.[1] || `${parentUlpin}-C2`}</span>
                    <span className="text-slate-600 text-[11px] block font-sans">Assignee: {heir2} (5,000 m²)</span>
                  </div>
                </div>

                <div className="pt-2 flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setCurrentStep(1);
                      setResult(null);
                    }}
                    className="text-xs font-bold"
                  >
                    Reset Workspace
                  </Button>
                  <Link href="/governance/ledger" className="flex-1">
                    <Button variant="secondary" className="w-full text-xs font-bold">
                      View Block in Trust Ledger &rarr;
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Right 5 Cols: Visual Bisection Map Simulation */}
        <div className="lg:col-span-5 space-y-3">
          <Card header="Visual Cadastral Geometry Bisection">
            <div className="relative w-full h-72 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center p-4 select-none overflow-hidden">
              <svg viewBox="0 0 300 220" className="w-full h-full">
                {/* Visual Representation of Plot 108 */}
                {currentStep < 3 ? (
                  // Full Parent Parcel
                  <g>
                    <rect
                      x="30"
                      y="30"
                      width="240"
                      height="160"
                      rx="8"
                      fill="#eff6ff"
                      stroke="#2563eb"
                      strokeWidth="2"
                    />
                    <text x="150" y="105" textAnchor="middle" fill="#0f172a" fontWeight="bold" fontSize="14">
                      Plot 108 (Parent)
                    </text>
                    <text x="150" y="125" textAnchor="middle" fill="#64748b" fontSize="11" fontWeight="600">
                      10,000 m² (1.00 Ha)
                    </text>
                  </g>
                ) : (
                  // Split Children
                  <g>
                    {/* West Child */}
                    <rect
                      x="30"
                      y="30"
                      width="118"
                      height="160"
                      rx="6"
                      fill="#ecfdf5"
                      stroke="#059669"
                      strokeWidth="2"
                    />
                    <text x="89" y="105" textAnchor="middle" fill="#065f46" fontWeight="bold" fontSize="13">
                      Child #1
                    </text>
                    <text x="89" y="124" textAnchor="middle" fill="#047857" fontSize="10" fontWeight="600">
                      5,000 m²
                    </text>

                    {/* East Child */}
                    <rect
                      x="152"
                      y="30"
                      width="118"
                      height="160"
                      rx="6"
                      fill="#ecfdf5"
                      stroke="#059669"
                      strokeWidth="2"
                    />
                    <text x="211" y="105" textAnchor="middle" fill="#065f46" fontWeight="bold" fontSize="13">
                      Child #2
                    </text>
                    <text x="211" y="124" textAnchor="middle" fill="#047857" fontSize="10" fontWeight="600">
                      5,000 m²
                    </text>

                    {/* Center Splitting Cut Line */}
                    <line x1="149" y1="20" x2="149" y2="200" stroke="#d97706" strokeWidth="2" strokeDasharray="4 4" />
                    <text x="150" y="15" textAnchor="middle" fill="#d97706" fontSize="9" fontWeight="bold">
                      ✂ CUT VECTOR
                    </text>
                  </g>
                )}
              </svg>
            </div>
            <p className="text-[11px] text-slate-500 text-center mt-2 font-medium">
              Geodesic coordinate projection via PostGIS / Shapely topology engine.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function SubdivisionPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400 text-xs">Loading Subdivision Workspace...</div>}>
      <SubdivisionContent />
    </Suspense>
  );
}
