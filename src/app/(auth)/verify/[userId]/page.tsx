import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import OTPInput from "./_components/otpInput";

const VerifyAccount = async ({ params }: { params: { userId: string } }) => {
  // const user = await db.userProfile.findUnique({
  //   where: {
  //     userId: params.userId,
  //     isVerified: false,
  //   },
  // });

  // if (!user) {
  //   return redirect("/signIn");
  // }

  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <OTPInput userId={params.userId} />
    </div>
  );
};

export default VerifyAccount;
