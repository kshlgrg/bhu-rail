// ============================================================
// Bhu-Rail Land DPI — Frontend API Client
// Typed HTTP client for all FastAPI backend endpoints.
// All pages/components import types and fetch helpers from here.
// ============================================================

export const API_BASE = "http://localhost:8000";

// ─────────────────────────────────────────────
// Types mirroring Pydantic models from backend
// ─────────────────────────────────────────────

export interface LandRight {
  right_id: string;
  type: string;
  holder_name: string;
  holder_identity_hash: string;
  share_fraction: string;
  valid_from: string;
  valid_until?: string | null;
  issuing_authority: string;
  title_deed_doc_id?: string | null;
  title_deed_hash?: string | null;
  is_active: boolean;
}

export interface Encumbrance {
  encumbrance_id: string;
  type: string;
  institution_name: string;
  claim_amount_inr?: number | null;
  date_registered: string;
  discharge_date?: string | null;
  reference_document_no: string;
  is_active: boolean;
  remarks?: string | null;
}

export interface Dispute {
  dispute_id: string;
  type: string;
  status: string;
  case_number: string;
  adjudicating_authority: string;
  petitioner: string;
  respondent: string;
  claimed_area_sq_meters?: number | null;
  injunction_freeze_transfers: boolean;
  injunction_freeze_mortgage: boolean;
  date_filed: string;
  last_hearing_date?: string | null;
  stay_order_doc_hash: string;
  remarks?: string | null;
}

export interface SpatialMetadata {
  crs: string;
  area_sq_meters: number;
  survey_number: string;
  sub_division_number?: string | null;
  village_code: string;
  centroid: [number, number]; // [lng, lat]
  accuracy_meters: number;
  survey_date: string;
}

export interface GeoJSONGeometry {
  type: string;
  coordinates: number[][][];
}

export interface ParcelLineage {
  parent_ulpins: string[];
  child_ulpins: string[];
  subdivision_timestamp?: string | null;
  genealogy_depth: number;
}

export interface ZoningMetadata {
  land_use_category: string;
  permissible_far: number;
  building_height_limit_meters: number;
  is_acquisition_zone: boolean;
  is_flood_hazard_zone: boolean;
  environmental_clearance_required: boolean;
}

export interface ParcelAsset {
  ulpin: string;
  asset_id: string;
  version: number;
  state_code: string;
  district: string;
  tehsil: string;
  village: string;
  status: string;
  geometry: GeoJSONGeometry;
  spatial: SpatialMetadata;
  lineage: ParcelLineage;
  rights: LandRight[];
  encumbrances: Encumbrance[];
  disputes: Dispute[];
  zoning: ZoningMetadata;
  state_hash: string;
  created_at: string;
  updated_at: string;
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
  encumbrances: Encumbrance[];
  active_disputes: Dispute[];
  lineage: ParcelLineage;
  geometry: GeoJSONGeometry;
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

export interface TransactionRecord {
  transaction_id: string;
  type: string;
  target_ulpin: string;
  status: string;
  initiated_at: string;
  completed_at?: string | null;
  completed_steps: string[];
  pending_steps: string[];
  department_signatures: Record<string, string>;
  rule_violations: string[];
  resulting_asset_version?: number | null;
  resulting_ulpins: string[];
  ledger_block_index?: number | null;
}

export interface TransferResponse {
  status: "COMMITTED" | "REJECTED";
  message: string;
  transaction_record?: TransactionRecord | null;
}

export interface SubdivisionResponse {
  status: string;
  message: string;
  transaction_record?: TransactionRecord;
}

export interface DisputeResponse {
  status: string;
  message: string;
  dispute?: Dispute;
}

export interface AuditVerificationResult {
  ulpin: string;
  is_valid: boolean;
  total_blocks: number;
  verified_blocks: number;
  genesis_timestamp: string;
  latest_block_hash: string;
  tamper_detected_at_block?: number | null;
  audit_notes: string[];
}

// ─────────────────────────────────────────────
// API Fetch Helpers
// ─────────────────────────────────────────────

/** Fetch all cadastral parcel assets from the registry. */
export async function fetchParcels(): Promise<ParcelAsset[]> {
  const res = await fetch(`${API_BASE}/v1/parcels`, { cache: "no-store" });
  if (!res.ok) throw new Error(`fetchParcels failed: ${res.status}`);
  return res.json();
}

/** Fetch the canonical Property Passport for a given ULPIN. */
export async function fetchPassport(ulpin: string): Promise<PropertyPassport> {
  const res = await fetch(`${API_BASE}/v1/parcel/${encodeURIComponent(ulpin)}/passport`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`fetchPassport failed: ${res.status}`);
  return res.json();
}

/** Land UPI verification rail — instant title & collateral check. */
export async function verifyTitleStatus(ulpin: string): Promise<TitleVerificationResponse> {
  const res = await fetch(
    `${API_BASE}/v1/verification/title-status?ulpin=${encodeURIComponent(ulpin)}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error(`verifyTitleStatus failed: ${res.status}`);
  return res.json();
}

/** Execute a property ownership transfer. Returns COMMITTED or REJECTED. */
export async function executeTransfer(payload: {
  ulpin: string;
  seller_identity_hash: string;
  buyer_name: string;
  buyer_identity_hash: string;
  sale_consideration_inr: number;
  deed_doc_hash: string;
  sub_registrar_office_code?: string;
}): Promise<TransferResponse> {
  const res = await fetch(`${API_BASE}/v1/transaction/transfer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`executeTransfer failed: ${res.status}`);
  return res.json();
}

/** Spatial subdivision of a parent parcel into children. */
export async function executeSubdivide(payload: {
  parent_ulpin: string;
  splitting_line_coordinates: number[][];
  child_owners: { owner_name: string; share: string }[];
  surveyor_license_no: string;
  revenue_officer_approval_id: string;
}): Promise<SubdivisionResponse> {
  const res = await fetch(`${API_BASE}/v1/parcel/subdivide`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || `executeSubdivide failed: ${res.status}`);
  }
  return res.json();
}

/** File a court dispute / judicial injunction on a parcel. */
export async function fileDispute(payload: {
  ulpin: string;
  type?: string;
  case_number: string;
  adjudicating_authority: string;
  petitioner: string;
  respondent: string;
  claimed_area_sq_meters?: number;
  stay_order_doc_hash: string;
  freeze_transfer?: boolean;
  freeze_mortgage?: boolean;
}): Promise<DisputeResponse> {
  const res = await fetch(`${API_BASE}/v1/dispute/file`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail || `fileDispute failed: ${res.status}`);
  }
  return res.json();
}

/** Fetch the full global ledger audit result. */
export async function fetchLedgerAudit(ulpin?: string): Promise<AuditVerificationResult> {
  const url = ulpin
    ? `${API_BASE}/v1/ledger/verify/audit?ulpin=${encodeURIComponent(ulpin)}`
    : `${API_BASE}/v1/ledger/verify/audit`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`fetchLedgerAudit failed: ${res.status}`);
  return res.json();
}
