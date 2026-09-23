export const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface ParcelAsset {
  ulpin: string;
  asset_id: string;
  version: number;
  status: "ACTIVE" | "LOCKED_IN_TRANSFER" | "MUTATION_PENDING" | "FROZEN_BY_COURT" | "SUBDIVIDED" | "RETIRED";
  geometry: {
    type: string;
    coordinates: number[][][];
  };
  spatial: {
    crs: string;
    area_sq_meters: number;
    survey_number: string;
    sub_division_number?: string;
    village_code: string;
    centroid: [number, number];
    survey_date: string;
  };
  lineage: {
    parent_ulpins: string[];
    child_ulpins: string[];
    subdivision_timestamp?: string;
  };
  rights: Array<{
    right_id: string;
    type: string;
    holder_name: string;
    share_fraction: string;
    valid_from: string;
    issuing_authority: string;
    is_active: boolean;
  }>;
  encumbrances: Array<{
    encumbrance_id: string;
    type: string;
    institution_name: string;
    claim_amount_inr?: number;
    date_registered: string;
    reference_document_no: string;
    is_active: boolean;
  }>;
  disputes: Array<{
    dispute_id: string;
    type: string;
    status: string;
    case_number: string;
    adjudicating_authority: string;
    petitioner: string;
    respondent: string;
    claimed_area_sq_meters?: number;
    injunction_freeze_transfers: boolean;
    injunction_freeze_mortgage: boolean;
    remarks?: string;
  }>;
  zoning: {
    land_use_category: string;
    permissible_far: number;
  };
  state_hash: string;
}

export interface PropertyPassport {
  ulpin: string;
  asset_id: string;
  version: number;
  status: string;
  title_verified: boolean;
  active_mortgage_count: number;
  active_court_stay: boolean;
  tax_status_clear: boolean;
  land_use: string;
  building_permission_eligible: boolean;
  area_sq_meters: number;
  current_owners: string[];
  encumbrances: any[];
  active_disputes: any[];
  lineage: {
    parent_ulpins: string[];
    child_ulpins: string[];
  };
  geometry: {
    type: string;
    coordinates: number[][][];
  };
  centroid: [number, number];
  ledger_root_hash: string;
  last_state_transition: string;
  tamper_verified: boolean;
  passport_generated_at: string;
}

export interface TitleVerificationResponse {
  ulpin: string;
  query_timestamp: string;
  owner_verified: boolean;
  current_owners: string[];
  active_mortgage: boolean;
  active_court_restriction: boolean;
  tax_due: boolean;
  land_use_category: string;
  parcel_verified: boolean;
  transferrable: boolean;
  active_locks: string[];
  ledger_audit_status: string;
}

export async function fetchParcels(): Promise<ParcelAsset[]> {
  const res = await fetch(`${API_BASE}/v1/parcels`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch parcels");
  return res.json();
}

export async function fetchPassport(ulpin: string): Promise<PropertyPassport> {
  const res = await fetch(`${API_BASE}/v1/parcel/${encodeURIComponent(ulpin)}/passport`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch property passport");
  return res.json();
}

export async function verifyTitleStatus(ulpin: string): Promise<TitleVerificationResponse> {
  const res = await fetch(`${API_BASE}/v1/verification/title-status?ulpin=${encodeURIComponent(ulpin)}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Verification API error");
  return res.json();
}

export async function executeTransfer(payload: {
  ulpin: string;
  seller_identity_hash: string;
  buyer_name: string;
  buyer_identity_hash: string;
  sale_consideration_inr: number;
  deed_doc_hash: string;
}) {
  const res = await fetch(`${API_BASE}/v1/transaction/transfer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  return res.json();
}

export async function executeSubdivide(payload: {
  parent_ulpin: string;
  splitting_line_coordinates: number[][];
  child_owners: Array<{ owner_name: string; share: string }>;
  surveyor_license_no: string;
  revenue_officer_approval_id: string;
}) {
  const res = await fetch(`${API_BASE}/v1/parcel/subdivide`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Subdivision failed");
  }
  return res.json();
}

export async function fileDispute(payload: {
  ulpin: string;
  case_number: string;
  adjudicating_authority: string;
  petitioner: string;
  respondent: string;
  claimed_area_sq_meters: number;
  stay_order_doc_hash: string;
  freeze_transfer: boolean;
  freeze_mortgage: boolean;
}) {
  const res = await fetch(`${API_BASE}/v1/dispute/file`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Dispute filing failed");
  }
  return res.json();
}

export async function fetchLedgerHistory(ulpin: string) {
  const res = await fetch(`${API_BASE}/v1/ledger/${encodeURIComponent(ulpin)}/history`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch ledger history");
  return res.json();
}

export async function fetchLedgerAudit() {
  const res = await fetch(`${API_BASE}/v1/ledger/verify/audit`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to audit ledger");
  return res.json();
}
