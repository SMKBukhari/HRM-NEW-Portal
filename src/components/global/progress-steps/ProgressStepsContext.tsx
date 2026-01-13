"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import type { ProgressStep } from "./types";

type ProgressStepsContextValue = {
  steps: ProgressStep[];
  currentIndex: number;
  currentStep: ProgressStep | null;
  setCurrentIndex: (index: number) => void;
  goNext: () => void;
  goPrev: () => void;
  isComplete: (index: number) => boolean;
};

const ProgressStepsContext = createContext<ProgressStepsContextValue | null>(
  null
);

export function ProgressStepsProvider({
  steps,
  initialIndex = 0,
  children,
}: {
  steps: ProgressStep[];
  initialIndex?: number;
  children: React.ReactNode;
}) {
  const safeInitial = Math.min(
    Math.max(initialIndex, 0),
    Math.max(steps.length - 1, 0)
  );
  const [currentIndex, setCurrentIndex] = useState<number>(safeInitial);

  const value = useMemo<ProgressStepsContextValue>(() => {
    const currentStep = steps[currentIndex] ?? null;

    const setIndex = (idx: number) => {
      const next = Math.min(Math.max(idx, 0), Math.max(steps.length - 1, 0));
      setCurrentIndex(next);
    };

    return {
      steps,
      currentIndex,
      currentStep,
      setCurrentIndex: setIndex,
      goNext: () => setIndex(currentIndex + 1),
      goPrev: () => setIndex(currentIndex - 1),
      isComplete: (index: number) => index < currentIndex,
    };
  }, [steps, currentIndex]);

  return (
    <ProgressStepsContext.Provider value={value}>
      {children}
    </ProgressStepsContext.Provider>
  );
}

export function useProgressSteps() {
  const ctx = useContext(ProgressStepsContext);
  if (!ctx)
    throw new Error(
      "useProgressSteps must be used within ProgressStepsProvider"
    );
  return ctx;
}
