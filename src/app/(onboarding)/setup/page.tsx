import { CurrentStepContent } from "@/components/global/progress-steps/CurrentStepContent";
import { ProgressSteps } from "@/components/global/progress-steps/ProgressSteps";
import { ProgressStepsProvider } from "@/components/global/progress-steps/ProgressStepsContext";
import { ProgressStep } from "@/components/global/progress-steps/types";
import { Separator } from "@/components/ui/separator";
import { ResumeUpload } from "./_components/ResumeUpload";
import StepPersonal from "./_components/StepPersonal";
import StepExperience from "./_components/StepExperience";
import StepEmployment from "./_components/StepEmployment";
import StepBenefits from "./_components/StepBenefits";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Complete Profile | HRM Portal",
  description:
    "Complete your profile to get started with HRM Portal - The Truth International",
};

export default async function SetupPage() {
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
    {
      id: "benefits",
      title: "Allowances, Benefits & Documents",
      content: <StepBenefits />,
    },
  ];
  return (
    <main className='flex items-center justify-center max-h-screen h-screen overflow-hidden bg-sidebar lg:px-16 md:px-14 px-5 py-10'>
      <ProgressStepsProvider steps={steps} initialIndex={0}>
        <div className='bg-background md:flex lg:gap-10 md:gap-5 gap-2 w-full h-full rounded-2xl lg:p-10 md:p-8 p-5'>
          <div className='flex flex-col gap-16'>
            <div className='flex flex-col gap-2'>
              <h2 className='font-semibold text-2xl'>Complete Your Profile</h2>
              <p className='font-medium text-muted-foreground'>
                Enter all required profile details to get started with The Truth
                International
              </p>
            </div>
            <div className='w-[80%]'>
              <ProgressSteps />
            </div>
          </div>
          <Separator orientation='vertical' />
          <div className='w-full overflow-scroll h-full'>
            <CurrentStepContent fallback={<div>Select a step</div>} />
          </div>
        </div>
      </ProgressStepsProvider>
    </main>
  );
}
