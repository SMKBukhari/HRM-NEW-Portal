"use client";

import React, { useEffect, useState } from "react";
import { useSetupStore } from "@/store/useSetupStore";
import { ProgressStepsProvider } from "@/components/global/progress-steps/ProgressStepsContext";
import { ProgressStep } from "@/components/global/progress-steps/types";
import { ResumeUpload } from "./ResumeUpload";
import StepPersonal from "./StepPersonal";
import StepExperience from "./StepExperience";
import StepSkills from "./StepSkills";

export function SetupProgressWrapper({
  children,
  userEmail,
}: {
  children: React.ReactNode;
  userEmail: string;
}) {
  const { step, setStep, setPersonalDetails } = useSetupStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    if (userEmail) {
      setPersonalDetails({ email: userEmail });
    }
  }, [userEmail, setPersonalDetails]);

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
      id: "skills",
      title: "Skills & Social Links",
      content: <StepSkills />,
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
