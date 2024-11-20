/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { customModel } from "@/lib/ai";
import { models } from "@/lib/ai/models";
import { systemPrompt } from "@/lib/ai/prompts";
import { auth } from "@/lib/auth";
import {
  convertToCoreMessages,
  type Message,
  streamObject
} from "ai";
import { type NextRequest, NextResponse } from "next/server";
import { objectSchema } from "./schema";

export const maxDuration = 30;

export const POST = async (request: NextRequest) => {
  try {
    const {
      // id, // Might be needed in the future
      message,
      modelId,
      additionalSystemPrompt,
    }: {
      id: string;
      message: string;
      modelId: string;
      additionalSystemPrompt?: string;
    } = await request.json();

    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    
    const model = models.find((model) => model.id === modelId);
    if (modelId && !model) {
      return new NextResponse("Model not found", { status: 404 });
    }
    
    const result = await streamObject({
      model: customModel(model?.apiIdentifier),
      temperature: 0.3,
      output: "object",
      schema: objectSchema,
      system: `${systemPrompt}\n${additionalSystemPrompt ?? ""}`,
      prompt: message,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(error.message, { status: 500 });
    }
  }
};
