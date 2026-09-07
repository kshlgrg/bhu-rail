"use client";

import { useState, useEffect } from "react";
import { Parcel360Overview } from "../types/parcel";
import { getParcel360 } from "../services/mock/parcel-service";

export function useParcel(ulpin: string) {
  const [parcel, setParcel] = useState<Parcel360Overview | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ulpin) {
      setParcel(null);
      setLoading(false);
      return;
    }

    let isMounted = true;
    setLoading(true);
    setError(null);

    getParcel360(ulpin)
      .then((data) => {
        if (isMounted) {
          setParcel(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message || "Failed to load parcel");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [ulpin]);

  return { parcel, loading, error };
}
