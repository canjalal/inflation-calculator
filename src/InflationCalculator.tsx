import { useState, useMemo, useCallback, type ChangeEvent } from "react";
import { tokens } from "./constants";
import { CPI_RAW } from "./cpiData";
import { parseCPIDataset, toYearMonthKey } from "./dataService";
import { calculateInflation } from "./calculations";
import { useYearMonthSelector, useResultTransition } from "./hooks";
import { styles } from "./styles";
import type { MonthIndex } from "./types";

import { DateSelector } from "./components/DateSelector";
import { SwapButton } from "./components/SwapButton";
import { ResultCard } from "./components/ResultCard";

export default function InflationCalculator(): {
  const dataset = useMemo(() => parseCPIDataset(CPI_RAW), []);
  const lastEntry = dataset.entries[dataset.entries.length - 1];

  const from = useYearMonthSelector({ year: 2000, month: 0 as MonthIndex }, dataset);
  const to = useYearMonthSelector({ year: lastEntry.year, month: lastEntry.month }, dataset);

  const [amountText, setAmountText] = useState("100");

  const parsedAmount = parseFloat(amountText.replace(/,/g, ""));
  const fromCpi = dataset.index.get(toYearMonthKey(from.value));
  const toCpi = dataset.index.get(toYearMonthKey(to.value));
  const isValid =
    !isNaN(parsedAmount) &&
    parsedAmount > 0 &&
    fromCpi !== undefined &&
    toCpi !== undefined;

  const result = isValid ? calculateInflation(parsedAmount, fromCpi!, toCpi!) : null;
  const visible = useResultTransition(from.value, to.value, amountText);

  const handleSwap = useCallback(() => {
    const prev = from.value;
    from.set(to.value);
    to.set(prev);
  }, [from, to]);

  const handleAmountChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      setAmountText(e.target.value.replace(/[^0-9.,]/g, "")),
    []
  );

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={styles.subtitle}>
            U.S. Bureau of Labor Statistics · CPI-U · 1913–2026
          </div>
          <h1 style={styles.title}>
            Inflation Price<br />
            <span style={{ fontStyle: "italic", color: tokens.color.accent.gold }}>
              Translator
            </span>
          </h1>
        </div>

        {/* Amount */}
        <div style={styles.amountBox}>
          <div style={styles.label(tokens.color.text.muted)}>Amount in USD</div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <span style={styles.dollarSign}>$</span>
            <input
              type="text"
              value={amountText}
              onChange={handleAmountChange}
              placeholder="100.00"
              style={styles.amountInput}
            />
          </div>
        </div>

        {/* Date Selectors */}
        <div style={styles.dateRow}>
          <DateSelector
            label="From"
            value={from.value}
            onYearChange={from.setYear}
            onMonthChange={from.setMonth}
            availableMonths={from.availableMonths}
            years={dataset.years}
            accentColor={tokens.color.accent.gold}
          />
          <SwapButton onClick={handleSwap} />
          <DateSelector
            label="To"
            value={to.value}
            onYearChange={to.setYear}
            onMonthChange={to.setMonth}
            availableMonths={to.availableMonths}
            years={dataset.years}
            accentColor={tokens.color.accent.sage}
          />
        </div>

        {/* Result */}
        {isValid && result && (
          <ResultCard
            result={result}
            amount={parsedAmount}
            from={from.value}
            to={to.value}
            visible={visible}
            entries={dataset.entries}
          />
        )}

        {/* Footer */}
        <div style={styles.footer}>
          Based on U.S. CPI-U (Consumer Price Index for All Urban Consumers)
        </div>
      </div>
    </div>
  );
}
