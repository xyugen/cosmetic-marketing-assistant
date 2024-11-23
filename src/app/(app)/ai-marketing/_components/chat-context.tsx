"use client";

import { type PartialObjectSchema } from "@/app/api/chat/use-object/schema";
import { type Message } from "ai";
import React, { createContext, useContext, useState } from "react";

interface ChatContextProps {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  object: PartialObjectSchema | undefined;
  setObject: React.Dispatch<React.SetStateAction<PartialObjectSchema | undefined>>;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [object, setObject] = useState<PartialObjectSchema | undefined>({});

  return (
    <ChatContext.Provider value={{ messages, setMessages, object, setObject }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};
