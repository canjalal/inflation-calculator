import type { CPIDataset, CPIEntry, MonthIndex, YearMonth } from "./types";

export function toYearMonthKey({ year, month }: YearMonth): string {
  return `${year}-${month}`;
}

export function parseCPIDataset(raw: string): CPIDataset {
  const index = new Map<string, number>();
  const entries: CPIEntry[] = [];

  for (const line of raw.trim().split("\n")) {
    const parts = line.split(",");
    const year = parseInt(parts[0], 10);

    for (let m = 0; m < 12; m++) {
      const value = parseFloat(parts[m + 1]);
      if (!isNaN(value) && value > 0) {
        const month = m as MonthIndex;
        const entry: CPIEntry = { year, month, cpi: value };
        index.set(toYearMonthKey(entry), value);
        entries.push(entry);
      }
    }
  }

  const years = [...new Set(entries.map((e) => e.year))].sort((a, b) => a - b);
  return { index, entries, years };
}
