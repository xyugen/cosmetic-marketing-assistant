import { Interval } from "@/constants/interval";
import { customModel } from "@/lib/ai";
import { models } from "@/lib/ai/models";
import { analyticsSystemPrompt } from "@/lib/ai/prompts";
import {
  getCustomerLifetimeValue,
  getSalesTrend,
  getTopSpendingCustomers,
} from "@/lib/api/analytics/query";
import { searchProduct } from "@/lib/api/product/query";
import { auth } from "@/lib/auth";
import { convertToCoreMessages, StreamData, streamText, tool } from "ai";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const POST = async (request: NextRequest) => {
  try {
    const bodySchema = z.object({
      messages: z.array(
        z.object({
          role: z.enum(["system", "user", "assistant"]),
          content: z.string(),
          toolInvocation: z
            .array(
              z.object({
                toolName: z.string(),
                parameters: z.record(z.string(), z.any()),
              }),
            )
            .optional(),
        }),
      ),
      modelId: z.string().optional(),
      additionalSystemPrompt: z.string().optional(),
    });

    const requestData = bodySchema.safeParse(await request.json());
    console.log("request data", JSON.stringify(requestData));
    if (!requestData.success) {
      return new NextResponse(requestData.error.message, { status: 400 });
    }

    const { messages, modelId, additionalSystemPrompt } = requestData.data;

    // Authenticate user
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Find the selected model
    const model = models.find((model) => model.id === modelId);
    if (modelId && !model) {
      return new NextResponse("Model not found", { status: 404 });
    }

    // Convert messages to core messages
    const coreMessages = convertToCoreMessages(messages);
    if (coreMessages.length <= 0) {
      return new NextResponse("No messages found", { status: 400 });
    }

    // Limit coreMessages to a maximum of 5
    const limitedCoreMessages = coreMessages.slice(0, 5);

    // Prepare streaming data
    const streamingData = new StreamData();

    // Stream response using only the first user message
    const result = await streamText({
      model: customModel(model?.apiIdentifier),
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content: `${analyticsSystemPrompt}\n${additionalSystemPrompt ?? ""}`,
        },
        ...limitedCoreMessages,
      ],
      maxSteps: 3,
      tools: {
        getCustomerLifetimeValue: tool({
          description: "Get customer lifetime value",
          parameters: z.object({
            page: z
              .number()
              .optional()
              .describe("Pagination for the results, if requested"),
            limit: z
              .number()
              .default(10)
              .describe(
                "Default is 10 results. Limit the number of results, if requested,",
              ),
            sort: z
              .enum(["asc", "desc"])
              .optional()
              .describe(
                "Sort the lifetime value in ascending or descending order",
              ),
          }),
          execute: async ({ page, limit, sort }) => {
            if (limit > 20) {
              return "Limit must be less than 20";
            }

            const lifetimeValue = await getCustomerLifetimeValue({
              page,
              limit,
              sort,
            });

            return lifetimeValue;
          },
        }),
        searchProduct: tool({
          description: "Search and get information about a product when asked",
          parameters: z.object({
            searchTerm: z
              .string()
              .describe("Search product name to search for a product"),
            limit: z
              .number()
              .optional()
              .default(3)
              .describe(
                "Defaults to 3, limit the results to a specific number.",
              ),
          }),
          execute: async ({ searchTerm, limit }) => {
            const product = await searchProduct(searchTerm, limit);
            return product;
          },
        }),
        getSalesTrend: tool({
          description: "Get sales trend",
          parameters: z.object({
            interval: z
              .nativeEnum(Interval)
              .optional()
              .describe(
                "The interval of data to retrieve: DAYS, WEEKS, MONTHS, YEARS",
              ),
            value: z.number().optional().describe("The amount of interval"),
          }),
          execute: async ({ interval, value }) => {
            const salesTrend = await getSalesTrend({ interval, value });
            return salesTrend;
          },
        }),
        getTopSpendingCustomers: tool({
          description: "Get top spending customers",
          parameters: z.object({
            limit: z
              .number()
              // .max(20, "Limit must be less than or equal to 20")
              .optional()
              .default(3)
              .describe(
                "Defaults to 3, limit the results to a specific number.",
              ),
          }),
          execute: async ({ limit }) => {
            if (limit > 20) {
              return "Limit must be less than or equal to 20";
            }
            console.log("limit", limit);
            const topSpendingCustomers = await getTopSpendingCustomers(limit);
            return topSpendingCustomers;
          },
        }),
      },
      onChunk: (chunk) => {
        streamingData.append(JSON.stringify(chunk));
      },
      onFinish: async () => {
        await streamingData.close();
      },
    });

    return result.toDataStreamResponse({ data: streamingData });
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(error.message, { status: 500 });
    }
  }
};
