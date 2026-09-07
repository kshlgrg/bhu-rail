export type StatusBadgeVariant = "success" | "warning" | "danger" | "info" | "neutral";

export interface GeoPoint {
  lat: number;
  lng: number;
}

export type CoordinateRing = [number, number][];

export interface GeoPolygon {
  type: "Polygon";
  coordinates: [number, number][][];
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  timestamp: string;
}

export interface FilterOption {
  label: string;
  value: string;
}
