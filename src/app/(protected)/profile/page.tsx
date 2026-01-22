import { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SimpleUser } from "@/types/types";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import {
  IconBrandBehance,
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandMeetup,
  IconBrandSkype,
  IconBrandTwitter,
  IconBrandZoom,
} from "@tabler/icons-react";
import { Dock, DockIcon } from "@/components/global/badtzui/dock";

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

  const avatarFallback = user?.fullName?.substring(0, 2).toUpperCase();

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
            <div className='flex flex-wrap gap-2 items-center justify-between w-full'>
              <p className='text-sm font-bold text-muted-foreground'>
                Social Media
              </p>
              <div className='flex items-center gap-2'>
                <Dock>
                  {user.skype && (
                    <DockIcon name='Skype' href={user.skype}>
                      <IconBrandSkype />
                    </DockIcon>
                  )}

                  {user.linkedIn && (
                    <DockIcon name='LinkedIn' href={user.linkedIn}>
                      <IconBrandLinkedin />
                    </DockIcon>
                  )}

                  {user.github && (
                    <DockIcon name='GitHub' href={user.github}>
                      <IconBrandGithub />
                    </DockIcon>
                  )}

                  {user.twitter && (
                    <DockIcon name='Twitter' href={user.twitter}>
                      <IconBrandTwitter />
                    </DockIcon>
                  )}

                  {user.instagram && (
                    <DockIcon name='Instagram' href={user.instagram}>
                      <IconBrandInstagram />
                    </DockIcon>
                  )}

                  {user.facebook && (
                    <DockIcon name='Facebook' href={user.facebook}>
                      <IconBrandFacebook />
                    </DockIcon>
                  )}

                  {user.zoomId && (
                    <DockIcon name='Zoom' href={user.zoomId}>
                      <IconBrandZoom />
                    </DockIcon>
                  )}
                </Dock>
                <div className='bg-background rounded-lg p-2 flex items-center gap-2'>
                  <IconBrandSkype className='h-5 w-5' />
                </div>
                <div className='bg-background rounded-lg p-2 flex items-center gap-2'>
                  <IconBrandLinkedin className='h-5 w-5' />
                </div>

                {user.skype && (
                  <Badge variant='outline'>
                    <IconBrandSkype className='h-4 w-4' />
                    {user.skype}
                  </Badge>
                )}
                {user.linkedIn && (
                  <Badge variant='outline'>
                    <IconBrandLinkedin className='h-4 w-4' />
                    {user.linkedIn}
                  </Badge>
                )}
                {user.github && (
                  <Badge variant='outline'>
                    <IconBrandGithub className='h-4 w-4' />
                    {user.github}
                  </Badge>
                )}
                {user.twitter && (
                  <Badge variant='outline'>
                    <IconBrandTwitter className='h-4 w-4' />
                    {user.twitter}
                  </Badge>
                )}
                {user.facebook && (
                  <Badge variant='outline'>
                    <IconBrandFacebook className='h-4 w-4' />
                    {user.facebook}
                  </Badge>
                )}
                {user.instagram && (
                  <Badge variant='outline'>
                    <IconBrandInstagram className='h-4 w-4' />
                    {user.instagram}
                  </Badge>
                )}
                {user.behance && (
                  <Badge variant='outline'>
                    <IconBrandBehance className='h-4 w-4' />
                    {user.behance}
                  </Badge>
                )}
                {user.zoomId && (
                  <Badge variant='outline'>
                    <IconBrandZoom className='h-4 w-4' />
                    {user.zoomId}
                  </Badge>
                )}
                {user.googleMeetId && (
                  <Badge variant='outline'>
                    <IconBrandMeetup className='h-4 w-4' />
                    {user.googleMeetId}
                  </Badge>
                )}
              </div>
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
