"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { executeTransfer, fileDispute } from "@/lib/api";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  ShieldAlert,
  Scale,
  AlertOctagon,
  CheckCircle2,
  Lock,
  XCircle,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

function FraudPreventionContent() {
  const searchParams = useSearchParams();
  const defaultUlpin = searchParams.get("ulpin") || "IN-HR-GGM-KDP-0104-0000";

  // Transfer simulation state
  const [targetUlpin, setTargetUlpin] = useState(defaultUlpin);
  const [buyerName, setBuyerName] = useState("Vikas Oberoi");
  const [consideration, setConsideration] = useState("7500000");
  const [transferStatus, setTransferStatus] = useState<any>(null);
  const [transferLoading, setTransferLoading] = useState(false);

  // Dispute injection state
  const [dispUlpin, setDispUlpin] = useState("IN-HR-GGM-KDP-0101-0000");
  const [caseNo, setCaseNo] = useState("CIVIL/GGM/2026/891");
  const [authority, setAuthority] = useState("Civil Court Gurugram (Senior Division)");
  const [petitioner, setPetitioner] = useState("Anand Swaroop & Co-heirs");
  const [disputeLoading, setDisputeLoading] = useState(false);
  const [disputeSuccessMsg, setDisputeSuccessMsg] = useState<string | null>(null);

  const handleAttemptTransfer = async () => {
    try {
      setTransferLoading(true);
      setTransferStatus(null);
      const res = await executeTransfer({
        ulpin: targetUlpin,
        seller_identity_hash: "sha256:current_seller_hash",
        buyer_name: buyerName,
        buyer_identity_hash: "sha256:vikas_oberoi_aadhaar_hash",
        sale_consideration_inr: parseFloat(consideration) || 5000000,
        deed_doc_hash: "sha256:deed_document_digital_hash_9912",
      });
      setTransferStatus(res);
    } catch (err: any) {
      console.error(err);
      alert("Transfer request failed: " + (err.message || "Network error"));
    } finally {
      setTransferLoading(false);
    }
  };

  const handleInjectInjunction = async () => {
    try {
      setDisputeLoading(true);
      setDisputeSuccessMsg(null);
      const res = await fileDispute({
        ulpin: dispUlpin,
        case_number: caseNo,
        adjudicating_authority: authority,
        petitioner: petitioner,
        respondent: "Current Freehold Owner",
        claimed_area_sq_meters: 250.0,
        stay_order_doc_hash: "sha256:court_stay_signed_order_2026",
        freeze_transfer: true,
        freeze_mortgage: true,
      });
      setDisputeSuccessMsg(res.message);
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to register court dispute");
    } finally {
      setDisputeLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Fraud Prevention & Judicial Injunction Engine"
        subtitle="Cryptographic pre-validation intercepting unauthorized conveyances on disputed parcels. Protects citizens against paper-silo fraud through automated deterministic rule checks."
        breadcrumbs={[
          { label: "Governance", href: "/governance/transactions" },
          { label: "Fraud Prevention" },
        ]}
        badge={<Badge variant="danger">Killer Demo 1</Badge>}
      />

      {/* Scenario A: Attempt Transfer on Disputed Plot 104 */}
      <Card header="Scenario A: Attempt Transfer on Court-Stayed Parcel (Plot 104)">
        <div className="space-y-4 text-xs">
          <p className="text-slate-600 leading-relaxed">
            In legacy registries, sellers routinely conceal active court injunctions. Under Bhu-Rail DPI, judicial stay orders freeze the asset state hash in real-time. Any subsequent registry transfer is <strong>instantly evaluated and blocked</strong> with zero discretionary loophole.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1">
                Target Parcel ULPIN
              </label>
              <input
                type="text"
                value={targetUlpin}
                onChange={(e) => setTargetUlpin(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono text-slate-900 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 shadow-2xs"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1">
                Intended Buyer
              </label>
              <input
                type="text"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 shadow-2xs"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1">
                Sale Consideration (INR)
              </label>
              <input
                type="text"
                value={consideration}
                onChange={(e) => setConsideration(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono text-slate-900 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 shadow-2xs"
              />
            </div>
          </div>

          <Button
            variant="danger"
            onClick={handleAttemptTransfer}
            loading={transferLoading}
            className="w-full py-2.5 text-xs font-bold uppercase tracking-wider gap-2 shadow-sm"
          >
            <AlertOctagon className="w-4 h-4" />
            <span>Submit Conveyance to Sub-Registrar Rule Engine</span>
          </Button>

          {/* Pre-Validation Decision Summary Panel */}
          {transferStatus && (
            <div
              className={`p-5 rounded-xl border mt-4 space-y-4 ${transferStatus.status === "REJECTED"
                  ? "bg-rose-50 border-rose-200 text-rose-950"
                  : "bg-emerald-50 border-emerald-200 text-emerald-950"
                }`}
            >
              <div className="flex items-center justify-between border-b border-rose-200/60 pb-3">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-rose-100 text-rose-700">
                    <ShieldAlert className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="text-sm font-black tracking-wide uppercase">
                      {transferStatus.status === "REJECTED" ? "TRANSFER PROHIBITED BY RULE ENGINE" : "TRANSFER COMMITTED"}
                    </h3>
                    <p className="text-[11px] text-slate-600">{transferStatus.message}</p>
                  </div>
                </div>
                <Badge variant={transferStatus.status === "REJECTED" ? "danger" : "success"} size="md">
                  {transferStatus.status === "REJECTED" ? "FINAL DECISION: BLOCKED" : "FINAL DECISION: PERMITTED"}
                </Badge>
              </div>

              {/* 4 Rules Checked Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
                  <span className="text-[10px] text-slate-500 block font-bold uppercase">1. IDENTITY</span>
                  <span className="font-bold text-emerald-700 flex items-center gap-1 mt-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
                  <span className="text-[10px] text-slate-500 block font-bold uppercase">2. OWNERSHIP</span>
                  <span className="font-bold text-emerald-700 flex items-center gap-1 mt-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
                  <span className="text-[10px] text-slate-500 block font-bold uppercase">3. ENCUMBRANCE</span>
                  <span className="font-bold text-emerald-700 flex items-center gap-1 mt-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Clear
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
                  <span className="text-[10px] text-rose-700 block font-bold uppercase">4. COURT STATUS</span>
                  <span className="font-bold text-rose-600 flex items-center gap-1 mt-1">
                    <XCircle className="w-3.5 h-3.5" /> Active Injunction
                  </span>
                </div>
              </div>

              {/* Violations Details */}
              {transferStatus.transaction_record?.rule_violations && (
                <div className="p-3 rounded-lg bg-rose-100/70 border border-rose-300 text-[11px] font-mono text-rose-900 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-rose-700 block font-sans">
                    Judicial Stay Order Citation:
                  </span>
                  {transferStatus.transaction_record.rule_violations.map((v: string, i: number) => (
                    <div key={i}>• {v}</div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </Card>

      {/* Scenario B: Judicial Console — Issue Interim Injunction on Any Parcel */}
      <Card header="Scenario B: Judicial Console — Issue Court Injunction on Any Parcel">
        <div className="space-y-4 text-xs">
          <p className="text-slate-600">
            Simulate a Revenue Court issuing an injunction on a clean parcel (e.g. Plot 101). Once submitted, retry transferring Plot 101 in Scenario A to witness instant real-time blocking across the system.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1">
                Target ULPIN
              </label>
              <input
                type="text"
                value={dispUlpin}
                onChange={(e) => setDispUlpin(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 shadow-2xs"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1">
                Court Case Number
              </label>
              <input
                type="text"
                value={caseNo}
                onChange={(e) => setCaseNo(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs font-mono text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 shadow-2xs"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1">
                Adjudicating Authority
              </label>
              <input
                type="text"
                value={authority}
                onChange={(e) => setAuthority(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 shadow-2xs"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 uppercase tracking-wider mb-1">
                Petitioner Name
              </label>
              <input
                type="text"
                value={petitioner}
                onChange={(e) => setPetitioner(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 shadow-2xs"
              />
            </div>
          </div>

          <Button
            variant="secondary"
            onClick={handleInjectInjunction}
            loading={disputeLoading}
            className="w-full py-2.5 text-xs font-bold uppercase tracking-wider gap-2 bg-amber-600 hover:bg-amber-500 text-white border-none shadow-sm"
          >
            <Scale className="w-4 h-4" />
            <span>Commit Judicial Injunction Order to Land DPI Ledger</span>
          </Button>

          {disputeSuccessMsg && (
            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50 text-amber-950 text-xs flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-amber-600 flex-shrink-0" />
              <span className="font-semibold">{disputeSuccessMsg}</span>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}

export default function FraudPreventionPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400 text-xs">Loading Judicial Console...</div>}>
      <FraudPreventionContent />
    </Suspense>
  );
}
