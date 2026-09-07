import { UtilityRecord } from "../types/records";

export const MOCK_UTILITIES: Record<string, UtilityRecord[]> = {
  "IN-HR-GGM-KDP-0101-0000": [
    {
      utility_id: "UTL-ELEC-101",
      ulpin: "IN-HR-GGM-KDP-0101-0000",
      utility_type: "ELECTRICITY",
      provider_agency: "Dakshin Haryana Bijli Vitran Nigam (DHBVN)",
      connection_status: "ACTIVE",
      connection_reference: "CA-DHBVN-881902",
      infrastructure_status: "Smart Meter Connected (Sanctioned Load 11 kW)",
      remarks: "Bimonthly billing regular; no arrears recorded.",
      last_inspected: "2024-03-15",
    },
    {
      utility_id: "UTL-WTR-101",
      ulpin: "IN-HR-GGM-KDP-0101-0000",
      utility_type: "WATER_SUPPLY",
      provider_agency: "GMDA Water Works Division",
      connection_status: "ACTIVE",
      connection_reference: "WTR-GMDA-SEC48-101",
      infrastructure_status: "Main 150mm Treated Water Feeder Line",
      remarks: "Metered domestic connection.",
      last_inspected: "2024-02-10",
    },
    {
      utility_id: "UTL-SEW-101",
      ulpin: "IN-HR-GGM-KDP-0101-0000",
      utility_type: "SEWAGE",
      provider_agency: "Municipal Corporation Gurugram (MCG)",
      connection_status: "ACTIVE",
      connection_reference: "SEW-MCG-48-912",
      infrastructure_status: "Connected to Behrampur STP Trunk Network",
      remarks: "Operational standard gradient discharge.",
      last_inspected: "2024-01-22",
    },
    {
      utility_id: "UTL-FBR-101",
      ulpin: "IN-HR-GGM-KDP-0101-0000",
      utility_type: "FIBER",
      provider_agency: "BharatNet / GMDA Smart City Optical Grid",
      connection_status: "ACTIVE",
      connection_reference: "BN-HR-GGM-0101",
      infrastructure_status: "High Speed Fiber Node Operational",
      remarks: "Underground conduit provisioned.",
      last_inspected: "2023-11-05",
    }
  ],
  "IN-HR-GGM-KDP-0102-0000": [
    {
      utility_id: "UTL-ELEC-102",
      ulpin: "IN-HR-GGM-KDP-0102-0000",
      utility_type: "ELECTRICITY",
      provider_agency: "DHBVN Gurugram",
      connection_status: "ACTIVE",
      connection_reference: "CA-DHBVN-902144",
      infrastructure_status: "Dedicated 63 kVA Transformer Feed",
      remarks: "Commercial non-domestic tariff category.",
      last_inspected: "2024-04-01",
    },
    {
      utility_id: "UTL-WTR-102",
      ulpin: "IN-HR-GGM-KDP-0102-0000",
      utility_type: "WATER_SUPPLY",
      provider_agency: "GMDA Water Works",
      connection_status: "ACTIVE",
      connection_reference: "WTR-GMDA-SEC48-102",
      infrastructure_status: "Industrial & Commercial Dedicated Pipeline",
      remarks: "Clear.",
      last_inspected: "2024-02-18",
    }
  ],
  "IN-HR-GGM-KDP-0103-0000": [
    {
      utility_id: "UTL-ELEC-103",
      ulpin: "IN-HR-GGM-KDP-0103-0000",
      utility_type: "ELECTRICITY",
      provider_agency: "DHBVN Gurugram",
      connection_status: "ACTIVE",
      connection_reference: "CA-DHBVN-778210",
      infrastructure_status: "Smart Meter Connected (Sanctioned Load 7 kW)",
      remarks: "Regular.",
      last_inspected: "2024-03-10",
    }
  ],
  "IN-HR-GGM-KDP-0104-0000": [
    {
      utility_id: "UTL-ELEC-104",
      ulpin: "IN-HR-GGM-KDP-0104-0000",
      utility_type: "ELECTRICITY",
      provider_agency: "DHBVN Rural Sohna",
      connection_status: "ACTIVE",
      connection_reference: "CA-DHBVN-RUR-104",
      infrastructure_status: "Agricultural Tube-well Connection (5 HP)",
      remarks: "Restricted to subsidized agricultural supply timings.",
      last_inspected: "2023-12-05",
    }
  ],
  "IN-HR-GGM-KDP-0108-0000": [
    {
      utility_id: "UTL-ELEC-108",
      ulpin: "IN-HR-GGM-KDP-0108-0000",
      utility_type: "ELECTRICITY",
      provider_agency: "DHBVN Rural Sohna",
      connection_status: "ACTIVE",
      connection_reference: "CA-DHBVN-RUR-108",
      infrastructure_status: "Dual Agricultural Tube-well Sanction (15 HP)",
      remarks: "Clean status.",
      last_inspected: "2024-01-15",
    }
  ]
};
