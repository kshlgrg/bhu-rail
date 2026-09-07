import { Parcel360Overview } from "../types/parcel";
import { MOCK_PARCELS } from "./parcels";
import { MOCK_ROR } from "./ror";
import { MOCK_REGISTRATIONS } from "./registrations";
import { MOCK_ENCUMBRANCES } from "./encumbrances";
import { MOCK_DISPUTES } from "./disputes";
import { MOCK_LAND_USE } from "./land-use";
import { MOCK_MASTER_PLANS } from "./master-plans";
import { MOCK_BUILDING_PERMISSIONS } from "./building-permissions";
import { MOCK_PROPERTY_TAX } from "./property-tax";
import { MOCK_UTILITIES } from "./utilities";
import { MOCK_DOCUMENTS } from "./documents";

export function getMockParcel360(ulpin: string): Parcel360Overview | undefined {
  const parcel = MOCK_PARCELS.find((p) => p.ulpin === ulpin);
  if (!parcel) return undefined;

  const rights = MOCK_ROR.filter((r) => r.ulpin === ulpin);
  const registrations = MOCK_REGISTRATIONS.filter((reg) => reg.ulpin === ulpin);
  const encumbrances = MOCK_ENCUMBRANCES.filter((e) => e.ulpin === ulpin);
  const disputes = MOCK_DISPUTES.filter((d) => d.ulpin === ulpin);
  const landUse = MOCK_LAND_USE.find((l) => l.ulpin === ulpin) || {
    ulpin,
    land_use_category: parcel.land_use || "RESIDENTIAL",
    zoning_category: "R-2",
    permissible_far: 1.75,
    building_height_limit_meters: 15.0,
    is_acquisition_zone: false,
    is_flood_hazard_zone: false,
    environmental_clearance_required: false,
    source: "Gurugram Master Plan 2031",
  };
  const masterPlan = MOCK_MASTER_PLANS.find((m) => m.ulpin === ulpin) || {
    ulpin,
    plan_reference: "GMDA-MP-2031",
    planning_authority: "GMDA",
    zone_category: "Urban Sector",
    development_status: "PLANNED",
    plan_effective_date: "2018-05-15",
  };
  const buildingPermissions = MOCK_BUILDING_PERMISSIONS.filter((b) => b.ulpin === ulpin);
  const propertyTax = MOCK_PROPERTY_TAX[ulpin] || {
    tax_record_id: `TAX-${parcel.survey_number}`,
    ulpin,
    assessment_reference: `PID-HR-${parcel.survey_number}`,
    assessment_year: "2024-2025",
    tax_status: "PAID",
    annual_tax_amount: 8500,
    outstanding_amount: 0,
    municipal_authority: "MCG Gurugram",
  };
  const utilities = MOCK_UTILITIES[ulpin] || [];
  const documents = MOCK_DOCUMENTS.filter((d) => d.ulpin === ulpin);

  const ledgerHistory = [
    {
      index: 1,
      timestamp: parcel.created_at,
      ulpin,
      transaction_id: `TX-GENESIS-${parcel.survey_number}`,
      event_type: "CREATE_PARCEL",
      previous_hash: "0".repeat(64),
      payload_hash: "8912efbc34890123ac782109234856aefbcde09871234567890abcdef1234567",
      state_after_transition_hash: parcel.state_hash,
      department_signatures: {
        "SURVEY_DEPARTMENT": "SIG_SUR_9912048123ef",
        "REVENUE_DEPARTMENT": "SIG_REV_881204891209",
      },
      block_hash: "2837190283719028371902837190283719028371902837190283719028371902",
      verified: true,
    }
  ];

  return {
    ...parcel,
    rights,
    registrations,
    encumbrances,
    disputes,
    land_use_zoning: landUse,
    master_plan: masterPlan,
    building_permissions: buildingPermissions,
    property_tax: propertyTax,
    utilities,
    documents,
    ledger_history: ledgerHistory,
  };
}
