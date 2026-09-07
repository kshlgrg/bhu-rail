import { ParcelBasic } from "../types/parcel";
import { MOCK_PARCELS } from "./parcels";

export type SearchTypeCategory = "ulpin" | "survey" | "owner" | "khasra" | "agricultural";

export interface DemoSearchScenario {
  id: string;
  scenarioNumber: number;
  scenarioTitle: string;
  primaryValue: string;
  searchType: "ULPIN" | "Survey Number" | "Owner Name" | "Khasra Number";
  searchTypeCategory: SearchTypeCategory;
  location: string;
  statusBadge: {
    label: string;
    variant: "success" | "warning" | "danger" | "info" | "emerald";
    colorClass: string;
  };
  ulpin: string;
  surveyNumber: string;
  khasraNumber?: string;
  owner: string;
  areaFormatted: string;
  areaSqMeters: number;
  landUse: string;
  // Specific Scenario Metadata
  mortgageInfo?: {
    bank: string;
    amount: string;
    status: string;
    refNo: string;
  };
  restrictionInfo?: {
    status: string;
    transferability: "BLOCKED" | "PERMITTED" | "CONDITIONAL";
    reason: string;
    court: string;
    caseNumber: string;
  };
  verificationInfo?: {
    isVerified: boolean;
    certifiedBy: string;
    cadastralAccuracy: string;
  };
}

export const RECENT_DEMO_SEARCHES: DemoSearchScenario[] = [
  {
    id: "demo-search-1",
    scenarioNumber: 1,
    scenarioTitle: "Clean Parcel",
    primaryValue: "IN-HR-GGM-KDP-0101-0000",
    searchType: "ULPIN",
    searchTypeCategory: "ulpin",
    location: "Kadarpur, Gurugram",
    statusBadge: {
      label: "CLEAR",
      variant: "success",
      colorClass: "bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-600/20",
    },
    ulpin: "IN-HR-GGM-KDP-0101-0000",
    surveyNumber: "101",
    khasraNumber: "KDP-004/101",
    owner: "Suresh Chandra Yadav",
    areaFormatted: "1,850 m²",
    areaSqMeters: 1850.5,
    landUse: "Residential",
    verificationInfo: {
      isVerified: true,
      certifiedBy: "Surveyor General of Haryana (Kadarpur Cluster)",
      cadastralAccuracy: "±0.05m RTK-DGPS",
    },
  },
  {
    id: "demo-search-2",
    scenarioNumber: 2,
    scenarioTitle: "Mortgaged Parcel",
    primaryValue: "Survey No. 102",
    searchType: "Survey Number",
    searchTypeCategory: "survey",
    location: "Kadarpur, Gurugram",
    statusBadge: {
      label: "ACTIVE MORTGAGE",
      variant: "warning",
      colorClass: "bg-amber-50 text-amber-800 border-amber-200 ring-amber-600/20",
    },
    ulpin: "IN-HR-GGM-KDP-0102-0000",
    surveyNumber: "102",
    khasraNumber: "KDP-004/102",
    owner: "Neha Verma",
    areaFormatted: "2,400 m²",
    areaSqMeters: 2400.0,
    landUse: "Commercial",
    mortgageInfo: {
      bank: "SBI",
      amount: "₹45,00,000",
      status: "ACTIVE MORTGAGE",
      refNo: "SBI/MORT/2022/9912",
    },
  },
  {
    id: "demo-search-3",
    scenarioNumber: 3,
    scenarioTitle: "Court Restriction",
    primaryValue: "Rajesh Sharma",
    searchType: "Owner Name",
    searchTypeCategory: "owner",
    location: "Kadarpur, Gurugram",
    statusBadge: {
      label: "COURT RESTRICTION",
      variant: "danger",
      colorClass: "bg-rose-50 text-rose-700 border-rose-200 ring-rose-600/20",
    },
    ulpin: "IN-HR-GGM-KDP-0104-0000",
    surveyNumber: "104",
    khasraNumber: "KDP-004/104",
    owner: "Rajesh Sharma",
    areaFormatted: "3,100 m²",
    areaSqMeters: 3100.0,
    landUse: "Agricultural",
    restrictionInfo: {
      status: "COURT RESTRICTION",
      transferability: "BLOCKED",
      reason: "Active court injunction",
      court: "Court of SDM (Revenue Court) Sohna",
      caseNumber: "REV/COURT/SOHNA/2024/771",
    },
  },
  {
    id: "demo-search-4",
    scenarioNumber: 4,
    scenarioTitle: "Agricultural Parcel",
    primaryValue: "Survey No. 108",
    searchType: "Survey Number",
    searchTypeCategory: "agricultural",
    location: "Kadarpur, Gurugram",
    statusBadge: {
      label: "AGRICULTURAL",
      variant: "emerald",
      colorClass: "bg-emerald-50 text-emerald-800 border-emerald-300 ring-emerald-600/20",
    },
    ulpin: "IN-HR-GGM-KDP-0108-0000",
    surveyNumber: "108",
    khasraNumber: "KDP-004/108",
    owner: "Sardar Balwant Singh",
    areaFormatted: "10,000 m²",
    areaSqMeters: 10000.0,
    landUse: "Agricultural",
    verificationInfo: {
      isVerified: true,
      certifiedBy: "Kadarpur Revenue Circle",
      cadastralAccuracy: "±0.05m PostGIS",
    },
  },
  {
    id: "demo-search-5",
    scenarioNumber: 5,
    scenarioTitle: "Verified Residential Parcel",
    primaryValue: "IN-HR-GGM-KDP-0103-0000",
    searchType: "ULPIN",
    searchTypeCategory: "ulpin",
    location: "Kadarpur, Gurugram",
    statusBadge: {
      label: "VERIFIED",
      variant: "info",
      colorClass: "bg-blue-50 text-blue-700 border-blue-200 ring-blue-600/20",
    },
    ulpin: "IN-HR-GGM-KDP-0103-0000",
    surveyNumber: "103",
    khasraNumber: "KDP-004/103",
    owner: "Amitabh Sen",
    areaFormatted: "1,900 m²",
    areaSqMeters: 1900.0,
    landUse: "Residential",
    verificationInfo: {
      isVerified: true,
      certifiedBy: "Haryana Jamabandi Authority",
      cadastralAccuracy: "±0.05m DGPS-Certified",
    },
  },
];

