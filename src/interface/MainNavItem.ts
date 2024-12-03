import { type LucideIcon } from "lucide-react";

export interface MainNavItem {
  title: string;
  url?: string;
  icon: LucideIcon;
  items?: { title: string; url: string }[];
}