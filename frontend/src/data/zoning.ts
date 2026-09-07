export interface ZoningDefinition {
  zoneCode: string;
  zoneName: string;
  category: "RESIDENTIAL" | "COMMERCIAL" | "AGRICULTURAL" | "INDUSTRIAL" | "PUBLIC";
  far: number;
  maxHeightMeters: number;
  permittedActivities: string[];
  restrictedActivities: string[];
  applicableUlpins: string[];
}

export const MOCK_ZONING_DEFINITIONS: ZoningDefinition[] = [
  {
    zoneCode: "R-2",
    zoneName: "Medium Density Urban Residential",
    category: "RESIDENTIAL",
    far: 1.75,
    maxHeightMeters: 15.0,
    permittedActivities: [
      "Single and multi-family detached houses",
      "G+2 / G+3 Residential Floors",
      "Home occupations & professional consulting clinics",
      "Rooftop solar generation installations"
    ],
    restrictedActivities: [
      "Heavy commercial retail",
      "Industrial manufacturing",
      "Hazardous chemical storage",
      "Commercial warehousing"
    ],
    applicableUlpins: ["IN-HR-GGM-KDP-0101-0000", "IN-HR-GGM-KDP-0103-0000"]
  },
  {
    zoneCode: "C-1",
    zoneName: "Neighborhood Commercial Sector",
    category: "COMMERCIAL",
    far: 2.0,
    maxHeightMeters: 24.0,
    permittedActivities: [
      "Commercial offices, IT services, BFSI branches",
      "Retail shops, departmental stores, supermarkets",
      "Diagnostic centers and private clinics",
      "Co-working spaces and business cafes"
    ],
    restrictedActivities: [
      "Manufacturing heavy industry",
      "Abattoirs and polluting chemical trades"
    ],
    applicableUlpins: ["IN-HR-GGM-KDP-0102-0000"]
  },
  {
    zoneCode: "AG-1",
    zoneName: "Controlled Agricultural Preservation Zone",
    category: "AGRICULTURAL",
    far: 0.5,
    maxHeightMeters: 9.0,
    permittedActivities: [
      "Agricultural farming, horticulture, floriculture",
      "Farmhouses adhering to Haryana CLU guidelines",
      "Cold storage and grain silo infrastructure",
      "Cattle sheds and diary cooperative units"
    ],
    restrictedActivities: [
      "High-density multi-storey residential",
      "Heavy non-conforming industrial units",
      "Unauthorized colony colonization"
    ],
    applicableUlpins: ["IN-HR-GGM-KDP-0104-0000", "IN-HR-GGM-KDP-0108-0000"]
  }
];
