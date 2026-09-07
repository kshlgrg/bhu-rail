"use client";

import { useState, useMemo } from "react";
import { ParcelBasic } from "../types/parcel";
import { MOCK_PARCELS } from "../data/parcels";

export function useSearch(initialData: ParcelBasic[] = MOCK_PARCELS) {
  const [query, setQuery] = useState("");
  const [landUseFilter, setLandUseFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filteredResults = useMemo(() => {
    let results = initialData;

    if (query.trim()) {
      const q = query.toLowerCase().trim();
      const digitsOnly = q.replace(/\D/g, "");

      results = results.filter((p) => {
        const ulpinMatch = p.ulpin.toLowerCase().includes(q);
        const surveyMatch =
          p.survey_number.toLowerCase().includes(q) ||
          q.includes(p.survey_number.toLowerCase()) ||
          (digitsOnly.length > 0 && p.survey_number === digitsOnly);
        const ownerMatch = p.primary_owner
          ? p.primary_owner.toLowerCase().includes(q) || q.includes(p.primary_owner.toLowerCase())
          : false;
        const villageMatch = p.village.toLowerCase().includes(q);

        return ulpinMatch || surveyMatch || ownerMatch || villageMatch;
      });
    }

    if (landUseFilter !== "ALL") {
      results = results.filter((p) => p.land_use === landUseFilter);
    }

    if (statusFilter !== "ALL") {
      results = results.filter((p) => p.status === statusFilter);
    }

    return results;
  }, [initialData, query, landUseFilter, statusFilter]);

  return {
    query,
    setQuery,
    landUseFilter,
    setLandUseFilter,
    statusFilter,
    setStatusFilter,
    results: filteredResults,
    totalResults: filteredResults.length,
  };
}
