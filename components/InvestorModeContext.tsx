"use client";

import { createContext, useContext, useState } from "react";

export type IntentMode = "vivir" | "invertir";

interface InvestorModeValue {
  mode: IntentMode;
  setMode: (mode: IntentMode) => void;
}

const InvestorModeContext = createContext<InvestorModeValue | null>(null);

export function InvestorModeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = useState<IntentMode>("invertir");
  return (
    <InvestorModeContext.Provider value={{ mode, setMode }}>
      {children}
    </InvestorModeContext.Provider>
  );
}

export function useInvestorMode() {
  const ctx = useContext(InvestorModeContext);
  if (!ctx) {
    throw new Error("useInvestorMode debe usarse dentro de InvestorModeProvider");
  }
  return ctx;
}
