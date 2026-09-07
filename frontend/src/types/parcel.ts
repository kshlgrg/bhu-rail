import { GeoPolygon } from "./common";

export type AssetStatus = 
  | "ACTIVE" 
  | "LOCKED_IN_TRANSFER" 
  | "MUTATION_PENDING" 
  | "FROZEN_BY_COURT" 
  | "SUBDIVIDED" 
  | "MERGED" 
  | "RETIRED";

export interface ParcelSpatial {
  area_sq_meters: number;
  survey_number: string;
  village_code: string;
  centroid: [number, number]; // [lat, lng]
  survey_date: string;
  accuracy_meters?: number;
}

export interface ParcelLineage {
  parent_ulpins: string[];
  child_ulpins: string[];
  subdivision_timestamp?: string;
  genealogy_depth: number;
}

export interface ParcelBasic {
  ulpin: string;
  asset_id: string;
  version: number;
  state_code: string;
  district: string;
  tehsil: string;
  village: string;
  survey_number: string;
  sub_division_number?: string;
  status: AssetStatus;
  geometry: GeoPolygon;
  spatial: ParcelSpatial;
  lineage: ParcelLineage;
  state_hash: string;
  created_at: string;
  updated_at: string;
  // Computed summary properties for quick display
  primary_owner?: string;
  land_use?: string;
  has_encumbrance?: boolean;
  has_dispute?: boolean;
}

export interface Parcel360Overview extends ParcelBasic {
  rights: import("./records").LandRight[];
  registrations: import("./records").RegistrationRecord[];
  encumbrances: import("./records").EncumbranceRecord[];
  disputes: import("./governance").DisputeRecord[];
  land_use_zoning: import("./records").LandUseZoningRecord;
  master_plan: import("./records").MasterPlanRecord;
  building_permissions: import("./records").BuildingPermissionRecord[];
  property_tax: import("./records").PropertyTaxRecord;
  utilities: import("./records").UtilityRecord[];
  documents: import("./records").DocumentRecord[];
  ledger_history: import("./governance").LedgerBlockRecord[];
}
