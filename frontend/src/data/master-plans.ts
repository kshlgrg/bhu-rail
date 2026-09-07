import { MasterPlanRecord } from "../types/records";

export const MOCK_MASTER_PLANS: MasterPlanRecord[] = [
  {
    ulpin: "IN-HR-GGM-KDP-0101-0000",
    plan_reference: "GMDA-MP-2031-SEC48-R2",
    planning_authority: "Gurugram Metropolitan Development Authority (GMDA) & DTCP",
    zone_category: "Urban Sector Extension R-2",
    development_status: "PLANNED & PARTIALLY SERVICED",
    restriction_notes: "Subject to standard 6-meter road widening setback along Southern Sector Periphery.",
    plan_effective_date: "2018-05-15T00:00:00Z",
  },
  {
    ulpin: "IN-HR-GGM-KDP-0102-0000",
    plan_reference: "GMDA-MP-2031-SEC48-C1",
    planning_authority: "Gurugram Metropolitan Development Authority (GMDA)",
    zone_category: "Commercial Corridor C-1",
    development_status: "DEVELOPED & ACTIVE",
    restriction_notes: "Mandatory basement parking clearance for commercial footprint exceeding 500 sq m.",
    plan_effective_date: "2018-05-15T00:00:00Z",
  },
  {
    ulpin: "IN-HR-GGM-KDP-0103-0000",
    plan_reference: "GMDA-MP-2031-SEC48-R2",
    planning_authority: "GMDA & DTCP Haryana",
    zone_category: "Urban Sector Extension R-2",
    development_status: "PLANNED",
    restriction_notes: "Clean residential plot within approved village abatement periphery.",
    plan_effective_date: "2018-05-15T00:00:00Z",
  },
  {
    ulpin: "IN-HR-GGM-KDP-0104-0000",
    plan_reference: "DTCP-SOHNA-MP-2031-AG1",
    planning_authority: "Directorate of Town & Country Planning (DTCP) Haryana",
    zone_category: "Controlled Rural Fringe Buffer",
    development_status: "RESTRICTED / COURT STAY",
    restriction_notes: "Pending civil suit stay order. No change of land use (CLU) permissible until final court decree.",
    plan_effective_date: "2015-11-20T00:00:00Z",
  },
  {
    ulpin: "IN-HR-GGM-KDP-0108-0000",
    plan_reference: "DTCP-SOHNA-MP-2031-AG1",
    planning_authority: "Directorate of Town & Country Planning (DTCP) Haryana",
    zone_category: "Agricultural Controlled Area",
    development_status: "SUBDIVISION READY",
    restriction_notes: "Eligible for statutory agricultural parcel partition under Haryana Land Revenue Act.",
    plan_effective_date: "2015-11-20T00:00:00Z",
  },
];
