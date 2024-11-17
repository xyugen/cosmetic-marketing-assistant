import { Button } from "@/components/ui/button";
import { PageRoutes } from "@/constants/page-routes";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex size-full items-center justify-center">
      <div className="m-2 flex size-fit flex-col items-center gap-2 text-center md:size-3/5">
        <div className="border-red-ribbon-300 bg-red-ribbon-200 text-red-ribbon-600 w-fit rounded-3xl border px-2 py-1">
          404
        </div>
        <h2 className="text-4xl font-bold">Not Found</h2>
        <p className="text-xl">
          The page you are looking for might have been removed or had its name
          changed or is temporarily unavailable.
        </p>
        <Button variant={"outline"} size={"lg"}>
          <Link href={PageRoutes.HOME} className="text-lg">
            HOMEPAGE
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;