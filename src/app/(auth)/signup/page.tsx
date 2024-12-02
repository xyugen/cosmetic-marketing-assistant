import { PageRoutes } from "@/constants/page-routes";
import { type Metadata } from "next";
import Link from "next/link";
import SignUpForm from "./_components/form";

export const metadata: Metadata = {
  title: "Sign Up",
};

const Page = () => {
  return (
    <section className="flex size-full flex-col items-center justify-center overflow-y-auto p-6 lg:p-12">
      <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
        <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
          Create your new account!
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href={PageRoutes.LOGIN}
            title="Sign In"
            className="font-semibold text-black transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>

        <SignUpForm />

        {/* <OrDivider /> */}

        {/* <SocialsAuth /> */}
      </div>
    </section>
  );
};

export default Page;
