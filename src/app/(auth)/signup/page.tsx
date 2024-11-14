import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageRoutes } from "@/constants/page-routes";
import { User } from "lucide-react";
import Link from "next/link";
import HeroSection from "../_components/hero-section";
import OrDivider from "../_components/or-divider";
import SocialsAuth from "../_components/socials-auth";
import PasswordInput from "@/components/forms/password-input";

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
          <form action="#" method="POST" className="mt-8">
            <div className="space-y-5">
              <div>
                <Label
                  htmlFor="full-name"
                  className="text-base font-medium text-gray-900"
                >
                  Full Name
                </Label>
                <div className="mt-2">
                  <Input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="text"
                    placeholder="Full Name"
                    id="full-name"
                    required
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor="email"
                  className="text-base font-medium text-gray-900"
                >
                  Email address
                </Label>
                <div className="mt-2">
                  <Input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    id="email"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-base font-medium text-gray-900"
                  >
                    Password
                  </Label>
                </div>
                <div className="mt-2">
                  <PasswordInput
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Password"
                    id="password"
                    required
                  />
                </div>
              </div>

              <div>
                <Label
                  htmlFor="confirm-password"
                  className="text-base font-medium text-gray-900"
                >
                  Confirm password
                </Label>
                <div className="mt-2">
                  <PasswordInput
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Confirm Password"
                    id="confirm-password"
                    required
                  />
                </div>
              </div>
              <div>
                <Button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Create Account <User className="ml-1 size-4" />
                </Button>
              </div>
            </div>
          </form>

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
