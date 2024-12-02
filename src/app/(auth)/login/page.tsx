import { PageRoutes } from "@/constants/page-routes";
import { type Metadata } from "next";
import Link from "next/link";
import LoginForm from "./_components/form";

export const metadata: Metadata = {
  title: "Login",
};

const Page = () => {
  return (
    <section className="flex flex-col items-center justify-center overflow-y-scroll p-6 lg:p-12">
      <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
          Login to your account!
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link
            href={PageRoutes.SIGNUP}
            title="Sign Up"
            className="font-semibold text-black transition-all duration-200 hover:underline"
          >
            Create a free account
          </Link>
        </p>

        <LoginForm />

        {/* <OrDivider /> */}

        {/* <SocialsAuth /> */}
      </div>
    </section>
  );
};

export default Page;
