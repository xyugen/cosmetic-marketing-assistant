import { customModel } from "@/lib/ai";
import { models } from "@/lib/ai/models";
import { analyticsSystemPrompt } from "@/lib/ai/prompts";
import { auth } from "@/lib/auth";
import {
  convertToCoreMessages,
  StreamData,
  streamText
} from "ai";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const POST = async (request: NextRequest) => {
  try {
    const bodySchema = z.object({
      messages: z.array(
        z.object({ role: z.literal("user"), content: z.string() }),
      ),
      modelId: z.string(),
      additionalSystemPrompt: z.string().optional(),
    });

    const requestData = bodySchema.safeParse(await request.json());
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
        ...coreMessages,
      ],
      onChunk: (chunk) => {
        streamingData.append(chunk);
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
