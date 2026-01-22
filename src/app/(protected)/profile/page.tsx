import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SimpleUser } from "@/types/types";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Dock, DockIcon } from "@/components/global/badtzui/dock";
import prisma from "@/lib/db";

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
      role: true,
      department: true,
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

  const getAvatarUrl = (user: SimpleUser) => {
    if (user.userImage && user.userImage.trim() !== "") return user.userImage;

    const baseUrl = "https://api.dicebear.com/9.x";
    const seed = encodeURIComponent(user.fullName || user.userId || "user");

    if (user.gender === "Female") {
      // More feminine-style avatar
      return `${baseUrl}/notionists/svg?seed=${seed}&topType=LongHairStraight&clotheColor=Pink`;
    }

    if (user.gender === "Male") {
      // More masculine-style avatar
      return `${baseUrl}/notionists/svg?seed=${seed}&topType=ShortHairShortFlat&facialHairType=BeardMedium&clotheColor=Blue03`;
    }

    // Neutral fallback
    return `${baseUrl}/notionists/svg?seed=${seed}`;
  };

  const isSocialMedia =
    user?.skype ||
    user?.linkedIn ||
    user?.github ||
    user?.twitter ||
    user?.instagram ||
    user?.googleMeetId ||
    user?.zoomId;

  return (
    <div className='w-full h-full'>
      <div className='grid grid-cols-1 md:grid-cols-12 gap-6 w-full'>
        {/* Left Sidebar */}
        <div className='md:col-span-4 lg:col-span-3 space-y-6 w-full'>
          <div className='bg-sidebar rounded-lg p-4 items-center flex flex-col space-y-5 w-full'>
            <div className='rounded-lg p-3 bg-primary h-32 w-32 flex items-center justify-center relative'>
              <Image src={getAvatarUrl(user)} fill alt={user.fullName} />
            </div>
            <div className='flex flex-col items-center gap-2'>
              <h2 className='lg:text-lg text-sm font-bold'>{user.fullName}</h2>
              <Badge className='rounded-lg' variant='outline'>
                <p className='lg:text-sm text-xs text-muted-foreground'>
                  {user.designation ? user.designation : user.role?.name}
                  {user.department?.name && (
                    <span>- {user.department?.name}</span>
                  )}
                </p>
              </Badge>
            </div>
            <div className='w-full space-y-2 bg-background rounded-lg'>
              <div className='flex items-center justify-between w-full border-b border-primary-border px-4 py-2.5'>
                <p className='text-xs font-medium text-muted-foreground'>
                  Join Date
                </p>
                <p className='text-sm font-medium'>
                  {user.DOJ ? format(user.DOJ, "dd MMMM yyyy") : "-"}
                </p>
              </div>
              <div className='flex items-center justify-between w-full border-b border-primary-border px-4 py-2.5'>
                <p className='text-xs font-medium text-muted-foreground'>
                  Salary
                </p>
                <p className='text-sm font-medium'>{user.salary || "-"}</p>
              </div>
              <div className='flex items-center justify-between w-full px-4 py-2.5'>
                <p className='text-xs font-medium text-muted-foreground'>
                  Contract Start Date
                </p>
                <p className='text-sm font-medium'>
                  {user.contractStartDate
                    ? format(user.contractStartDate, "dd MMMM yyyy")
                    : "-"}
                </p>
              </div>
            </div>
            <div className='flex flex-wrap gap-1.5 items-center justify-between w-full'>
              <p className='text-sm font-bold text-muted-foreground'>
                Social Media
              </p>
              {isSocialMedia ? (
                <Dock iconSize={35}>
                  <DockIcon
                    name='Skype'
                    href={user.skype || "#"}
                    src='/img/logos/Skype.png'
                  />
                  {user.skype && (
                    <DockIcon
                      name='Skype'
                      href={user.skype}
                      src='/img/logos/Skype.png'
                    />
                  )}

                  <DockIcon
                    name='LinkedIn'
                    href={user.linkedIn || "#"}
                    src='/img/logos/LinkedIn.png'
                  />
                  {user.linkedIn && (
                    <DockIcon
                      name='LinkedIn'
                      href={user.linkedIn}
                      src='/img/logos/LinkedIn.png'
                    />
                  )}

                  <DockIcon
                    name='GitHub'
                    href={user.github || "#"}
                    src='/img/logos/GitHub.png'
                  />
                  {user.github && (
                    <DockIcon
                      name='GitHub'
                      href={user.github}
                      src='/img/logos/GitHub.png'
                    />
                  )}

                  <DockIcon
                    name='Twitter'
                    href={user.twitter || "#"}
                    src='/img/logos/Twitterx.png'
                  />
                  {user.twitter && (
                    <DockIcon
                      name='Twitter'
                      href={user.twitter}
                      src='/img/logos/Twitterx.png'
                    />
                  )}

                  <DockIcon
                    name='Instagram'
                    href={user.instagram || "#"}
                    src='/img/logos/Instagram.png'
                  />
                  {user.instagram && (
                    <DockIcon
                      name='Instagram'
                      href={user.instagram}
                      src='/img/logos/Instagram.png'
                    />
                  )}

                  <DockIcon
                    name='Facebook'
                    href={user.facebook || "#"}
                    src='/img/logos/Facebook.png'
                  />
                  {user.facebook && (
                    <DockIcon
                      name='Facebook'
                      href={user.facebook}
                      src='/img/logos/Facebook.png'
                    />
                  )}

                  <DockIcon
                    name='Zoom'
                    href={user.zoomId || "#"}
                    src='/img/logos/Zoom.png'
                  />
                  {user.zoomId && (
                    <DockIcon
                      name='Zoom'
                      href={user.zoomId}
                      src='/img/logos/Zoom.png'
                    />
                  )}
                </Dock>
              ) : (
                <p className='text-xs font-bold text-muted-foreground text-center w-full'>
                  No Social Media Links Found
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className='md:col-span-8 lg:col-span-6 space-y-6'>dfdf</div>

        {/* Right Widgets */}
        <div className='md:col-span-12 lg:col-span-3 space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6'>
            dfdf
          </div>
        </div>
      </div>
    </div>
  );
}
