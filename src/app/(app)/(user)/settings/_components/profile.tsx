"use client";

import SubmitButton from "@/components/forms/submit-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type { z } from "zod";
import { profileSchema } from "./schema";

const ProfileFormSkeleton = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-2">
        <Label>Full Name</Label>
        <Skeleton className="h-9" />
      </div>
      <div className="space-y-2">
        <Label>Email</Label>
        <Skeleton className="h-9" />
      </div>
    </div>
  );
};

const ProfileSettings = () => {
  const { data: session, isPending, error } = authClient.useSession();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: session?.user?.name || "",
    },
  });

  useEffect(() => {
    form.setValue("fullName", session?.user?.name || "");
  }, [form, session]);

  if (error) {
    return <div>{error.message}</div>;
  }

  const onSubmit = async (values: z.infer<typeof profileSchema>) => {
    const toastId = toast.loading("Updating profile...");
    try {
      const {} = await authClient.updateUser({
        name: values.fullName,
      });

      toast.success("Profile updated successfully!", { id: toastId });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, { id: toastId });
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <User className="h-5 w-5" />
          <CardTitle>Profile Settings</CardTitle>
        </div>
        <CardDescription>
          Update your personal information and profile settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isPending ? (
          <ProfileFormSkeleton />
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="fullName">Full Name</FormLabel>
                      <FormControl>
                        <Input id="fullName" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={session?.user?.email || ""}
                    disabled
                  />
                </div>
              </div>

              <SubmitButton formState={form.formState} className="mt-4">
                Save
              </SubmitButton>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileSettings;
