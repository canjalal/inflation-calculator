import { CURRENCY_THRESHOLDS, MONTH_LABELS } from "./constants";
import type { YearMonth } from "./types";

export function formatCurrency(value: number): string {
  for (const { value: threshold, suffix } of CURRENCY_THRESHOLDS) {
    if (value >= threshold) return `$${(value / threshold).toFixed(2)}${suffix}`;
  }
  if (value >= 1000) {
    return `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return `$${value.toFixed(2)}`;
}

export function formatMonthYear({ year, month }: YearMonth): string {
  return `${MONTH_LABELS[month]} ${year}`;
}

export function formatPercent(value: number, showSign = true): string {
  const sign = showSign ? (value >= 0 ? "+" : "") : "";
  return `${sign}${value.toFixed(1)}%`;
}
