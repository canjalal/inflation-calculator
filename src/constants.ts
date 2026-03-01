export const tokens = {
  color: {
    bg: "#0f0e0b",
    surface: "rgba(255,255,255,0.03)",
    text: {
      primary: "#e8e4df",
      muted: "rgba(232,228,223,0.4)",
      faint: "rgba(232,228,223,0.35)",
      ghost: "rgba(232,228,223,0.2)",
    },
    accent: {
      gold: "#c9a96e",
      sage: "#8ba68e",
      ember: "#d4795a",
    },
    input: {
      bg: "rgba(255,255,255,0.06)",
      border: "rgba(255,255,255,0.1)",
    },
  },
  font: {
    display: "'Playfair Display', serif",
    body: "'DM Sans', sans-serif",
    mono: "'DM Mono', monospace",
  },
  radius: {
    sm: 10,
    md: 16,
    lg: 20,
    xl: 24,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 28,
    section: 36,
    page: 40,
  },
} as const;

export const MONTH_LABELS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
] as const;

export const CHART_CONFIG = {
  width: 600,
  height: 100,
  padding: 2,
  maxSamples: 120,
} as const;

export const CURRENCY_THRESHOLDS = [
  { value: 1e12, suffix: " trillion" },
  { value: 1e9, suffix: " billion" },
  { value: 1e6, suffix: " million" },
] as const;
