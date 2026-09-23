/**
 * Utility formatters for Bhu-Rail UI
 */

export function formatArea(sqMeters: number | null | undefined): string {
  if (sqMeters === null || sqMeters === undefined || isNaN(sqMeters)) return "—";
  const num = Number(sqMeters);
  const sqFt = Math.round(num * 10.7639);
  const hectares = (num / 10000).toFixed(2);
  const acres = (num / 4046.86).toFixed(2);

  if (num >= 10000) {
    return `${num.toLocaleString("en-IN")} m² (${hectares} ha / ${acres} acres)`;
  }
  return `${num.toLocaleString("en-IN")} m² (${sqFt.toLocaleString("en-IN")} sq.ft)`;
}

export function formatCurrency(amount: number | null | undefined): string {
  if (amount === null || amount === undefined || isNaN(amount)) return "₹0";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return "—";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export function formatDateTime(dateStr: string | null | undefined): string {
  if (!dateStr) return "—";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return dateStr;
  }
}
