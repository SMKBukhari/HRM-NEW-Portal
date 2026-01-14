"use client";

import React, { useEffect, useState } from "react";
import { useSetupStore } from "@/store/useSetupStore";
import { ProgressStepsProvider } from "@/components/global/progress-steps/ProgressStepsContext";
import { ProgressStep } from "@/components/global/progress-steps/types";
import { ResumeUpload } from "./ResumeUpload";
import StepPersonal from "./StepPersonal";
import StepExperience from "./StepExperience";
import StepEmployment from "./StepEmployment";

export function SetupProgressWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { step, setStep } = useSetupStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const steps: ProgressStep[] = [
    {
      id: "resume",
      title: "Upload Resume",
      content: <ResumeUpload />,
    },
    {
      id: "personal",
      title: "Personal & Contact Information",
      content: <StepPersonal />,
    },
    {
      id: "experience",
      title: "Education & Experience",
      content: <StepExperience />,
    },
    {
      id: "employment",
      title: "Employment & Payroll Details",
      content: <StepEmployment />,
    },
  ];

  if (!isHydrated) {
    return null; // or a loading spinner
  }

  return (
    <ProgressStepsProvider
      steps={steps}
      initialIndex={step}
      onStepChange={setStep}
    >
      {children}
    </ProgressStepsProvider>
  );
}
