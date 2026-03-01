import type { FC } from "react";
import { styles } from "../styles";

interface StatPillProps {
  readonly label: string;
  readonly value: string;
  readonly color: string;
}

export const StatPill: FC<StatPillProps> = ({ label, value, color }) => (
  <div>
    <div style={styles.statLabel}>{label}</div>
    <div style={styles.statValue(color)}>{value}</div>
  </div>
);
