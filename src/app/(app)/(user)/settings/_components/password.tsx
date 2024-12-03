"use client";

import PasswordInput from "@/components/forms/password-input";
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
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ZodError, type z } from "zod";
import { passwordSchema } from "./schema";
import ConfirmDialog from "@/components/dialogs/alert-dialog";
import { useState } from "react";

const PasswordSettings = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof passwordSchema>) => {
    const toastId = toast.loading("Updating password...");
    try {
      const { error } = await authClient.changePassword({
        newPassword: values.newPassword,
        currentPassword: values.currentPassword,
        revokeOtherSessions: true,
      });

      if (error) {
        throw new Error(error.message);
      }

      toast.success("Password updated successfully!", { id: toastId });
    } catch (error) {
      if (error instanceof Error || error instanceof ZodError) {
        toast.error(error.message, { id: toastId });
      }
    }

    setIsDialogOpen(false);
    form.reset();
  };

  return (
    <>
      <ConfirmDialog
        title="Are you sure?"
        description="Are you sure you want to change your password?"
        onConfirm={form.handleSubmit(onSubmit)}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        isLoading={form.formState.isSubmitting}
      />
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <KeyRound className="size-5" />
            <CardTitle>Change Password</CardTitle>
          </div>
          <CardDescription>
            Update your password to keep your account secure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setIsDialogOpen(true);
              }}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Current Password</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmNewPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <SubmitButton formState={form.formState}>
                Update Password
              </SubmitButton>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};

export default PasswordSettings;
