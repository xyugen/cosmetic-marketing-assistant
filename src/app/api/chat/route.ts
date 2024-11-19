/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { customModel } from "@/lib/ai";
import { models } from "@/lib/ai/models";
import { systemPrompt } from "@/lib/ai/prompts";
import { auth } from "@/lib/auth";
import {
  convertToCoreMessages,
  type Message,
  StreamData,
  streamText,
} from "ai";
import { type NextRequest, NextResponse } from "next/server";

export const maxDuration = 30;

export const POST = async (request: NextRequest) => {
  try {
    const {
      // id, // Might be needed in the future
      messages,
      modelId,
    }: { id: string; messages: Array<Message>; modelId: string } =
      await request.json();

    // Authenticate user
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Find the selected model
    const model = models.find((model) => model.id === modelId);
    if (!model) {
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
      model: customModel(model.apiIdentifier),
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content: systemPrompt,
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
