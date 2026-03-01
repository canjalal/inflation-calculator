import { useMemo, type FC } from "react";
import { tokens, CHART_CONFIG } from "../constants";
import { computeChartPoints, pointsToPolyline, pointsToAreaPolygon } from "../chartGeometry";
import { formatMonthYear } from "../formatters";
import type { CPIEntry, YearMonth } from "../types";

interface SparklineProps {
  readonly entries: readonly CPIEntry[];
  readonly from: YearMonth;
  readonly to: YearMonth;
}

export const CPISparkline: FC<SparklineProps> = ({ entries, from, to }) => {
  const chartData = useMemo(
    () => computeChartPoints(entries, from, to),
    [entries, from, to]
  );
  if (!chartData) return null;

  const { points, startEntry, endEntry } = chartData;
  const { width, height } = CHART_CONFIG;

  return (
    <div style={{ margin: "20px 0 0", opacity: 0.7 }}>
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: "100%", height: 80 }}>
        <defs>
          <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={tokens.color.accent.gold} stopOpacity={0.3} />
            <stop offset="100%" stopColor={tokens.color.accent.gold} stopOpacity={0} />
          </linearGradient>
        </defs>
        <polygon points={pointsToAreaPolygon(points)} fill="url(#sparkGrad)" />
        <polyline
          points={pointsToPolyline(points)}
          fill="none"
          stroke={tokens.color.accent.gold}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        fontFamily: tokens.font.mono,
        fontSize: 10,
        color: tokens.color.text.faint,
        marginTop: tokens.spacing.xs,
      }}>
        <span>{formatMonthYear(startEntry)}</span>
        <span>CPI Index</span>
        <span>{formatMonthYear(endEntry)}</span>
      </div>
    </div>
  );
};
