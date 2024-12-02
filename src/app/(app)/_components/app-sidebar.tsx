"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { PageRoutes } from "@/constants/page-routes";
import type { MainNavItem } from "@/interface/MainNavItem";
import { authClient } from "@/lib/auth-client";
import {
  ChartArea,
  LayoutDashboard,
  Orbit,
  ShoppingBag,
  Sparkles,
  Users
} from "lucide-react";
import { NavAdmin } from "./nav-admin";
import NavHeader from "./nav-header";
import { NavMain } from "./nav-main";
import NavItemsSkeleton from "./nav-main-skeleton";
import { NavUser, type UserItem } from "./nav-user";
import NavUserSkeleton from "./nav-user-skeleton";

const data: {
  user?: UserItem;
  navMain: MainNavItem[];
  navAdmin: MainNavItem[];
} = {
  navMain: [
    {
      title: "Dashboard",
      url: PageRoutes.DASHBOARD,
      icon: LayoutDashboard,
    },
    {
      title: "AI Marketing",
      url: PageRoutes.AI_MARKETING,
      icon: Sparkles,
    },
    {
      title: "Transactions",
      url: PageRoutes.TRANSACTIONS,
      icon: Orbit,
    },
    {
      title: "Products",
      icon: ShoppingBag,
      items: [
        {
          title: "Overview",
          url: PageRoutes.PRODUCT_OVERVIEW,
        },
        {
          title: "Product List",
          url: PageRoutes.PRODUCT_LIST,
        },
      ],
    },
    {
      title: "Customers",
      icon: Users,
      items: [
        {
          title: "Overview",
          url: PageRoutes.CUSTOMER_OVERVIEW,
        },
        {
          title: "Customer List",
          url: PageRoutes.CUSTOMER_LIST,
        },
      ],
    },
    {
      title: "Analytics",
      url: PageRoutes.ANALYTICS,
      icon: ChartArea,
    },
  ],
  navAdmin: [
    {
      title: "Manage Accounts",
      url: PageRoutes.MANAGE_ACCOUNTS,
      icon: Users,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session, isPending } = authClient.useSession();

  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <NavHeader />
      </SidebarHeader>
      <SidebarContent>
        {isPending ? (
          <>
            <NavItemsSkeleton itemLength={data.navMain.length} />
            <NavItemsSkeleton itemLength={data.navAdmin.length} />
          </>
        ) : (
          <>
            <NavMain items={data.navMain} />
            {session?.user?.role === "admin" && (
              <NavAdmin items={data.navAdmin} />
            )}
          </>
        )}
      </SidebarContent>
      <SidebarFooter>
        {isPending ? (
          <NavUserSkeleton />
        ) : (
          <NavUser
            user={{
              name: session?.user?.name || "",
              email: session?.user?.email || "",
              role: session?.user?.role ?? "user",
            }}
          />
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
