"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Role, UserProfile } from "@prisma/client";
import Image from "next/image";
import { routes } from "@/lib/constants";
import { NavMain } from "@/components/global/sidebar/nav-main";
import { Separator } from "@/components/ui/separator";

interface AppSidebarProps {
  user: (UserProfile & { role: Role | null }) | null;
}

export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & AppSidebarProps) {
  const company = {
    name: "The Truth International",
    logo: "/img/logos/ttiLogo.png",
    designation: user?.designation,
  };
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <div className='flex gap-2'>
          {/* <div className='flex aspect-square size-8 items-center relative justify-center rounded-lg bg-sidebar-primary text-foreground'> */}
          <Image
            src={company.logo}
            alt={company.name}
            width={35}
            height={35}
            className='rounded-lg'
          />
          {/* </div> */}
          <div className='grid flex-1 text-left text-sm leading-tight text-foreground'>
            <span className='truncate font-semibold text-foreground'>
              {company.name}
            </span>
            <span className='truncate text-xs'>{company.designation}</span>
          </div>
        </div>
      </SidebarHeader>
      <Separator className='mt-1.5' />
      <SidebarContent>
        <NavMain items={routes.navMain} />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
