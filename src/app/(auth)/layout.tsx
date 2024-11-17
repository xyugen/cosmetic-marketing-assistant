import { PageRoutes } from "@/constants/page-routes";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { type PropsWithChildren } from "react";
import HeroSection from "./_components/hero-section";

const Layout = async (props: PropsWithChildren) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect(PageRoutes.DASHBOARD);
  }

  return (
    <main className="grid h-screen lg:grid-cols-2">
      {props.children}

      {/* Hero section */}
      <HeroSection />
    </main>
  );
};

export default Layout;
