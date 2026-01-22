import { AppSidebar } from "@/components/global/sidebar/app-sidebar";
import { SiteHeader } from "@/components/global/sidebar/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
// import { db } from "@/lib/db";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "HRMS | The Truth International",
  description: "A Human Resource Management System for The Truth International",
};

const ProtectedLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = cookies();
  const userId = (await cookieStore).get("userId")?.value;

  const user = await prisma.userProfile.findUnique({
    where: {
      userId: userId,
    },
    include: {
      role: true,
      department: true,
    },
  });

  if (!user) {
    redirect("/signIn");
  }

  const notifications = await prisma.notifications.findMany({
    where: {
      userId: userId,
      forPMS: false,
    },
    include: {
      user: {
        select: {
          fullName: true,
          userImage: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <SidebarProvider
      style={
        {
          "--header-height": "calc(var(--spacing) * 14)",
        } as React.CSSProperties
      }
    >
      <AppSidebar user={user} variant='inset' />
      <SidebarInset className='bg-background! min-h-screen overflow-hidden scroll-smooth'>
        <div className='h-(--header-height)'>
          <SiteHeader userProfile={user} notifications={notifications} />
        </div>

        <main className='overflow-y-auto space-y-6 md:p-4 p-2'>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default ProtectedLayout;
