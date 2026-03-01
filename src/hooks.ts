import { useState, useMemo, useEffect, useCallback } from "react";
import { getAvailableMonths } from "./calculations";
import type { CPIDataset, MonthIndex, YearMonth } from "./types";

export interface YearMonthSelector {
  readonly value: YearMonth;
  readonly setYear: (year: number) => void;
  readonly setMonth: (month: MonthIndex) => void;
  readonly set: (ym: YearMonth) => void;
  readonly availableMonths: MonthIndex[];
}

export function useYearMonthSelector(
  initial: YearMonth,
  dataset: CPIDataset
): YearMonthSelector {
  const [value, setValue] = useState<YearMonth>(initial);

  const availableMonths = useMemo(
    () => getAvailableMonths(dataset.entries, value.year),
    [dataset.entries, value.year]
  );

  const setYear = useCallback(
    (year: number) => {
      const months = getAvailableMonths(dataset.entries, year);
      const month = months.includes(value.month) ? value.month : months[0];
      setValue({ year, month });
    },
    [dataset.entries, value.month]
  );

  const setMonth = useCallback(
    (month: MonthIndex) => setValue((prev) => ({ ...prev, month })),
    []
  );

  return { value, setYear, setMonth, availableMonths, set: setValue };
}

export function useResultTransition(...deps: unknown[]): boolean {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    setVisible(false);
    const timer = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(timer);
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps
  return visible;
}
