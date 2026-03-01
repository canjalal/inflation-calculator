import type { FC } from "react";
import { tokens } from "../constants";
import { formatCurrency, formatMonthYear, formatPercent } from "../formatters";
import type { CPIEntry, InflationResult, YearMonth } from "../types";
import { StatPill } from "./StatPill";
import { CPISparkline } from "./CPISparkline";

interface ResultCardProps {
  readonly result: InflationResult;
  readonly amount: number;
  readonly from: YearMonth;
  readonly to: YearMonth;
  readonly visible: boolean;
  readonly entries: readonly CPIEntry[];
}

export const ResultCard: FC<ResultCardProps> = ({
  result, amount, from, to, visible, entries,
}) => {
  const { adjustedAmount, percentChange, multiplier, buyingPowerChange } = result;
  const changeColor = percentChange >= 0
    ? tokens.color.accent.ember
    : tokens.color.accent.sage;
  const buyingPowerPrefix = percentChange >= 0 ? "−" : "+";

  return (
    <div style={{
      background: "linear-gradient(135deg, rgba(201,169,110,0.06) 0%, rgba(139,166,142,0.06) 100%)",
      border: "1px solid rgba(201,169,110,0.12)",
      borderRadius: tokens.radius.xl,
      padding: `${tokens.spacing.section}px 32px ${tokens.spacing.xxl}px`,
      textAlign: "center",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(6px)",
      transition: "all 0.35s ease",
    }}>
      <div style={{
        fontFamily: tokens.font.mono,
        fontSize: 10,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: tokens.color.text.muted,
        marginBottom: tokens.spacing.sm,
      }}>
        {formatMonthYear(from)} → {formatMonthYear(to)}
      </div>

      <div style={{
        fontFamily: tokens.font.display,
        fontSize: "clamp(32px, 6vw, 52px)",
        fontWeight: 700,
        color: tokens.color.accent.gold,
        lineHeight: 1.1,
        marginBottom: tokens.spacing.lg,
      }}>
        {formatCurrency(adjustedAmount)}
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap" }}>
        <StatPill label="Change" value={formatPercent(percentChange)} color={changeColor} />
        <StatPill
          label="Multiplier"
          value={`${multiplier.toFixed(3)}×`}
          color={tokens.color.text.primary}
        />
        <StatPill
          label="Buying Power"
          value={`${buyingPowerPrefix}${Math.abs(buyingPowerChange).toFixed(1)}%`}
          color={changeColor}
        />
      </div>

      <CPISparkline entries={entries} from={from} to={to} />

      <div style={{
        marginTop: tokens.spacing.lg,
        fontFamily: tokens.font.body,
        fontSize: 13,
        color: tokens.color.text.faint,
        lineHeight: 1.6,
      }}>
        {formatCurrency(amount)} in {formatMonthYear(from)} has the same purchasing power
        as {formatCurrency(adjustedAmount)} in {formatMonthYear(to)}.
      </div>
    </div>
  );
};
