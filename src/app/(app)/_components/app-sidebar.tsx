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
  MailCheck,
  Orbit,
  ShoppingBag,
  Sparkles,
  Users,
} from "lucide-react";
import { NavAdmin } from "./nav-admin";
import NavHeader from "./nav-header";
import { NavMain } from "./nav-main";
import { NavUser, type UserItem } from "./nav-user";
import NavUserSkeleton from "./nav-user-skeleton";
import NavItemsSkeleton from "./nav-main-skeleton";

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
  const [user, setUser] = React.useState<UserItem | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchUserData() {
      try {
        const session = await authClient.getSession();
        if (session?.data?.user) {
          setUser({
            name: session.data.user.name,
            email: session.data.user.email,
            role: session.data.user.role ?? "user",
          });
        }
      } catch (error) {
        console.error("Failed to fetch user session:", error);
      } finally {
        setLoading(false);
      }
    }

    void fetchUserData();
  }, []);

  return (
    <Sidebar variant="inset" collapsible="icon" {...props}>
      <SidebarHeader>
        <NavHeader />
      </SidebarHeader>
      <SidebarContent>
        {loading ? (
          <>
            <NavItemsSkeleton itemLength={data.navMain.length} />
            <NavItemsSkeleton itemLength={data.navAdmin.length} />
          </>
        ) : (
          <>
            <NavMain items={data.navMain} />
            {user?.role === "admin" && <NavAdmin items={data.navAdmin} />}
          </>
        )}
      </SidebarContent>
      <SidebarFooter>
        {loading ? (
          <NavUserSkeleton />
        ) : (
          <NavUser user={user ?? { name: "", email: "", role: "" }} />
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
