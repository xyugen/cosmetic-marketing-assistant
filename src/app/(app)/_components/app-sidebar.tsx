"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import {
  ChartArea,
  LayoutDashboard,
  ShoppingBag,
  Sparkles,
  Users,
} from "lucide-react";
import NavHeader from "./nav-header";
import { type MainNavItem, NavMain } from "./nav-main";
import { NavUser, type UserItem } from "./nav-user";
import NavUserSkeleton from "./nav-user-skeleton";

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
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <NavHeader />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        {loading ? (
          <NavUserSkeleton />
        ) : (
          <NavUser user={user ?? { name: "", email: "" }} />
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
