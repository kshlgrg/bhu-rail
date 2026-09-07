import { CitizenApplication } from "../types/services";

export const MOCK_APPLICATIONS: CitizenApplication[] = [
  {
    id: "APP-2024-0091",
    application_number: "BHU-APP-HR-GGM-0091",
    service_name: "Instant Title & Encumbrance Certificate (Land UPI)",
    service_type: "TITLE_VERIFICATION",
    ulpin: "IN-HR-GGM-KDP-0101-0000",
    survey_number: "101",
    village: "Kadarpur",
    applicant_name: "Suresh Chandra Yadav",
    submitted_date: "2024-04-08T10:15:00Z",
    status: "COMPLETED",
    last_updated: "2024-04-08T10:15:04Z",
    department: "DPI Unified Verifier Engine",
    remarks: "Cryptographic Certificate issued with QR verifiable payload.",
    timeline: [
      { status: "SUBMITTED", date: "2024-04-08T10:15:00Z", actor: "Citizen", note: "Application initiated via Land UPI" },
      { status: "VERIFIED", date: "2024-04-08T10:15:02Z", actor: "Sub-Registrar Node", note: "RoR ownership match verified" },
      { status: "COMPLETED", date: "2024-04-08T10:15:04Z", actor: "DPI Engine", note: "Digital certificate generated & stamped on Trust Ledger" },
    ]
  },
  {
    id: "APP-2024-0108",
    application_number: "BHU-APP-HR-GGM-0108",
    service_name: "Statutory Agricultural Parcel Subdivision Consent",
    service_type: "SUBDIVISION_PERMIT",
    ulpin: "IN-HR-GGM-KDP-0108-0000",
    survey_number: "108",
    village: "Kadarpur",
    applicant_name: "Sardar Balwant Singh Dhillon",
    submitted_date: "2024-03-28T14:30:00Z",
    status: "UNDER_REVIEW",
    last_updated: "2024-04-02T16:00:00Z",
    department: "Tehsildar & District Survey Officer Sohna",
    remarks: "Field surveyor inspection scheduled for verification of partition boundaries.",
    timeline: [
      { status: "SUBMITTED", date: "2024-03-28T14:30:00Z", actor: "Applicant", note: "Subdivision application filed with partition sketch" },
      { status: "UNDER_REVIEW", date: "2024-04-02T16:00:00Z", actor: "Tehsildar Office", note: "Notice served to co-sharers and local Halqa Patwari" },
    ]
  },
  {
    id: "APP-2024-0112",
    application_number: "BHU-APP-HR-GGM-0112",
    service_name: "Property Tax Assessment NOC for Conveyance",
    service_type: "TAX_NOC",
    ulpin: "IN-HR-GGM-KDP-0101-0000",
    survey_number: "101",
    village: "Kadarpur",
    applicant_name: "Suresh Chandra Yadav",
    submitted_date: "2024-04-06T09:00:00Z",
    status: "APPROVED",
    last_updated: "2024-04-07T11:45:00Z",
    department: "Municipal Corporation Gurugram (MCG)",
    remarks: "Tax clear NOC valid until 31-March-2025.",
    timeline: [
      { status: "SUBMITTED", date: "2024-04-06T09:00:00Z", actor: "Citizen", note: "NOC request submitted online" },
      { status: "APPROVED", date: "2024-04-07T11:45:00Z", actor: "Tax Assessment Officer", note: "Zero dues confirmed. NOC granted." },
    ]
  },
  {
    id: "APP-2024-0077",
    application_number: "BHU-APP-HR-GGM-0077",
    service_name: "Deed Registration & Mutation Application",
    service_type: "MUTATION",
    ulpin: "IN-HR-GGM-KDP-0104-0000",
    survey_number: "104",
    village: "Kadarpur",
    applicant_name: "Rajesh Sharma",
    submitted_date: "2024-03-14T11:00:00Z",
    status: "REJECTED",
    last_updated: "2024-03-14T11:01:10Z",
    department: "Sub-Registrar Sohna (Automated Fraud Prevention)",
    remarks: "REJECTED BY RULE ENGINE: Revenue Court Injunction Stay Order Active (REV/COURT/SOHNA/2024/771). Transfer frozen.",
    timeline: [
      { status: "SUBMITTED", date: "2024-03-14T11:00:00Z", actor: "Applicant", note: "Online registry transfer token submitted" },
      { status: "REJECTED", date: "2024-03-14T11:01:10Z", actor: "Rule Engine Node", note: "Automated pre-validation halt triggered: active stay on northern boundary" },
    ]
  }
];
