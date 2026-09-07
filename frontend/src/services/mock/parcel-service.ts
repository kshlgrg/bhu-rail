import { ParcelBasic, Parcel360Overview } from "../../types/parcel";
import { MOCK_PARCELS } from "../../data/parcels";
import { getMockParcel360 } from "../../data/parcel-details";
import { siteConfig } from "../../config/site";

export async function getAllParcels(): Promise<ParcelBasic[]> {
  // Simulate minimal async delay
  await new Promise((r) => setTimeout(r, 100));
  return MOCK_PARCELS;
}

export async function getParcelByUlpin(ulpin: string): Promise<ParcelBasic | null> {
  await new Promise((r) => setTimeout(r, 100));
  const found = MOCK_PARCELS.find((p) => p.ulpin === ulpin);
  return found || null;
}

export async function getParcel360(ulpin: string): Promise<Parcel360Overview | null> {
  await new Promise((r) => setTimeout(r, 150));
  const overview = getMockParcel360(ulpin);
  return overview || null;
}

export async function searchParcels(query: string): Promise<ParcelBasic[]> {
  await new Promise((r) => setTimeout(r, 100));
  if (!query || !query.trim()) return MOCK_PARCELS;
  const q = query.toLowerCase().trim();

  return MOCK_PARCELS.filter(
    (p) =>
      p.ulpin.toLowerCase().includes(q) ||
      p.survey_number.toLowerCase().includes(q) ||
      (p.primary_owner && p.primary_owner.toLowerCase().includes(q)) ||
      p.village.toLowerCase().includes(q)
  );
}

export async function getMyLandParcels(): Promise<ParcelBasic[]> {
  await new Promise((r) => setTimeout(r, 100));
  // Returns citizen's owned property (Plot 101 for Suresh Chandra Yadav)
  return MOCK_PARCELS.filter((p) => p.ulpin === siteConfig.demoCitizen.primaryUlpin);
}
