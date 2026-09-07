export interface DisputeRecord {
  dispute_id: string;
  ulpin: string;
  type: "BOUNDARY_ENCROACHMENT" | "TITLE_OWNERSHIP" | "SUCCESSION_INHERITANCE" | "EASEMENT_RIGHT_OF_WAY";
  status: "FILED" | "UNDER_HEARING" | "INJUNCTION_ISSUED" | "DISMISSED" | "RESOLVED";
  case_number: string;
  adjudicating_authority: string;
  petitioner: string;
  respondent: string;
  claimed_area_sq_meters?: number;
  injunction_freeze_transfers: boolean;
  injunction_freeze_mortgage: boolean;
  date_filed: string;
  last_hearing_date?: string;
  stay_order_doc_hash?: string;
  remarks?: string;
}

export interface TransactionRecord {
  transaction_id: string;
  ulpin: string;
  type: "SALE_TRANSFER" | "MORTGAGE_CREATION" | "SUBDIVISION" | "MUTATION" | "DISPUTE_STAY";
  applicant_name: string;
  applicant_role: string;
  submitted_date: string;
  status: "INITIATED" | "VALIDATED" | "COMMITTED" | "REJECTED";
  validation_steps: {
    step: string;
    status: "PASSED" | "FAILED" | "PENDING";
    message: string;
    verified_at?: string;
  }[];
  final_decision: "APPROVED" | "BLOCKED" | "PENDING";
  decision_reason: string;
  executed_by_department: string;
}

export interface LedgerBlockRecord {
  index: number;
  timestamp: string;
  ulpin: string;
  transaction_id: string;
  event_type: string;
  previous_hash: string;
  payload_hash: string;
  state_after_transition_hash: string;
  department_signatures: Record<string, string>;
  block_hash: string;
  verified?: boolean;
}
