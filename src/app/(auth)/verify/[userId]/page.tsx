import prisma from "@/lib/db";
import { redirect } from "next/navigation";
import OTPInput from "./_components/otpInput";

const VerifyAccount = async (props: {
  params: Promise<{ userId: string }>;
}) => {
  const params = await props.params;
  const userId = params.userId;

  const user = await prisma.userProfile.findUnique({
    where: {
      userId,
      isVerified: false,
    },
  });

  if (!user) {
    return redirect("/signIn");
  }

  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <OTPInput userId={userId} />
    </div>
  );
};

export default VerifyAccount;
