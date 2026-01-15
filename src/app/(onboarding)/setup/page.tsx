import { CurrentStepContent } from "@/components/global/progress-steps/CurrentStepContent";
import { ProgressSteps } from "@/components/global/progress-steps/ProgressSteps";
import { SetupProgressWrapper } from "./_components/SetupProgressWrapper";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Complete Profile | HRM Portal",
  description:
    "Complete your profile to get started with HRM Portal - The Truth International",
};

export default async function SetupPage() {
  const cookieStore = cookies();
  const userId = (await cookieStore).get("userId")?.value;

  if (!userId) {
    redirect("/signIn");
  }

  const user = await prisma.userProfile.findUnique({
    where: {
      userId: userId,
    },
    include: {
      jobExperience: true,
      education: true,
    },
  });

  if (!user) {
    redirect("/signIn");
  }

  if (user?.isVerified === false) {
    redirect(`/verify/${userId}`);
  }

  const requiredFieldsForApply = [
    user?.fullName,
    user?.email,
    user?.contactNumber,
    user?.city,
    user?.country,
    user?.jobExperience?.length,
    user?.education?.length,
  ];

  const totalFields = requiredFieldsForApply.length;
  const completedFields = requiredFieldsForApply.filter(Boolean).length;
  const isComplete = requiredFieldsForApply.every(Boolean);

  if (isComplete) {
    redirect("/dashboard");
  }

  return (
    <main className='md:flex items-center justify-center md:max-h-screen min-h-screen md:h-screen md:overflow-hidden bg-sidebar lg:px-16 md:px-14 px-3 py-5'>
      <div className='md:hidden flex flex-col gap-2 mb-5 px-1 w-full'>
        <h2 className='font-semibold text-2xl'>Complete Your Profile</h2>
        <p className='font-medium text-muted-foreground'>
          Enter all required profile details to get started with The Truth
          International
        </p>
      </div>
      <SetupProgressWrapper userEmail={user?.email || ""}>
        <div className='bg-background md:flex lg:gap-10 md:gap-5 gap-2 w-full h-full rounded-2xl lg:p-10 md:p-8 p-5'>
          <div className='flex flex-col gap-16'>
            <div className='md:flex hidden flex-col gap-2'>
              <h2 className='font-semibold text-2xl'>Complete Your Profile</h2>
              <p className='font-medium text-muted-foreground'>
                Enter all required profile details to get started with The Truth
                International
              </p>
            </div>
            <div className='md:block hidden'>
              <ProgressSteps />
            </div>
            <div className='md:hidden block mb-5'>
              <ProgressSteps variant='horizontal' />
            </div>
          </div>
          <Separator orientation='vertical' className='md:block hidden' />
          <div className='w-full flex flex-col h-full overflow-y-auto'>
            <div className='flex-1 h-full w-full'>
              <CurrentStepContent fallback={<div>Select a step</div>} />
            </div>
          </div>
        </div>
      </SetupProgressWrapper>
    </main>
  );
}
