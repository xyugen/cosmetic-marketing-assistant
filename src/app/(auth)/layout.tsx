import { Badge } from "@/components/ui/badge";
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
      <section className="flex size-full flex-col items-center justify-center overflow-y-auto p-6 lg:p-12">
        <Badge className="lg:hidden text-base sm:text-lg">D’Shine</Badge>
        {props.children}
      </section>

      {/* Hero section */}
      <HeroSection />
    </main>
  );
};

export default Layout;
