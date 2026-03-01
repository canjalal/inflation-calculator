export interface CPIEntry {
  readonly year: number;
  readonly month: MonthIndex;
  readonly cpi: number;
}

export interface CPIDataset {
  readonly index: ReadonlyMap<string, number>;
  readonly entries: readonly CPIEntry[];
  readonly years: readonly number[];
}

export interface YearMonth {
  readonly year: number;
  readonly month: MonthIndex;
}

export interface InflationResult {
  readonly adjustedAmount: number;
  readonly percentChange: number;
  readonly multiplier: number;
  readonly buyingPowerChange: number;
  readonly fromCpi: number;
  readonly toCpi: number;
}

export interface ChartPoint {
  readonly x: number;
  readonly y: number;
}

export type MonthIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
