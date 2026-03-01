import { CHART_CONFIG } from "./constants";
import { toYearMonthKey } from "./dataService";
import type { CPIEntry, ChartPoint, YearMonth } from "./types";

export function downsample(
  data: readonly CPIEntry[],
  maxPoints: number
): readonly CPIEntry[] {
  if (data.length <= maxPoints) return data;
  return Array.from({ length: maxPoints }, (_, i) =>
    data[Math.round((i * (data.length - 1)) / (maxPoints - 1))]
  );
}

export function computeChartPoints(
  entries: readonly CPIEntry[],
  from: YearMonth,
  to: YearMonth
): { points: ChartPoint[]; startEntry: CPIEntry; endEntry: CPIEntry } | null {
  const fromIdx = entries.findIndex((e) => toYearMonthKey(e) === toYearMonthKey(from));
  const toIdx = entries.findIndex((e) => toYearMonthKey(e) === toYearMonthKey(to));
  if (fromIdx === -1 || toIdx === -1) return null;

  const startIdx = Math.min(fromIdx, toIdx);
  const endIdx = Math.max(fromIdx, toIdx);
  const slice = entries.slice(startIdx, endIdx + 1);
  if (slice.length < 2) return null;

  const sampled = downsample(slice, CHART_CONFIG.maxSamples);
  const cpis = sampled.map((e) => e.cpi);
  const minCpi = Math.min(...cpis);
  const maxCpi = Math.max(...cpis);
  const range = maxCpi - minCpi || 1;

  const { width: w, height: h, padding: pad } = CHART_CONFIG;
  const points = sampled.map((e, i): ChartPoint => ({
    x: pad + (i / (sampled.length - 1)) * (w - 2 * pad),
    y: h - pad - ((e.cpi - minCpi) / range) * (h - 2 * pad),
  }));

  return {
    points,
    startEntry: entries[startIdx],
    endEntry: entries[endIdx],
  };
}

export function pointsToPolyline(points: readonly ChartPoint[]): string {
  return points.map((p) => `${p.x},${p.y}`).join(" ");
}

export function pointsToAreaPolygon(points: readonly ChartPoint[]): string {
  const { width: w, height: h, padding: pad } = CHART_CONFIG;
  return `${pointsToPolyline(points)} ${w - pad},${h} ${pad},${h}`;
}
