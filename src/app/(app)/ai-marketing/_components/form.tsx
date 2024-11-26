"use client";

import { objectSchema } from "@/app/api/chat/use-object/schema";
import { AutosizeTextarea } from "@/components/forms/autosize-textarea";
import SubmitButton from "@/components/forms/submit-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Toggle } from "@/components/ui/toggle";
import { zodResolver } from "@hookform/resolvers/zod";
import { experimental_useObject as useObject } from "ai/react";
import {
  Briefcase,
  Hash,
  Heart,
  Laugh,
  Leaf,
  Shield,
  SmilePlus,
  Sparkles,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { useChatContext } from "./chat-context";
import { formSchema } from "./schema";

export const tones = [
  {
    title: "Natural",
    value: "natural",
    icon: Leaf,
  },
  {
    title: "Playful",
    value: "playful",
    icon: Laugh,
  },
  {
    title: "Elegant",
    value: "elegant",
    icon: Sparkles,
  },
  {
    title: "Confident/Bold",
    value: "confident/bold",
    icon: Shield,
  },
  {
    title: "Soft/Romantic",
    value: "soft/romantic",
    icon: Heart,
  },
  {
    title: "Professional",
    value: "professional",
    icon: Briefcase,
  },
  {
    title: "Trendy/Edgy",
    value: "trendy/edgy",
    icon: Star,
  },
];

const MarketingForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productDescription: "",
      emojis: false,
      hashtags: false,
      tone: "natural",
    },
  });

  const { setObject } = useChatContext();
  const { object, submit } = useObject({
    api: "/api/chat/use-object",
    schema: objectSchema,
    onFinish: () => {
      setIsLoading(false);
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      submit({
        message: `
        Product Name: "Radiant Serum"
        Product Description: "${values.productDescription}"
        Emojis: ${values.emojis ? '"Yes"' : '"No"'}
        Hashtags: ${values.hashtags ? '"Yes"' : '"No"'}
        Tone: "${values.tone}"
        `,
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  };

  useEffect(() => {
    try {
      if (object?.productMarketing?.error) {
        form.setError("productDescription", {
          message: object.productMarketing.error,
        });
      }

      if (object)
        setObject((prev) => {
          if (prev !== object) {
            return { ...object };
          }
          return prev;
        });
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }, [object, setObject, form]);

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormField
          control={form.control}
          name="productDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product description</FormLabel>
              <FormControl>
                <AutosizeTextarea
                  {...field}
                  className="resize-none"
                  placeholder="Describe your product... (i.e. A skincare serum that revitalizes and hydrates your skin)"
                  minHeight={72}
                  maxHeight={124}
                  required
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Toolbar */}
        <div className="flex items-center justify-between">
          {/* Toggle */}
          <div className="flex items-center space-x-2">
            <FormField
              control={form.control}
              name="emojis"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Toggle
                      pressed={field.value}
                      onPressedChange={field.onChange}
                      aria-label="Toggle emojis"
                      variant={"outline"}
                    >
                      <SmilePlus className="size-4" />
                      EMOJIS
                    </Toggle>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="hashtags"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Toggle
                      pressed={field.value}
                      onPressedChange={field.onChange}
                      aria-label="Toggle hashtags"
                      variant={"outline"}
                    >
                      <Hash className="size-4" />
                      HASHTAGS
                    </Toggle>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* Select */}
          <FormField
            control={form.control}
            name="tone"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-2 space-y-0">
                <FormLabel className="hidden md:block">Tone</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a tone" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {tones.map((tone) => (
                      <SelectItem key={tone.value} value={tone.value}>
                        <div className="flex w-full flex-row items-center gap-2">
                          {tone.icon && <tone.icon className="size-4" />}
                          <span className="text-sm font-medium">
                            {tone.title}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
        <SubmitButton className="w-full" isLoading={isLoading}>
          Generate Marketing Content
        </SubmitButton>
      </form>
    </Form>
  );
};

export type Tones = (typeof tones)[number];

export default MarketingForm;
