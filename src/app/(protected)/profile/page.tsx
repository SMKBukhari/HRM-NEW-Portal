import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Profile | HRM Portal",
  description: "Your profile details - The Truth International",
};

export default async function ProfilePage() {
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

  return <main className=''>This is ProfilePage</main>;
}
