import { DisputeRecord } from "../types/governance";

export const MOCK_DISPUTES: DisputeRecord[] = [
  {
    dispute_id: "DISP-REV-2024-771",
    ulpin: "IN-HR-GGM-KDP-0104-0000",
    type: "BOUNDARY_ENCROACHMENT",
    status: "INJUNCTION_ISSUED",
    case_number: "REV/COURT/SOHNA/2024/771",
    adjudicating_authority: "Court of Sub-Divisional Magistrate (Revenue Court) Sohna",
    petitioner: "Gram Panchayat Kadarpur (through Sarpanch)",
    respondent: "Rajesh Sharma",
    claimed_area_sq_meters: 145.0,
    injunction_freeze_transfers: true,
    injunction_freeze_mortgage: true,
    date_filed: "2024-03-12T00:00:00Z",
    last_hearing_date: "2024-04-05T00:00:00Z",
    stay_order_doc_hash: "3fa98e124abc90123ef89021cd8712343fa98e124abc90123ef89021cd871234",
    remarks: "COURT RESTRICTION: Status quo ordered on northern boundary adjacent to village passage. Registry and transfer lock active.",
  }
];
