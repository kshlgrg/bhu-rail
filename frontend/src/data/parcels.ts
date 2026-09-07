import { ParcelBasic } from "../types/parcel";

export const MOCK_PARCELS: ParcelBasic[] = [
  {
    ulpin: "IN-HR-GGM-KDP-0101-0000",
    asset_id: "AST-HR-KDP-101",
    version: 1,
    state_code: "HR",
    district: "Gurugram",
    tehsil: "Sohna",
    village: "Kadarpur",
    survey_number: "101",
    status: "ACTIVE",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [77.081200, 28.411000],
        [77.082200, 28.411050],
        [77.082150, 28.411800],
        [77.081150, 28.411750],
        [77.081200, 28.411000]
      ]]
    },
    spatial: {
      area_sq_meters: 1850.5,
      survey_number: "101",
      village_code: "KDP-004",
      centroid: [28.4114, 77.081675],
      survey_date: "2023-10-15T00:00:00Z",
      accuracy_meters: 0.05
    },
    lineage: {
      parent_ulpins: [],
      child_ulpins: [],
      genealogy_depth: 0
    },
    state_hash: "3d9ef9218bf147d33261a86847849e7a9b1c78219082f6723ef89021cd871234",
    created_at: "2023-10-15T00:00:00Z",
    updated_at: "2024-01-10T10:30:00Z",
    primary_owner: "Suresh Chandra Yadav",
    land_use: "RESIDENTIAL",
    has_encumbrance: false,
    has_dispute: false
  },
  {
    ulpin: "IN-HR-GGM-KDP-0102-0000",
    asset_id: "AST-HR-KDP-102",
    version: 2,
    state_code: "HR",
    district: "Gurugram",
    tehsil: "Sohna",
    village: "Kadarpur",
    survey_number: "102",
    status: "ACTIVE",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [77.082200, 28.411050],
        [77.083500, 28.411100],
        [77.083450, 28.411850],
        [77.082150, 28.411800],
        [77.082200, 28.411050]
      ]]
    },
    spatial: {
      area_sq_meters: 2400.0,
      survey_number: "102",
      village_code: "KDP-004",
      centroid: [28.41145, 77.082825],
      survey_date: "2023-10-15T00:00:00Z",
      accuracy_meters: 0.05
    },
    lineage: {
      parent_ulpins: [],
      child_ulpins: [],
      genealogy_depth: 0
    },
    state_hash: "a4f89d32b87e21a0094e4321789c890123efb67230491823efca789012345678",
    created_at: "2020-02-18T00:00:00Z",
    updated_at: "2024-02-01T14:15:00Z",
    primary_owner: "Neha Verma",
    land_use: "COMMERCIAL",
    has_encumbrance: true,
    has_dispute: false
  },
  {
    ulpin: "IN-HR-GGM-KDP-0103-0000",
    asset_id: "AST-HR-KDP-103",
    version: 1,
    state_code: "HR",
    district: "Gurugram",
    tehsil: "Sohna",
    village: "Kadarpur",
    survey_number: "103",
    status: "ACTIVE",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [77.083500, 28.411100],
        [77.084500, 28.411150],
        [77.084500, 28.411900],
        [77.083450, 28.411850],
        [77.083500, 28.411100]
      ]]
    },
    spatial: {
      area_sq_meters: 1900.0,
      survey_number: "103",
      village_code: "KDP-004",
      centroid: [28.4115, 77.083988],
      survey_date: "2023-10-15T00:00:00Z",
      accuracy_meters: 0.05
    },
    lineage: {
      parent_ulpins: [],
      child_ulpins: [],
      genealogy_depth: 0
    },
    state_hash: "9821efbc34890123ac782109234856aefbcde09871234567890abcdef1234567",
    created_at: "2021-11-04T00:00:00Z",
    updated_at: "2023-12-20T09:00:00Z",
    primary_owner: "Amitabh Sen",
    land_use: "RESIDENTIAL",
    has_encumbrance: false,
    has_dispute: false
  },
  {
    ulpin: "IN-HR-GGM-KDP-0104-0000",
    asset_id: "AST-HR-KDP-104",
    version: 3,
    state_code: "HR",
    district: "Gurugram",
    tehsil: "Sohna",
    village: "Kadarpur",
    survey_number: "104",
    status: "ACTIVE",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [77.081150, 28.411750],
        [77.082150, 28.411800],
        [77.082100, 28.412800],
        [77.081100, 28.412750],
        [77.081150, 28.411750]
      ]]
    },
    spatial: {
      area_sq_meters: 3100.0,
      survey_number: "104",
      village_code: "KDP-004",
      centroid: [28.412275, 77.081625],
      survey_date: "2023-10-15T00:00:00Z",
      accuracy_meters: 0.05
    },
    lineage: {
      parent_ulpins: [],
      child_ulpins: [],
      genealogy_depth: 0
    },
    state_hash: "f768e8921a4bc5672390812efd981240abc98234710298371902837192837192",
    created_at: "2014-08-10T00:00:00Z",
    updated_at: "2024-03-12T16:45:00Z",
    primary_owner: "Rajesh Sharma",
    land_use: "AGRICULTURAL",
    has_encumbrance: false,
    has_dispute: true
  },
  {
    ulpin: "IN-HR-GGM-KDP-0108-0000",
    asset_id: "AST-HR-KDP-108",
    version: 1,
    state_code: "HR",
    district: "Gurugram",
    tehsil: "Sohna",
    village: "Kadarpur",
    survey_number: "108",
    status: "ACTIVE",
    geometry: {
      type: "Polygon",
      coordinates: [[
        [77.082150, 28.411800],
        [77.084500, 28.411900],
        [77.084400, 28.413200],
        [77.082100, 28.413100],
        [77.082150, 28.411800]
      ]]
    },
    spatial: {
      area_sq_meters: 10000.0,
      survey_number: "108",
      village_code: "KDP-004",
      centroid: [28.4125, 77.083287],
      survey_date: "2023-10-15T00:00:00Z",
      accuracy_meters: 0.05
    },
    lineage: {
      parent_ulpins: [],
      child_ulpins: [],
      genealogy_depth: 0
    },
    state_hash: "1892efbc89341209abc89210ef892109823478901234ef982301928301928301",
    created_at: "2012-05-19T00:00:00Z",
    updated_at: "2023-11-15T11:20:00Z",
    primary_owner: "Sardar Balwant Singh Dhillon",
    land_use: "AGRICULTURAL",
    has_encumbrance: false,
    has_dispute: false
  }
];
