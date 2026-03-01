import type { CSSProperties } from "react";
import { tokens } from "./constants";

export const styles = {
  page: {
    minHeight: "100vh",
    background: tokens.color.bg,
    color: tokens.color.text.primary,
    fontFamily: tokens.font.body,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "40px 20px 60px",
  } satisfies CSSProperties,

  container: {
    width: "100%",
    maxWidth: 660,
    margin: "0 auto",
  } satisfies CSSProperties,

  label: (color: string): CSSProperties => ({
    fontSize: 11,
    fontFamily: tokens.font.mono,
    textTransform: "uppercase",
    letterSpacing: "0.15em",
    color,
    marginBottom: tokens.spacing.lg,
    fontWeight: 500,
  }),

  selectRow: {
    display: "flex",
    gap: 10,
  } satisfies CSSProperties,

  select: {
    flex: 1,
    background: tokens.color.input.bg,
    border: `1px solid ${tokens.color.input.border}`,
    borderRadius: tokens.radius.sm,
    padding: "10px 12px",
    color: tokens.color.text.primary,
    fontSize: 15,
    fontFamily: tokens.font.body,
    cursor: "pointer",
    outline: "none",
    appearance: "none" as const,
    WebkitAppearance: "none" as const,
  } satisfies CSSProperties,

  option: {
    background: "#1a1814",
    color: tokens.color.text.primary,
  } satisfies CSSProperties,

  subtitle: {
    fontFamily: tokens.font.mono,
    fontSize: 10,
    letterSpacing: "0.3em",
    textTransform: "uppercase" as const,
    color: tokens.color.accent.gold,
    marginBottom: tokens.spacing.md,
  } satisfies CSSProperties,

  title: {
    fontFamily: tokens.font.display,
    fontSize: "clamp(28px, 5vw, 42px)",
    fontWeight: 400,
    margin: 0,
    lineHeight: 1.15,
    letterSpacing: "-0.01em",
  } satisfies CSSProperties,

  amountBox: {
    background: tokens.color.surface,
    border: "1px solid rgba(201,169,110,0.15)",
    borderRadius: tokens.radius.lg,
    padding: `${tokens.spacing.xxl}px 32px`,
    marginBottom: tokens.spacing.xl,
    position: "relative" as const,
  } satisfies CSSProperties,

  dollarSign: {
    fontFamily: tokens.font.display,
    fontSize: 36,
    color: tokens.color.accent.gold,
    fontWeight: 400,
  } satisfies CSSProperties,

  amountInput: {
    background: "transparent",
    border: "none",
    outline: "none",
    color: tokens.color.text.primary,
    fontFamily: tokens.font.display,
    fontSize: 36,
    fontWeight: 400,
    width: "100%",
    caretColor: tokens.color.accent.gold,
  } satisfies CSSProperties,

  dateRow: {
    display: "flex",
    gap: 12,
    marginBottom: tokens.spacing.xl,
    flexWrap: "wrap" as const,
    alignItems: "center",
  } satisfies CSSProperties,

  footer: {
    marginTop: tokens.spacing.page,
    textAlign: "center" as const,
    fontFamily: tokens.font.mono,
    fontSize: 10,
    color: tokens.color.text.ghost,
    letterSpacing: "0.08em",
  } satisfies CSSProperties,

  statLabel: {
    fontFamily: tokens.font.mono,
    fontSize: 10,
    letterSpacing: "0.12em",
    color: tokens.color.text.faint,
    marginBottom: tokens.spacing.xs,
    textTransform: "uppercase" as const,
  } satisfies CSSProperties,

  statValue: (color: string): CSSProperties => ({
    fontFamily: tokens.font.mono,
    fontSize: 18,
    fontWeight: 500,
    color,
  }),
} as const;
