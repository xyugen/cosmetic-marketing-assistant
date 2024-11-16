import { PageRoutes } from "@/constants/page-routes";
import { type Metadata } from "next";
import Link from "next/link";
import HeroSection from "../_components/hero-section";
import OrDivider from "../_components/or-divider";
import SocialsAuth from "../_components/socials-auth";
import SignUpForm from "./_components/form";

export const metadata: Metadata = {
  title: "Sign Up - D’Shine",
  description: "Your AI-driven marketing and customer engagement tool.",
};

const Page = () => {
  return (
    <div className="grid h-screen lg:grid-cols-2">
      {/* Sign up section */}
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

          <OrDivider />

          <SocialsAuth />
        </div>
      </section>

      {/* Hero section */}
      <HeroSection />
    </div>
  );
};

export default Page;
