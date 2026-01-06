"use client";

import { type Icon } from "@tabler/icons-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavMain({
  items,
}: {
  items: {
    label: string;
    href: string;
    icon?: Icon;
  }[];
}) {
  const pathName = usePathname();
  const isActive = (href: string) =>
    pathName === href || pathName.startsWith(`${href}/`);
  return (
    <SidebarGroup>
      <SidebarGroupLabel className='-ml-1.5 text-sm font-semibold'>
        Main Menu
      </SidebarGroupLabel>
      <SidebarGroupContent className='flex flex-col gap-2'>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.label}>
              <Link href={item.href}>
                <SidebarMenuButton
                  isActive={isActive(item.href)}
                  tooltip={item.label}
                  className={`cursor-pointer hover:bg-primary-bg hover:text-black dark:hover:text-primary-foreground ${
                    isActive(item.href)
                      ? "bg-primary-bg! text-black! dark:text-primary-foreground!"
                      : ""
                  }`}
                >
                  {item.icon && (
                    <item.icon
                      className={`${
                        isActive(item.href)
                          ? "text-primary"
                          : "text-muted-foreground!"
                      } w-5! h-5!`}
                    />
                  )}
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
