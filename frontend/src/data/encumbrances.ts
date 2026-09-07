import { EncumbranceRecord } from "../types/records";

export const MOCK_ENCUMBRANCES: EncumbranceRecord[] = [
  {
    encumbrance_id: "ENC-HR-SBI-2022-049",
    ulpin: "IN-HR-GGM-KDP-0102-0000",
    type: "BANK_MORTGAGE",
    institution_name: "State Bank of India (Gurugram Main Branch)",
    claim_amount_inr: 4500000,
    date_registered: "2022-06-14T00:00:00Z",
    reference_document_no: "SBI/MORT/2022/9912",
    is_active: true,
    remarks: "Equitable mortgage created against commercial term loan sanctioned to M/s Neha Enterprises.",
  },
  {
    encumbrance_id: "ENC-HR-HDFC-2018-012",
    ulpin: "IN-HR-GGM-KDP-0101-0000",
    type: "BANK_MORTGAGE",
    institution_name: "HDFC Bank Ltd",
    claim_amount_inr: 2500000,
    date_registered: "2018-03-10T00:00:00Z",
    discharge_date: "2023-01-15T00:00:00Z",
    reference_document_no: "HDFC/REL/2023/0091",
    is_active: false,
    remarks: "Home improvement loan fully discharged and NOC issued.",
  }
];
