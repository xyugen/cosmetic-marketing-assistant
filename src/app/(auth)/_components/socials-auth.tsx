import { IconoirFacebook } from "@/assets/icons/Facebook";
import { Button } from "@/components/ui/button";

const SocialsAuth = () => {
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
      <Button
        type="button"
        className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
      >
        <span className="mr-2 inline-block">
          <IconoirFacebook className="size-6 text-blue-600" />
        </span>
        Sign in with Facebook
      </Button>
    </div>
  );
}

export default SocialsAuth