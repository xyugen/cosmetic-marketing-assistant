"use client";

import { IconoirFacebook } from "@/assets/icons/Facebook";
import LoadingButton from "@/components/forms/loading-button";
import { PageRoutes } from "@/constants/page-routes";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

const SocialsAuth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const signInWithFacebook = async () => {
    setIsLoading(true);

    return await authClient.signIn.social({
      provider: "facebook",
      callbackURL: PageRoutes.DASHBOARD,
    });
  };

  return (
    <div className="mt-3 space-y-3">
      {/* Google Auth */}
      {/* <Button
        type="button"
        className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
      >
        <span className="mr-2 inline-block">
          <MynauiGoogle className="size-6 text-red-600" />
        </span>
        Sign in with Google
      </Button> */}

      {/* Facebook Auth */}
      <LoadingButton
        variant={"outline"}
        className="relative inline-flex w-full items-center justify-center"
        onClick={async () => await signInWithFacebook()}
        isLoading={isLoading}
      >
        <span className="mr-2 inline-block">
          <IconoirFacebook className="size-6 text-blue-600" />
        </span>
        Sign in with Facebook
      </LoadingButton>
    </div>
  );
};

// const

export default SocialsAuth;
