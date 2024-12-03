"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { generateId } from "ai";
import { type Message, useChat } from "ai/react";
import { Loader2, Send, Wrench } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

export function ChatInterface() {
  const { messages, input, setInput, append } = useChat({
    api: "/api/chat/analytics",
  });
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content: input,
    };
    setLoading(true);
    setInput("");
    const toastId = toast.loading("Sending message...");
    try {
      await append(userMessage);
      setLoading(false);

      toast.dismiss(toastId);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message, { id: toastId });
      }
    }

    console.log(messages);
  };

  return (
    <div className="flex h-full flex-1 flex-col">
      {/* Chat messages */}
      <ScrollArea className="flex-grow p-4">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <React.Fragment key={index}>
              {message.content && (
                <div
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <Markdown
                    className={`max-w-[80%] rounded-lg p-4 text-sm ${
                      message.role === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white"
                    }`}
                  >
                    {message.content}
                  </Markdown>
                </div>
              )}
              {message.toolInvocations?.map((toolInvocation) => (
                <div className="mt-2 flex w-full items-center space-x-2">
                  <div className="flex items-center space-x-2 bg-primary rounded-sm p-2">
                    <Wrench className="size-4 text-primary-foreground" />
                    <span className="text-sm font-medium text-primary-foreground">
                      {toolInvocation.toolName}
                    </span>
                  </div>
                </div>
              ))}
            </React.Fragment>
          ))}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input area */}
      <div className="flex w-full items-center justify-center border-t bg-background p-4">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await sendMessage();
          }}
          className="flex w-full items-center space-x-2"
        >
          <Input
            placeholder="Ask about your analytics data..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={loading || !input}>
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
