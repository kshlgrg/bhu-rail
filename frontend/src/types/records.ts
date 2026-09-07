export type RightType = 
  | "FREEHOLD_OWNERSHIP" 
  | "POSSESSION" 
  | "LEASEHOLD" 
  | "GOVERNMENT_GRANT" 
  | "MORTGAGE_LIEN" 
  | "EASEMENT" 
  | "DEVELOPMENT_RIGHT";

export interface LandRight {
  right_id: string;
  ulpin: string;
  type: RightType;
  holder_name: string;
  holder_identity_hash: string;
  share_fraction: string;
  valid_from: string;
  valid_until?: string;
  issuing_authority: string;
  title_deed_doc_id: string;
  title_deed_hash: string;
  is_active: boolean;
}

export interface RegistrationRecord {
  registration_id: string;
  ulpin: string;
  registration_type: string;
  deed_document_id: string;
  deed_document_hash: string;
  buyer_name: string;
  seller_name: string;
  consideration_amount: number;
  registrar_office: string;
  status: "REGISTERED" | "PENDING_MUTATION" | "REJECTED";
  registration_date: string;
}

export interface EncumbranceRecord {
  encumbrance_id: string;
  ulpin: string;
  type: "BANK_MORTGAGE" | "REVENUE_TAX_LIEN" | "ACQUISITION_NOTICE" | "COURT_ATTACHMENT";
  institution_name: string;
  claim_amount_inr: number;
  date_registered: string;
  discharge_date?: string;
  reference_document_no: string;
  is_active: boolean;
  remarks?: string;
}

export interface LandUseZoningRecord {
  ulpin: string;
  land_use_category: string;
  zoning_category: string;
  permissible_far: number;
  building_height_limit_meters: number;
  is_acquisition_zone: boolean;
  is_flood_hazard_zone: boolean;
  environmental_clearance_required: boolean;
  source: string;
}

export interface MasterPlanRecord {
  ulpin: string;
  plan_reference: string;
  planning_authority: string;
  zone_category: string;
  development_status: string;
  restriction_notes?: string;
  plan_effective_date: string;
}

export interface BuildingPermissionRecord {
  permission_id: string;
  ulpin: string;
  application_number: string;
  authority: string;
  approval_status: "APPROVED" | "PENDING" | "REJECTED" | "EXPIRED";
  building_type: string;
  approved_far?: number;
  approved_area_sq_meters?: number;
  remarks?: string;
  permission_date: string;
  expiry_date?: string;
}

export interface PropertyTaxRecord {
  tax_record_id: string;
  ulpin: string;
  assessment_reference: string;
  assessment_year: string;
  tax_status: "PAID" | "OUTSTANDING" | "DISPUTED";
  annual_tax_amount: number;
  outstanding_amount: number;
  last_payment_date?: string;
  municipal_authority: string;
  payment_history?: {
    year: string;
    amount: number;
    receipt_no: string;
    paid_on: string;
    status: string;
  }[];
}

export interface UtilityRecord {
  utility_id: string;
  ulpin: string;
  utility_type: "ELECTRICITY" | "WATER_SUPPLY" | "SEWAGE" | "FIBER" | "GAS";
  provider_agency: string;
  connection_status: "ACTIVE" | "PENDING" | "DISCONNECTED";
  connection_reference: string;
  infrastructure_status: string;
  remarks?: string;
  last_inspected?: string;
}

export interface DocumentRecord {
  document_id: string;
  ulpin: string;
  name: string;
  category: "RoR" | "DEED" | "MORTGAGE" | "SURVEY" | "DISPUTE" | "TAX" | "BUILDING_PERMIT";
  issued_by: string;
  issued_date: string;
  doc_hash: string;
  verified: boolean;
  file_size: string;
  format: string;
}
