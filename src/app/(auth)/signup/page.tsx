import { PageRoutes } from "@/constants/page-routes";
import { type Metadata } from "next";
import Link from "next/link";
import SignUpForm from "./_components/form";

export const metadata: Metadata = {
  title: "Sign Up",
};

const Page = () => {
  return (
    <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
      <h2 className="text-3xl font-bold leading-tight text-foreground sm:text-4xl">
        Create your new account!
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link
          href={PageRoutes.LOGIN}
          title="Sign In"
          className="font-semibold text-foreground transition-all duration-200 hover:underline"
        >
          Sign In
        </Link>
      </p>

      <SignUpForm />

      {/* <OrDivider /> */}

      {/* <SocialsAuth /> */}
    </div>
  );
};

export default Page;
