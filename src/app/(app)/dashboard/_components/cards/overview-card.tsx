import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

const OverviewCard = ({
  icon: Icon,
  iconClassName: iconClassName,
  title,
  data,
  subTitle,
}: {
  icon: LucideIcon;
  iconClassName?: string;
  title: string;
  data: string;
  subTitle: string;
}) => {
  return (
    <Card className="relative">
      <Icon
        className={cn(
          "absolute right-6 top-6 size-10 rounded-full bg-primary p-2 text-primary-foreground",
          iconClassName,
        )}
      />
      <CardHeader className="font-medium">{title}</CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 font-semibold">
          <span>{data}</span>
        </div>
        <small className="text-muted-foreground">{subTitle}</small>
      </CardContent>
    </Card>
  );
};

export default OverviewCard;
