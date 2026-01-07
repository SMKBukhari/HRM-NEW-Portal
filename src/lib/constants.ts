import {
  IconBrandOffice,
  IconBriefcase,
  IconCalendarClock,
  IconCalendarTime,
  IconClockDollar,
  IconDashboard,
  IconFileCertificate,
  IconFolder,
  IconFolderCheck,
  IconFolderExclamation,
  IconHome,
  IconNotebook,
  IconSettings,
  IconTool,
  IconUser,
  IconUserScan,
  IconUsersGroup,
} from "@tabler/icons-react";

export const COLOR_PALETTE = [
  "#3863C6",
  "#6B9408",
  "#252528",
  "#C66338",
  "#AA3D5A",
];

export const routes = {
  navMain: [
    {
      label: "Dashboard",
      icon: IconDashboard,
      href: "/dashboard",
      for: ["User", "Employee", "Manager", "Admin", "CEO"],
    },
    {
      label: "Team Members",
      icon: IconUsersGroup,
      href: "/team-members",
      for: ["Employee", "Manager", "Admin"],
    },
    {
      label: "Attendance Management",
      icon: IconCalendarClock,
      href: "/attendance-management",
      for: ["Employee", "Manager", "Admin", "CEO"],
    },
    {
      label: "Leave Management",
      icon: IconNotebook,
      href: "/leave-management",
      for: ["Employee", "Manager", "Admin", "CEO"],
    },
    {
      label: "Work From Home",
      icon: IconHome,
      href: "/work-from-home",
      for: ["Employee", "Manager", "Admin", "CEO"],
    },
    {
      label: "Time Table",
      icon: IconClockDollar,
      href: "/time-table",
      for: ["Employee", "Manager", "Admin", "CEO"],
    },
    {
      label: "Employee Management",
      icon: IconUserScan,
      href: "/employee-management",
      for: ["Admin", "CEO"],
    },
    {
      label: "Request Management",
      icon: IconFolderCheck,
      href: "/request-management",
      for: ["Employee", "Manager", "Admin", "CEO"],
    },
    {
      label: "Complaint Management",
      icon: IconFolderExclamation,
      href: "/complaint-management",
      for: ["Employee", "Manager", "Admin", "CEO"],
    },
    {
      label: "Contract Management",
      icon: IconFileCertificate,
      href: "/contract-management",
      for: ["Admin", "CEO"],
    },
    {
      label: "Meeting Management",
      icon: IconCalendarTime,
      href: "/meeting-management",
      for: ["Employee", "Manager", "Admin", "CEO"],
    },
    {
      label: "Job Management",
      icon: IconBriefcase,
      href: "/job-management",
      for: ["Admin", "CEO"],
    },
    {
      label: "Profile",
      icon: IconUser,
      href: "/profile",
      for: ["User", "Employee", "Manager", "Admin", "CEO"],
    },
    {
      label: "Account Settings",
      icon: IconSettings,
      href: "/settings",
      for: ["User", "Employee", "Manager", "Admin", "CEO"],
    },
    {
      label: "Configuration",
      icon: IconTool,
      href: "/settings",
      for: ["Admin", "CEO"],
    },
  ],
};
