import type { FC, ChangeEvent } from "react";
import { tokens, MONTH_LABELS } from "../constants";
import { styles } from "../styles";
import type { MonthIndex, YearMonth } from "../types";

interface DateSelectorProps {
  readonly label: string;
  readonly value: YearMonth;
  readonly onYearChange: (year: number) => void;
  readonly onMonthChange: (month: MonthIndex) => void;
  readonly availableMonths: readonly MonthIndex[];
  readonly years: readonly number[];
  readonly accentColor: string;
}

export const DateSelector: FC<DateSelectorProps> = ({
  label, value, onYearChange, onMonthChange, availableMonths, years, accentColor,
}) => (
  <div style={{
    flex: 1,
    minWidth: 240,
    background: tokens.color.surface,
    border: `1px solid ${accentColor}22`,
    borderRadius: tokens.radius.md,
    padding: `${tokens.spacing.xl}px ${tokens.spacing.xl + 4}px`,
  }}>
    <div style={styles.label(accentColor)}>{label}</div>
    <div style={styles.selectRow}>
      <select
        value={value.month}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          onMonthChange(parseInt(e.target.value, 10) as MonthIndex)
        }
        style={styles.select}
      >
        {availableMonths.map((m) => (
          <option key={m} value={m} style={styles.option}>{MONTH_LABELS[m]}</option>
        ))}
      </select>
      <select
        value={value.year}
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          onYearChange(parseInt(e.target.value, 10))
        }
        style={styles.select}
      >
        {years.map((y) => (
          <option key={y} value={y} style={styles.option}>{y}</option>
        ))}
      </select>
    </div>
  </div>
);
