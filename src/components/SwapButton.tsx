import type { FC } from "react";
import { tokens } from "../constants";

export const SwapButton: FC<{ onClick: () => void }> = ({ onClick }) => (
  <button
    onClick={onClick}
    title="Swap dates"
    style={{
      background: "rgba(201,169,110,0.1)",
      border: "1px solid rgba(201,169,110,0.2)",
      borderRadius: tokens.radius.md,
      width: 44,
      height: 44,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      color: tokens.color.accent.gold,
      fontSize: 18,
      flexShrink: 0,
      transition: "all 0.2s",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = "rgba(201,169,110,0.2)";
      e.currentTarget.style.transform = "rotate(180deg)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = "rgba(201,169,110,0.1)";
      e.currentTarget.style.transform = "rotate(0deg)";
    }}
  >
    ⇄
  </button>
);
