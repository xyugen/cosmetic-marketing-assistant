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
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { type z } from "zod";
import { formSchema } from "./schema";

const AddEmailForm = ({ className }: { className?: string }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const authorizeEmailMutation = api.auth.authorizeEmail.useMutation();
  const { refetch } = api.auth.getAuthorizedEmails.useQuery();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const toastId = toast.loading("Authorizing email...");
    try {
      await authorizeEmailMutation.mutateAsync({ email: values.email });
      toast.success("Email authorized successfully!", { id: toastId });
      form.reset();
      await refetch();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, { id: toastId });
      }
    }
  };

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Add Authorized Email</CardTitle>
        <CardDescription>
          Add a new email address to grant system access
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SubmitButton formState={form.formState}>
              Authorize Email
            </SubmitButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AddEmailForm;
