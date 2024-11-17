import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { Orbit } from "lucide-react";

const NavHeader = () => {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex w-full items-center gap-2 overflow-hidden rounded-md text-left text-sm transition-[width,height,padding] group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent group-data-[collapsible=icon]:!size-8">
          {/* TODO: Logo here instead of placeholder */}
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Orbit className="size-4" />
          </div>

          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">D&apos;Shine</span>
          </div>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default NavHeader;