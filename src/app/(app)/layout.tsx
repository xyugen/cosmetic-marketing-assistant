import { PageRoutes } from "@/constants/page-routes";
import { auth } from "@/lib/auth";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { type PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Dashboard - D’Shine",
  description: "Your AI-driven marketing and customer engagement tool.",
};

const Layout = async (props: PropsWithChildren) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect(PageRoutes.LOGIN);
  }
  
  return (
    <>
      {props.children}
    </>
  );
};

export default Layout;
