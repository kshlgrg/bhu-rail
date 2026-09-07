import React from "react";
import { Badge } from "../ui/Badge";
import { AssetStatus } from "../../types/parcel";

export interface ParcelStatusProps {
  status: AssetStatus;
  hasDispute?: boolean;
  hasEncumbrance?: boolean;
}

export function ParcelStatusBadge({ status, hasDispute, hasEncumbrance }: ParcelStatusProps) {
  if (hasDispute) {
    return <Badge variant="danger" size="md">⚠ Injunction Active</Badge>;
  }

  if (hasEncumbrance) {
    return <Badge variant="warning" size="md">⚠ Mortgage Active</Badge>;
  }

  switch (status) {
    case "ACTIVE":
      return <Badge variant="success" size="md">✓ Clear Title</Badge>;
    case "LOCKED_IN_TRANSFER":
      return <Badge variant="warning" size="md">⏱ Locked in Transfer</Badge>;
    case "MUTATION_PENDING":
      return <Badge variant="info" size="md">⏱ Mutation Pending</Badge>;
    case "FROZEN_BY_COURT":
      return <Badge variant="danger" size="md">⚠ Injunction Active</Badge>;
    case "SUBDIVIDED":
      return <Badge variant="neutral" size="md">Subdivided Parent</Badge>;
    case "RETIRED":
      return <Badge variant="neutral" size="md">Retired</Badge>;
    default:
      return <Badge variant="neutral" size="md">{status}</Badge>;
  }
}