/**
 * Filter and format demo search options dynamically based on user typed text.
 * When typing, formats the record with the most relevant matched field as the primary value.
 */
export function getMatchingDemoSearches(query: string): DemoSearchScenario[] {
  if (!query || !query.trim()) {
    return RECENT_DEMO_SEARCHES;
  }

  const q = query.toLowerCase().trim();

  // Filter matching scenarios
  const matched = RECENT_DEMO_SEARCHES.filter((scenario) => {
    return (
      scenario.ulpin.toLowerCase().includes(q) ||
      scenario.surveyNumber.toLowerCase().includes(q) ||
      scenario.owner.toLowerCase().includes(q) ||
      (scenario.khasraNumber && scenario.khasraNumber.toLowerCase().includes(q)) ||
      scenario.landUse.toLowerCase().includes(q) ||
      scenario.statusBadge.label.toLowerCase().includes(q) ||
      scenario.scenarioTitle.toLowerCase().includes(q)
    );
  });

  // Dynamically tailor the primary value and searchType to best match what the user typed
  return matched.map((scenario) => {
    // If user typed part of ULPIN (e.g. "0104", "0101", "IN-HR")
    if (scenario.ulpin.toLowerCase().includes(q) && !scenario.owner.toLowerCase().includes(q) && !scenario.surveyNumber.toLowerCase().includes(q)) {
      return {
        ...scenario,
        primaryValue: scenario.ulpin,
        searchType: "ULPIN" as const,
        searchTypeCategory: "ulpin" as const,
        secondaryText: `${scenario.owner} · ${scenario.location}`,
      };
    }

    // If user typed part of Owner Name (e.g. "Rajesh", "Neha", "Suresh", "Balwant", "Amitabh")
    if (scenario.owner.toLowerCase().includes(q) && !scenario.surveyNumber.toLowerCase().includes(q)) {
      return {
        ...scenario,
        primaryValue: scenario.owner,
        searchType: "Owner Name" as const,
        searchTypeCategory: "owner" as const,
        secondaryText: `Survey No. ${scenario.surveyNumber} · ${scenario.location}`,
      };
    }

    // If user typed survey number (e.g. "102", "108", "101", "103", "104")
    if (scenario.surveyNumber.toLowerCase().includes(q) || (scenario.khasraNumber && scenario.khasraNumber.toLowerCase().includes(q))) {
      return {
        ...scenario,
        primaryValue: `Survey No. ${scenario.surveyNumber}`,
        searchType: "Survey Number" as const,
        searchTypeCategory: scenario.searchTypeCategory === "agricultural" ? "agricultural" as const : "survey" as const,
        secondaryText: `${scenario.owner} · ${scenario.location}`,
      };
    }

    return scenario;
  });
}

/**
 * Find the matching ParcelBasic from MOCK_PARCELS for a selected DemoSearchScenario or query
 */
export function findMatchingParcel(scenarioOrUlpin: DemoSearchScenario | string): ParcelBasic | undefined {
  const ulpin = typeof scenarioOrUlpin === "string" ? scenarioOrUlpin : scenarioOrUlpin.ulpin;
  return MOCK_PARCELS.find((p) => p.ulpin === ulpin);
}
