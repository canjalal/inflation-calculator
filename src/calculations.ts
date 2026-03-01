import type { CPIEntry, InflationResult, MonthIndex } from "./types";

export function calculateInflation(
  amount: number,
  fromCpi: number,
  toCpi: number
): InflationResult {
  const multiplier = toCpi / fromCpi;
  const adjustedAmount = amount * multiplier;
  const percentChange = ((toCpi - fromCpi) / fromCpi) * 100;
  const buyingPowerChange = (1 - fromCpi / toCpi) * 100;

  return { adjustedAmount, percentChange, multiplier, buyingPowerChange, fromCpi, toCpi };
}

export function getAvailableMonths(
  entries: readonly CPIEntry[],
  year: number
): MonthIndex[] {
  return entries
    .filter((e) => e.year === year)
    .map((e) => e.month)
    .sort((a, b) => a - b);
}
