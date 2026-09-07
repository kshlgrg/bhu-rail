"use client";

import React, { useState } from "react";
import { Parcel360Overview } from "../../types/parcel";
import { Tabs, TabItem } from "../ui/Tabs";
import { Card } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { DataTable } from "../ui/DataTable";
import { formatArea, formatCurrency, formatDate, formatDateTime } from "../../lib/formatters";
import { useAuth } from "../../context/AuthContext";
import {
  Info,
  UserCheck,
  FileCheck,
  ShieldAlert,
  Layers,
  Building2,
  Compass,
  Receipt,
  Zap,
  Scale,
  FolderOpen,
  Link as LinkIcon,
  CheckCircle2,
  AlertTriangle,
  Eye,
  ShieldCheck,
  CheckSquare,
  FileWarning,
  Database,
  ArrowRight,
} from "lucide-react";

export interface ParcelTabsProps {
  parcel: Parcel360Overview;
  defaultTab?: string;
}

export function ParcelTabs({ parcel, defaultTab = "overview" }: ParcelTabsProps) {
  const { role } = useAuth();
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [selectedDocPreview, setSelectedDocPreview] = useState<any | null>(null);

  const isCitizen = role === "citizen";

  // Tab definitions based on role
  const citizenTabs: TabItem[] = [
    { id: "overview", label: "Parcel Identity", icon: Info },
    { id: "ownership", label: "Ownership", icon: UserCheck, badge: parcel.rights?.length },
    { id: "land-info", label: "Land & Zoning", icon: Layers },
    { id: "property-status", label: "Property Status", icon: Receipt },
    { id: "documents", label: "Documents", icon: FolderOpen, badge: parcel.documents?.length },
    { id: "history", label: "History", icon: LinkIcon },
  ];

  const governmentTabs: TabItem[] = [
    { id: "overview", label: "Overview", icon: Info },
    { id: "ownership", label: "Ownership (RoR)", icon: UserCheck, badge: parcel.rights?.length },
    { id: "registration", label: "Registration", icon: FileCheck, badge: parcel.registrations?.length },
    { id: "encumbrance", label: "Encumbrance", icon: ShieldAlert, badge: parcel.encumbrances?.length },
    { id: "land-use", label: "Land Use", icon: Layers },
    { id: "zoning", label: "Zoning", icon: Building2 },
    { id: "planning", label: "Master Plan", icon: Compass },
    { id: "building", label: "Building Permits", icon: FileCheck, badge: parcel.building_permissions?.length },
    { id: "tax", label: "Property Tax", icon: Receipt },
    { id: "utilities", label: "Utilities", icon: Zap, badge: parcel.utilities?.length },
    { id: "disputes", label: "Disputes & Stays", icon: Scale, badge: parcel.disputes?.length },
    { id: "documents", label: "Documents", icon: FolderOpen, badge: parcel.documents?.length },
    { id: "audit", label: "Audit & Ledger", icon: LinkIcon },
  ];

  const activeTabsList = isCitizen ? citizenTabs : governmentTabs;

  return (
    <div className="space-y-4">
      <Tabs tabs={activeTabsList} activeTab={activeTab} onChange={setActiveTab} />

      <div className="pt-2">
        {/* ================= CITIZEN SIMPLIFIED VIEWS ================= */}

        {/* CITIZEN OVERVIEW / IDENTITY */}
        {activeTab === "overview" && isCitizen && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 space-y-4">
              <Card header="Parcel Identity & Spatial Summary">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-slate-500 font-bold block">ULPIN</span>
                    <span className="font-mono text-slate-900 font-bold text-xs">{parcel.ulpin}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-bold block">Survey Number</span>
                    <span className="text-slate-900 font-bold text-sm">{parcel.survey_number}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-bold block">Village</span>
                    <span className="text-slate-900 font-bold">{parcel.village}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-bold block">District</span>
                    <span className="text-slate-900 font-bold">{parcel.district}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-bold block">Total Area</span>
                    <span className="text-slate-900 font-bold">{formatArea(parcel.spatial.area_sq_meters)}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-bold block">Survey Date</span>
                    <span className="text-slate-900 font-bold">{formatDate(parcel.spatial.survey_date)}</span>
                  </div>
                </div>
              </Card>

              {/* Title Status Banner */}
              {parcel.disputes && parcel.disputes.length > 0 ? (
                <div className="p-4 rounded-xl border border-rose-200 bg-rose-50 text-rose-800 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-sm text-rose-900">
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                    <span>RESTRICTION DETECTED: Injunction Active</span>
                  </div>
                  <p className="text-xs leading-relaxed">
                    Court restriction recorded (Case {parcel.disputes[0].case_number}). Conveyance and mutation frozen by court order.
                  </p>
                </div>
              ) : parcel.encumbrances && parcel.encumbrances.some((e) => e.is_active) ? (
                <div className="p-4 rounded-xl border border-amber-200 bg-amber-50 text-amber-800 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-sm text-amber-900">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>ENCUMBRANCE: Mortgage Active</span>
                  </div>
                  <p className="text-xs leading-relaxed">
                    Active financial obligation registered in favor of State Bank of India. Conveyance requires Bank NOC.
                  </p>
                </div>
              ) : (
                <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-sm text-emerald-900">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>CLEAR PROPERTY TITLE</span>
                  </div>
                  <p className="text-xs leading-relaxed">
                    No active court restriction and no registered mortgage. Freehold title is in good standing under Haryana Land Records.
                  </p>
                </div>
              )}
            </div>

            {/* Right Card: Public Information */}
            <div className="space-y-4">
              <Card header="Public Registration Proof">
                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-slate-500 font-bold block text-[11px]">Cryptographic State Hash</span>
                    <span className="font-mono text-emerald-700 text-[11px] break-all block mt-0.5">
                      {parcel.state_hash}
                    </span>
                  </div>
                  <div className="pt-2 border-t border-slate-100 flex justify-between">
                    <span className="text-slate-500">Public Trust Ledger:</span>
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Verified
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Record Version:</span>
                    <span className="text-slate-900 font-bold">v{parcel.version}</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* CITIZEN OWNERSHIP */}
        {activeTab === "ownership" && (
          <Card header="Ownership & Title Holders">
            <DataTable
              columns={[
                { key: "holder_name", header: "Current Holder", render: (r) => <span className="font-bold text-slate-900">{r.holder_name}</span> },
                { key: "type", header: "Ownership Type", render: (r) => <Badge variant="success">{r.type}</Badge> },
                { key: "share_fraction", header: "Share Fraction", render: (r) => <span className="font-bold">{r.share_fraction}</span> },
                { key: "valid_from", header: "Valid Since", render: (r) => <span>{formatDate(r.valid_from)}</span> },
                { key: "issuing_authority", header: "Issuing Authority" },
              ]}
              data={parcel.rights || []}
              keyExtractor={(r) => r.right_id}
            />
          </Card>
        )}

        {/* CITIZEN LAND & ZONING */}
        {activeTab === "land-info" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card header="Land Use Classification">
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-500 block">Land Use Category</span>
                  <span className="font-bold text-base text-slate-900 mt-0.5 block">{parcel.land_use || "RESIDENTIAL"}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Statutory Source</span>
                  <span className="text-slate-700 font-medium">{parcel.land_use_zoning?.source || "Town & Country Planning Dept Haryana"}</span>
                </div>
              </div>
            </Card>

            <Card header="Zoning & Building Limits">
              <div className="space-y-3 text-xs">
                <div>
                  <span className="text-slate-500 block">Permissible FAR</span>
                  <span className="font-bold text-base text-slate-900 mt-0.5 block">{parcel.land_use_zoning?.permissible_far ?? 1.75}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Building Height Limit</span>
                  <span className="text-slate-700 font-bold">{parcel.land_use_zoning?.building_height_limit_meters ?? 15} meters</span>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* CITIZEN PROPERTY STATUS */}
        {activeTab === "property-status" && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card header="Encumbrance Status">
              <div className="space-y-2 text-xs">
                <Badge variant={parcel.encumbrances && parcel.encumbrances.some(e => e.is_active) ? "warning" : "success"}>
                  {parcel.encumbrances && parcel.encumbrances.some(e => e.is_active) ? "⚠ Mortgage Active" : "✓ No Active Mortgage"}
                </Badge>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  {parcel.encumbrances && parcel.encumbrances.some(e => e.is_active)
                    ? "Active financial obligation"
                    : "No registered mortgage"}
                </p>
              </div>
            </Card>

            <Card header="Dispute Status">
              <div className="space-y-2 text-xs">
                <Badge variant={parcel.disputes && parcel.disputes.length > 0 ? "danger" : "success"}>
                  {parcel.disputes && parcel.disputes.length > 0 ? "⚠ Injunction Active" : "✓ No Active Injunction"}
                </Badge>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  {parcel.disputes && parcel.disputes.length > 0
                    ? "Court restriction recorded"
                    : "No pending court restriction"}
                </p>
              </div>
            </Card>

            <Card header="Property Tax Status">
              <div className="space-y-2 text-xs">
                <Badge variant={parcel.property_tax?.tax_status === "PAID" ? "success" : "danger"}>
                  {parcel.property_tax?.tax_status === "PAID" ? "✓ Clear / Paid" : "⚠ Arrears Due"}
                </Badge>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  {parcel.property_tax?.tax_status === "PAID"
                    ? "Municipal property tax paid in full for current assessment cycle."
                    : `Arrears due: ${formatCurrency(parcel.property_tax?.outstanding_amount || 0)}`}
                </p>
              </div>
            </Card>
          </div>
        )}

        {/* CITIZEN & GOV SHARED: DOCUMENTS */}
        {activeTab === "documents" && (
          <Card header="Available Verified Documents">
            <DataTable
              columns={[
                { key: "name", header: "Document Title", render: (d) => <span className="font-bold text-slate-900">{d.name}</span> },
                { key: "category", header: "Category", render: (d) => <Badge variant="neutral">{d.category}</Badge> },
                { key: "issued_by", header: "Issuing Node" },
                { key: "issued_date", header: "Issued Date", render: (d) => <span>{formatDate(d.issued_date)}</span> },
                {
                  key: "actions",
                  header: "Actions",
                  render: (d) => (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setSelectedDocPreview(d)}
                        className="py-1 px-2.5 text-[11px] gap-1 font-semibold"
                      >
                        <Eye className="w-3 h-3 text-slate-500" />
                        <span>View</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => alert(`Verified Document Hash: ${d.doc_hash}\nStatus: Cryptographically VALID.`)}
                        className="py-1 px-2.5 text-[11px] gap-1 font-semibold text-emerald-700"
                      >
                        <ShieldCheck className="w-3 h-3" />
                        <span>Verify</span>
                      </Button>
                    </div>
                  ),
                },
              ]}
              data={parcel.documents || []}
              keyExtractor={(d) => d.document_id}
              emptyMessage="No documents found."
            />
          </Card>
        )}

        {/* CITIZEN HISTORY / PUBLIC LEDGER */}
        {activeTab === "history" && (
          <Card header="Publicly Viewable Parcel History">
            <div className="space-y-3">
              {parcel.ledger_history?.map((block) => (
                <div key={block.index} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="success">BLOCK #{block.index}</Badge>
                      <span className="font-bold text-slate-900 text-xs">{block.event_type}</span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-mono">{formatDateTime(block.timestamp)}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono pt-1">
                    <div className="p-2 rounded bg-white border border-slate-200">
                      <span className="text-slate-400 block text-[10px]">Previous Hash:</span>
                      <span className="text-slate-600 truncate block">{block.previous_hash}</span>
                    </div>
                    <div className="p-2 rounded bg-white border border-slate-200">
                      <span className="text-slate-400 block text-[10px]">Block Hash:</span>
                      <span className="text-emerald-700 font-bold truncate block">{block.block_hash}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* ================= GOVERNMENT DETAILED VIEWS ================= */}
        {!isCitizen && activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 space-y-4">
              <Card header="Government Cadastral & Administrative Master Profile">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-slate-500 font-bold block">ULPIN</span>
                    <span className="font-mono text-slate-900 font-bold">{parcel.ulpin}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-bold block">Asset ID</span>
                    <span className="font-mono text-slate-900 font-bold">{parcel.asset_id}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-bold block">Survey / Khasra No.</span>
                    <span className="text-slate-900 font-bold">{parcel.survey_number}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-bold block">Village / Tehsil</span>
                    <span className="text-slate-900 font-bold">{parcel.village}, {parcel.tehsil}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-bold block">Sub-Registrar Jurisdiction</span>
                    <span className="text-slate-900 font-bold">SR Sohna, Gurugram</span>
                  </div>
                  <div>
                    <span className="text-slate-500 font-bold block">Cadastral Area</span>
                    <span className="text-slate-900 font-bold">{formatArea(parcel.spatial.area_sq_meters)}</span>
                  </div>
                </div>
              </Card>

              {/* Data Sources & Consistency Check Card */}
              <Card header="Multi-Department Data Sources & Consistency Check">
                <div className="space-y-3 text-xs">
                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
                    <div className="flex items-center gap-2">
                      <Database className="w-4 h-4 text-emerald-700" />
                      <span className="font-bold text-emerald-900">Haryana Jamabandi (RoR)</span>
                    </div>
                    <Badge variant="success">MATCH (100%)</Badge>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
                    <div className="flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-emerald-700" />
                      <span className="font-bold text-emerald-900">Sub-Registrar Deed Archive</span>
                    </div>
                    <Badge variant="success">MATCH (100%)</Badge>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-blue-700" />
                      <span className="font-bold text-slate-900">GMDA Master Plan 2031</span>
                    </div>
                    <Badge variant="info">SYNCHRONIZED</Badge>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Column: Gov Controls */}
            <div className="space-y-4">
              <Card header="Administrative Quick Actions">
                <div className="space-y-2">
                  <Button
                    size="sm"
                    className="w-full justify-start gap-2 font-semibold"
                    onClick={() => alert(`Verification stamp signed for ${parcel.ulpin}`)}
                  >
                    <CheckSquare className="w-3.5 h-3.5" />
                    <span>Approve Title Verification</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full justify-start gap-2 text-rose-700 hover:text-rose-800 hover:bg-rose-50 border-rose-200 font-semibold"
                    onClick={() => alert(`Discrepancy notice flagged for ${parcel.ulpin}`)}
                  >
                    <FileWarning className="w-3.5 h-3.5" />
                    <span>Flag Boundary Discrepancy</span>
                  </Button>
                </div>
              </Card>

              <Card header="Cryptographic Integrity">
                <div className="space-y-2 text-xs">
                  <span className="text-slate-500 font-bold block text-[10px] uppercase">State Hash</span>
                  <span className="font-mono text-emerald-700 text-[11px] break-all block">
                    {parcel.state_hash}
                  </span>
                  <div className="pt-2 border-t border-slate-100 flex justify-between">
                    <span className="text-slate-500">GPS Accuracy:</span>
                    <span className="font-bold text-slate-800">±{parcel.spatial.accuracy_meters}m</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* GOV REGISTRATION */}
        {!isCitizen && activeTab === "registration" && (
          <Card header="Sub-Registrar Conveyance & Deed Records">
            <DataTable
              columns={[
                { key: "registration_id", header: "Registration ID", render: (reg) => <span className="font-mono font-bold text-slate-900">{reg.registration_id}</span> },
                { key: "registration_type", header: "Type", render: (reg) => <Badge variant="info">{reg.registration_type}</Badge> },
                { key: "registration_date", header: "Date", render: (reg) => <span>{formatDate(reg.registration_date)}</span> },
                { key: "buyer_name", header: "Buyer", render: (reg) => <span className="font-bold text-slate-900">{reg.buyer_name}</span> },
                { key: "seller_name", header: "Seller", render: (reg) => <span>{reg.seller_name}</span> },
                { key: "consideration_amount", header: "Amount", render: (reg) => <span className="font-mono font-bold">{formatCurrency(reg.consideration_amount)}</span> },
                { key: "status", header: "Status", render: (reg) => <Badge variant="success">{reg.status}</Badge> },
              ]}
              data={parcel.registrations || []}
              keyExtractor={(reg) => reg.registration_id}
            />
          </Card>
        )}

        {/* GOV ENCUMBRANCE */}
        {!isCitizen && activeTab === "encumbrance" && (
          <Card header="Active & Historical Encumbrances">
            <DataTable
              columns={[
                { key: "encumbrance_id", header: "Encumbrance ID", render: (e) => <span className="font-mono font-bold text-slate-900">{e.encumbrance_id}</span> },
                { key: "institution_name", header: "Lending Bank / Agency", render: (e) => <span className="font-bold text-slate-900">{e.institution_name}</span> },
                { key: "claim_amount_inr", header: "Amount", render: (e) => <span className="font-mono font-bold text-amber-700">{formatCurrency(e.claim_amount_inr)}</span> },
                { key: "date_registered", header: "Date Registered", render: (e) => <span>{formatDate(e.date_registered)}</span> },
                {
                  key: "is_active",
                  header: "Status",
                  render: (e) => (
                    <Badge variant={e.is_active ? "warning" : "success"}>
                      {e.is_active ? "⚠ Mortgage Active" : "✓ No Active Mortgage"}
                    </Badge>
                  ),
                },
                { key: "remarks", header: "Remarks", render: (e) => <span className="text-slate-500 text-xs">{e.remarks}</span> },
              ]}
              data={parcel.encumbrances || []}
              keyExtractor={(e) => e.encumbrance_id}
              emptyMessage="No encumbrances found on record."
            />
          </Card>
        )}

        {/* GOV LAND USE */}
        {!isCitizen && activeTab === "land-use" && (
          <Card header="Statutory Land Use Classification">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 font-bold block">Current Statutory Category</span>
                <span className="text-base font-extrabold text-emerald-700 mt-1 block">{parcel.land_use_zoning?.land_use_category}</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 font-bold block">Zoning Code</span>
                <span className="text-base font-extrabold text-slate-900 mt-1 block">{parcel.land_use_zoning?.zoning_category}</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 font-bold block">Statutory Source</span>
                <span className="text-slate-800 font-medium mt-1 block">{parcel.land_use_zoning?.source}</span>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 font-bold block">Acquisition Status</span>
                <span className="text-emerald-700 font-bold mt-1 block">Not under government acquisition</span>
              </div>
            </div>
          </Card>
        )}

        {/* GOV ZONING */}
        {!isCitizen && activeTab === "zoning" && (
          <Card header="Development Regulations & Zoning Controls">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-4">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 font-bold block">Permissible FAR</span>
                <span className="text-xl font-black text-slate-900 mt-0.5 block">{parcel.land_use_zoning?.permissible_far}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 font-bold block">Max Height Limit</span>
                <span className="text-xl font-black text-slate-900 mt-0.5 block">{parcel.land_use_zoning?.building_height_limit_meters} meters</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 font-bold block">Flood Hazard Zone</span>
                <span className="text-emerald-700 font-bold mt-0.5 block">Zone 0 (Safe)</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 font-bold block">Environmental Clearance</span>
                <span className="text-slate-700 font-bold mt-0.5 block">Not Required</span>
              </div>
            </div>
          </Card>
        )}

        {/* GOV PLANNING */}
        {!isCitizen && activeTab === "planning" && (
          <Card header="GMDA Master Plan 2031 Integration">
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between">
                <span className="text-slate-500 font-bold">Plan Reference:</span>
                <span className="font-mono font-bold text-slate-900">{parcel.master_plan?.plan_reference}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between">
                <span className="text-slate-500 font-bold">Planning Authority:</span>
                <span className="font-bold text-slate-800">{parcel.master_plan?.planning_authority}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between">
                <span className="text-slate-500 font-bold">Development Status:</span>
                <Badge variant="info">{parcel.master_plan?.development_status}</Badge>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-slate-500 font-bold block mb-1">Statutory Setback & Alignment Notes:</span>
                <p className="text-slate-700 leading-relaxed">{parcel.master_plan?.restriction_notes}</p>
              </div>
            </div>
          </Card>
        )}

        {/* GOV BUILDING PERMISSIONS */}
        {!isCitizen && activeTab === "building" && (
          <Card header="Municipal Building Permissions & Sanctions">
            <DataTable
              columns={[
                { key: "permission_id", header: "Permission ID", render: (b) => <span className="font-mono font-bold text-slate-900">{b.permission_id}</span> },
                { key: "building_type", header: "Project Type", render: (b) => <span className="font-bold text-slate-900">{b.building_type}</span> },
                { key: "authority", header: "Sanctioning Authority" },
                {
                  key: "approval_status",
                  header: "Status",
                  render: (b) => (
                    <Badge variant={b.approval_status === "APPROVED" ? "success" : b.approval_status === "PENDING" ? "warning" : "danger"}>
                      {b.approval_status === "APPROVED" ? "✓ Approved" : b.approval_status === "PENDING" ? "⏱ Pending Approval" : "✗ Rejected"}
                    </Badge>
                  ),
                },
                { key: "approved_area_sq_meters", header: "Approved Area", render: (b) => <span>{b.approved_area_sq_meters ? `${b.approved_area_sq_meters} m²` : "—"}</span> },
                { key: "remarks", header: "Remarks", render: (b) => <span className="text-slate-500 text-xs">{b.remarks}</span> },
              ]}
              data={parcel.building_permissions || []}
              keyExtractor={(b) => b.permission_id}
              emptyMessage="No building permissions on record."
            />
          </Card>
        )}

        {/* GOV TAX */}
        {!isCitizen && activeTab === "tax" && (
          <div className="space-y-4">
            <Card header="Municipal Property Tax Assessment">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs mb-4">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 font-bold block">Assessment ID</span>
                  <span className="font-mono font-bold text-slate-900 mt-0.5 block">{parcel.property_tax?.assessment_reference}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 font-bold block">Assessment Year</span>
                  <span className="font-extrabold text-slate-900 mt-0.5 block">{parcel.property_tax?.assessment_year}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 font-bold block">Annual Tax</span>
                  <span className="font-mono font-bold text-slate-900 mt-0.5 block">{formatCurrency(parcel.property_tax?.annual_tax_amount || 0)}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 font-bold block">Tax Status</span>
                  <span className="mt-0.5 block">
                    <Badge variant={parcel.property_tax?.tax_status === "PAID" ? "success" : "danger"}>
                      {parcel.property_tax?.tax_status} {parcel.property_tax?.outstanding_amount ? `(${formatCurrency(parcel.property_tax.outstanding_amount)} DUE)` : ""}
                    </Badge>
                  </span>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* GOV UTILITIES */}
        {!isCitizen && activeTab === "utilities" && (
          <Card header="Infrastructure & Public Utilities Connections">
            <DataTable
              columns={[
                { key: "utility_type", header: "Utility", render: (u) => <Badge variant="info">{u.utility_type}</Badge> },
                { key: "provider_agency", header: "Provider Agency", render: (u) => <span className="font-bold text-slate-900">{u.provider_agency}</span> },
                { key: "connection_status", header: "Status", render: (u) => <Badge variant={u.connection_status === "ACTIVE" ? "success" : "warning"}>{u.connection_status}</Badge> },
                { key: "connection_reference", header: "Consumer Account No", render: (u) => <span className="font-mono font-bold">{u.connection_reference}</span> },
                { key: "infrastructure_status", header: "Grid Status", render: (u) => <span className="text-slate-600 text-xs">{u.infrastructure_status}</span> },
              ]}
              data={parcel.utilities || []}
              keyExtractor={(u) => u.utility_id}
              emptyMessage="No utility connections mapped."
            />
          </Card>
        )}

        {/* GOV DISPUTES */}
        {!isCitizen && activeTab === "disputes" && (
          <Card header="Judicial Disputes & Court Injunction Registry">
            <DataTable
              columns={[
                { key: "case_number", header: "Case No", render: (d) => <span className="font-mono font-bold text-slate-900">{d.case_number}</span> },
                { key: "type", header: "Dispute Type", render: (d) => <Badge variant="danger">{d.type}</Badge> },
                { key: "adjudicating_authority", header: "Court / Authority" },
                { key: "petitioner", header: "Petitioner", render: (d) => <span className="font-medium text-slate-800">{d.petitioner}</span> },
                { key: "respondent", header: "Respondent", render: (d) => <span className="font-medium text-slate-800">{d.respondent}</span> },
                {
                  key: "injunction_freeze_transfers",
                  header: "Transfer Freeze",
                  render: (d) => (
                    <Badge variant={d.injunction_freeze_transfers ? "danger" : "success"}>
                      {d.injunction_freeze_transfers ? "⚠ Injunction Active" : "✓ No Active Injunction"}
                    </Badge>
                  ),
                },
                { key: "date_filed", header: "Filed Date", render: (d) => <span>{formatDate(d.date_filed)}</span> },
              ]}
              data={parcel.disputes || []}
              keyExtractor={(d) => d.dispute_id}
              emptyMessage="No active civil suits or revenue court stays on record."
            />
          </Card>
        )}

        {/* GOV AUDIT */}
        {!isCitizen && activeTab === "audit" && (
          <Card header="Cryptographic Audit Trail & Provenance Chain">
            <div className="space-y-3">
              {parcel.ledger_history?.map((block) => (
                <div key={block.index} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="success">BLOCK #{block.index}</Badge>
                      <span className="font-bold text-slate-900 text-xs">{block.event_type}</span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-mono">{formatDateTime(block.timestamp)}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono pt-1">
                    <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                      <span className="text-slate-400 block text-[10px]">Previous Block Hash:</span>
                      <span className="text-slate-600 truncate block">{block.previous_hash}</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                      <span className="text-slate-400 block text-[10px]">Block Hash:</span>
                      <span className="text-emerald-700 font-bold truncate block">{block.block_hash}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>

      {/* Document Preview Modal */}
      {selectedDocPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">{selectedDocPreview.name}</h3>
              <Badge variant="success">Authentic</Badge>
            </div>
            <div className="space-y-2 text-xs text-slate-600">
              <p><strong>Document ID:</strong> <span className="font-mono">{selectedDocPreview.document_id}</span></p>
              <p><strong>Issuing Node:</strong> {selectedDocPreview.issued_by}</p>
              <p><strong>Issued Date:</strong> {formatDate(selectedDocPreview.issued_date)}</p>
              <p><strong>File Size:</strong> {selectedDocPreview.file_size}</p>
              <p><strong>SHA-256 Hash:</strong> <span className="font-mono text-[10px] break-all text-emerald-700">{selectedDocPreview.doc_hash}</span></p>
            </div>
            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
              <Button size="sm" variant="secondary" onClick={() => setSelectedDocPreview(null)}>
                Close Preview
              </Button>
              <Button size="sm" onClick={() => alert("Downloading certified copy with digital signature...")}>
                Download Certified Copy
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
