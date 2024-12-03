import React from "react";
import { ChatInterface } from "./_components/chat-interface";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Assistant",
};

const Page = () => {
  return (
    <div className="flex flex-1 flex-col">
      <ChatInterface />;
    </div>
  );
};

export default Page;
