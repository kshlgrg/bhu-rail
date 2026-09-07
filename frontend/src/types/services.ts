export interface CitizenApplication {
  id: string;
  application_number: string;
  service_name: string;
  service_type: "MUTATION" | "TITLE_VERIFICATION" | "SUBDIVISION_PERMIT" | "TAX_NOC" | "ENCUMBRANCE_CERTIFICATE";
  ulpin: string;
  survey_number: string;
  village: string;
  applicant_name: string;
  submitted_date: string;
  status: "SUBMITTED" | "UNDER_REVIEW" | "APPROVED" | "REJECTED" | "COMPLETED";
  last_updated: string;
  department: string;
  remarks?: string;
  timeline: {
    status: string;
    date: string;
    actor: string;
    note: string;
  }[];
}

export interface CitizenRequest {
  id: string;
  category: "OWNERSHIP_VERIFICATION" | "RECORD_CORRECTION" | "DOCUMENT_REQUEST" | "MUTATION_REQUEST" | "SURVEY_REQUEST";
  title: string;
  ulpin: string;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
  created_at: string;
  reference_number: string;
  assigned_officer?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: "VERIFICATION" | "DOCUMENT" | "APPLICATION" | "RESTRICTION" | "TAX" | "SECURITY";
  category: "INFO" | "SUCCESS" | "WARNING" | "CRITICAL";
  timestamp: string;
  read: boolean;
  ulpin?: string;
  action_url?: string;
}
