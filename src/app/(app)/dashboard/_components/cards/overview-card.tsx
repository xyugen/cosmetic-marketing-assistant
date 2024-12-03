import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

interface DataCardProps {
  icon: LucideIcon;
  title: string;
  mainData: string | number | undefined;
  additionalInfo?: string | number | undefined;
  isLoading?: boolean;
  className?: string;
}

const OverviewCard = ({
  icon: Icon,
  title,
  mainData,
  additionalInfo,
  isLoading,
  className,
}: DataCardProps) => {
  return (
    <div
      className={cn(
        "relative border-b border-r-muted-foreground/20 p-6 lg:border-b-0 lg:border-r",
        className,
      )}
    >
      {isLoading ? (
        <>
          <Skeleton className="absolute right-6 top-6 size-10 rounded-full bg-primary p-2 text-primary-foreground sm:size-8 md:size-10" />
          <div className="flex w-full flex-col space-y-1.5 font-medium">
            {title}
          </div>
          <div className="space-y-2">
            <Skeleton className="flex h-6 w-28 items-center gap-2 font-semibold" />
            <Skeleton className="flex h-4 w-28 items-center gap-2 font-semibold" />
          </div>
        </>
      ) : (
        <>
          <Icon className="absolute right-6 top-6 size-10 rounded-full bg-primary p-2 text-primary-foreground shadow-sm" />
          <div className="flex w-full flex-col space-y-1.5 font-medium">
            {title}
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xl font-semibold">
              <span>{mainData}</span>
            </div>
            {additionalInfo && (
              <small className="text-muted-foreground">{additionalInfo}</small>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default OverviewCard;
