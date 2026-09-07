import {
  LandRight,
  RegistrationRecord,
  EncumbranceRecord,
  LandUseZoningRecord,
  BuildingPermissionRecord,
  PropertyTaxRecord,
  DocumentRecord,
} from "../../types/records";
import { MOCK_ROR } from "../../data/ror";
import { MOCK_REGISTRATIONS } from "../../data/registrations";
import { MOCK_ENCUMBRANCES } from "../../data/encumbrances";
import { MOCK_LAND_USE } from "../../data/land-use";
import { MOCK_BUILDING_PERMISSIONS } from "../../data/building-permissions";
import { MOCK_PROPERTY_TAX } from "../../data/property-tax";
import { MOCK_DOCUMENTS } from "../../data/documents";

export async function getAllRoR(): Promise<LandRight[]> {
  await new Promise((r) => setTimeout(r, 100));
  return MOCK_ROR;
}

export async function getAllRegistrations(): Promise<RegistrationRecord[]> {
  await new Promise((r) => setTimeout(r, 100));
  return MOCK_REGISTRATIONS;
}

export async function getAllEncumbrances(): Promise<EncumbranceRecord[]> {
  await new Promise((r) => setTimeout(r, 100));
  return MOCK_ENCUMBRANCES;
}

export async function getAllLandUse(): Promise<LandUseZoningRecord[]> {
  await new Promise((r) => setTimeout(r, 100));
  return MOCK_LAND_USE;
}

export async function getAllBuildingPermissions(): Promise<BuildingPermissionRecord[]> {
  await new Promise((r) => setTimeout(r, 100));
  return MOCK_BUILDING_PERMISSIONS;
}

export async function getAllPropertyTaxes(): Promise<PropertyTaxRecord[]> {
  await new Promise((r) => setTimeout(r, 100));
  return Object.values(MOCK_PROPERTY_TAX);
}

export async function getAllDocuments(): Promise<DocumentRecord[]> {
  await new Promise((r) => setTimeout(r, 100));
  return MOCK_DOCUMENTS;
}
