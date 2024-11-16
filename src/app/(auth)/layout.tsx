import { PageRoutes } from "@/constants/page-routes";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { type PropsWithChildren } from "react";

const Layout = async (props: PropsWithChildren) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect(PageRoutes.DASHBOARD);
  }

  return <main>{props.children}</main>;
};

export default Layout;
