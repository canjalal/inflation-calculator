import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import InflationCalculator from "./InflationCalculator";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <InflationCalculator />
  </StrictMode>
);
