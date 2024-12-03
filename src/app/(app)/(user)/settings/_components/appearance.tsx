"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Laptop, MonitorSmartphone, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const AppearanceSettings = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Laptop className="h-5 w-5 text-primary" />
          <CardTitle className="text-lg font-semibold">Appearance</CardTitle>
        </div>
        <CardDescription className="text-sm text-muted-foreground">
          Customize the appearance of the application
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label className="text-base font-medium">Theme</Label>
          <p className="text-sm text-muted-foreground">
            Choose the theme for the application interface
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Light Theme Button */}
          <Button
            variant="outlineNoHover"
            className={cn(
              "flex h-28 flex-col items-center justify-center gap-2 rounded-lg p-4 shadow-sm transition-all duration-200 hover:shadow-md",
              "bg-gradient-to-br from-white to-gray-100 text-gray-800",
              theme === "light"
                ? "ring-2 ring-primary"
                : "hover:ring-1 hover:ring-muted",
            )}
            onClick={() => setTheme("light")}
          >
            <Sun className="h-8 w-8 text-yellow-500" />
            <div className="text-sm font-medium">Light</div>
          </Button>

          {/* Dark Theme Button */}
          <Button
            variant="outlineNoHover"
            className={cn(
              "flex h-28 flex-col items-center justify-center gap-2 rounded-lg p-4 shadow-sm transition-all duration-200 hover:shadow-md",
              "bg-gradient-to-br from-gray-800 to-gray-900 text-white",
              theme === "dark"
                ? "ring-2 ring-primary"
                : "hover:ring-1 hover:ring-muted",
            )}
            onClick={() => setTheme("dark")}
          >
            <Moon className="h-8 w-8 text-blue-400" />
            <div className="text-sm font-medium">Dark</div>
          </Button>

          {/* System Theme Button */}
          <Button
            variant="outlineNoHover"
            className={cn(
              "flex h-28 flex-col items-center justify-center gap-2 rounded-lg p-4 shadow-sm transition-all duration-200 hover:shadow-md",
              "bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800",
              theme === "system"
                ? "ring-2 ring-primary"
                : "hover:ring-1 hover:ring-muted",
            )}
            onClick={() => setTheme("system")}
          >
            <MonitorSmartphone className="h-8 w-8 text-green-500" />
            <div className="text-sm font-medium">System</div>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppearanceSettings;
