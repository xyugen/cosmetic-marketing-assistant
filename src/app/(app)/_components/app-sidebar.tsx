"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from "@/components/ui/sidebar";
import {
  ChartArea,
  LayoutDashboard,
  ShoppingBag,
  Sparkles,
  Users
} from "lucide-react";
import NavHeader from "./nav-header";
import { type MainNavItem, NavMain } from "./nav-main";
import { NavUser, type UserItem } from "./nav-user";

const data: { user?: UserItem; navMain: MainNavItem[] } = {
  user: {
    name: "John Doe",
    email: "c0L4e@example.com",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
    },
    {
      title: "AI Marketing",
      url: "#",
      icon: Sparkles,
    },
    {
      title: "Products",
      icon: ShoppingBag,
      items: [
        {
          title: "Overview",
          url: "#",
        },
        {
          title: "Product List",
          url: "#",
        },
      ],
    },
    {
      title: "Customers",
      icon: Users,
      items: [
        {
          title: "Overview",
          url: "#",
        },
        {
          title: "Customer List",
          url: "#",
        },
      ],
    },
    {
      title: "Analytics",
      url: "#",
      icon: ChartArea,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user!} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
