import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProfileSidebar } from "./components/ProfileSidebar";
import { ProfileMain } from "./components/ProfileMain";
import { ProfileWidgets } from "./components/ProfileWidgets";

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

  return (
    <div className='min-h-screen bg-gray-50/50 dark:bg-background p-4 md:p-6 lg:p-8'>
      <div className='mx-auto max-w-[1600px]'>
        <div className='grid grid-cols-1 md:grid-cols-12 gap-6'>
          {/* Left Sidebar */}
          <div className='md:col-span-4 lg:col-span-3 space-y-6'>
            <ProfileSidebar />
          </div>

          {/* Main Content */}
          <div className='md:col-span-8 lg:col-span-6 space-y-6'>
            <ProfileMain />
          </div>

          {/* Right Widgets */}
          <div className='md:col-span-12 lg:col-span-3 space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6'>
              <ProfileWidgets />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
