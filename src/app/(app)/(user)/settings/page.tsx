import AppearanceSettings from "./_components/appearance";
import PasswordSettings from "./_components/password";
import ProfileSettings from "./_components/profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
};

export default async function Page() {
  return (
    <div className="container mx-auto max-w-5xl space-y-8 py-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid gap-6">
        <ProfileSettings />

        <PasswordSettings />

        <AppearanceSettings />
      </div>
    </div>
  );
}
