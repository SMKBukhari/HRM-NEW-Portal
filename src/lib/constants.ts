import { IconDashboard, IconFolder, IconNote } from "@tabler/icons-react";

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
    },
    {
      label: "Projects",
      icon: IconFolder,
      href: "/projects",
    },
    {
      label: "Tasks",
      icon: IconNote,
      href: "/tasks",
    },
  ],
};
