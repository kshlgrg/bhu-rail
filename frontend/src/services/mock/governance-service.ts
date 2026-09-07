import { DisputeRecord, TransactionRecord, LedgerBlockRecord } from "../../types/governance";
import { MOCK_DISPUTES } from "../../data/disputes";

export const MOCK_TRANSACTIONS: TransactionRecord[] = [
  {
    transaction_id: "TX-2024-FRAUD-0104",
    ulpin: "IN-HR-GGM-KDP-0104-0000",
    type: "SALE_TRANSFER",
    applicant_name: "Rajesh Sharma (Seller) -> Vikas Juneja (Buyer)",
    applicant_role: "Sub-Registrar Conveyance Intake",
    submitted_date: "2024-03-14T11:00:00Z",
    status: "REJECTED",
    validation_steps: [
      { step: "Identity Authentication", status: "PASSED", message: "Aadhaar e-KYC verified for seller and buyer", verified_at: "2024-03-14T11:00:15Z" },
      { step: "Cadastral Geometry Lock", status: "PASSED", message: "Polygon geometry boundary intact (3,100 m²)", verified_at: "2024-03-14T11:00:20Z" },
      { step: "Ownership Title Check", status: "PASSED", message: "Freehold ownership title verified in RoR", verified_at: "2024-03-14T11:00:25Z" },
      { step: "Encumbrance Screen", status: "PASSED", message: "No active bank charges or mortgages found", verified_at: "2024-03-14T11:00:30Z" },
      { step: "Court Stay & Injunction Screen", status: "FAILED", message: "RESTRICTION: Revenue Court Injunction (Case REV/COURT/SOHNA/2024/771) active on parcel", verified_at: "2024-03-14T11:00:35Z" },
      { step: "Final Decision", status: "FAILED", message: "Transfer prohibited by automated rule engine", verified_at: "2024-03-14T11:00:40Z" }
    ],
    final_decision: "BLOCKED",
    decision_reason: "TRANSFER BLOCKED: Active Injunction issued by SDM Court freezing northern boundary transfers.",
    executed_by_department: "Sub-Registrar Sohna (Automated Rule Engine)"
  },
  {
    transaction_id: "TX-2024-UPI-0101",
    ulpin: "IN-HR-GGM-KDP-0101-0000",
    type: "MORTGAGE_CREATION",
    applicant_name: "State Bank of India (Gurugram)",
    applicant_role: "Lending Bank Verification Desk",
    submitted_date: "2024-04-08T10:15:00Z",
    status: "VALIDATED",
    validation_steps: [
      { step: "Identity Authentication", status: "PASSED", message: "Title holder Suresh Chandra Yadav verified", verified_at: "2024-04-08T10:15:01Z" },
      { step: "Cadastral Geometry Lock", status: "PASSED", message: "Boundaries clear with zero overlaps", verified_at: "2024-04-08T10:15:02Z" },
      { step: "Ownership Title Check", status: "PASSED", message: "Clear Freehold Title Deed 8921/2016", verified_at: "2024-04-08T10:15:02Z" },
      { step: "Encumbrance Screen", status: "PASSED", message: "Zero active bank charges / Clean mortgage history", verified_at: "2024-04-08T10:15:03Z" },
      { step: "Court Stay & Injunction Screen", status: "PASSED", message: "No active civil disputes or court stays", verified_at: "2024-04-08T10:15:03Z" },
      { step: "Final Decision", status: "PASSED", message: "ELIGIBLE FOR TITLE FINANCING", verified_at: "2024-04-08T10:15:04Z" }
    ],
    final_decision: "APPROVED",
    decision_reason: "Property Passport Clear: Instant collateral eligibility granted.",
    executed_by_department: "Land UPI Gateway"
  }
];

export async function getAllDisputes(): Promise<DisputeRecord[]> {
  await new Promise((r) => setTimeout(r, 100));
  return MOCK_DISPUTES;
}

export async function getAllTransactions(): Promise<TransactionRecord[]> {
  await new Promise((r) => setTimeout(r, 100));
  return MOCK_TRANSACTIONS;
}
