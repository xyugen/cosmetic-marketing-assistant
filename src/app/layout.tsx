import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";

import { TRPCReactProvider } from "@/trpc/react";

export const metadata: Metadata = {
  title: {
    template: "%s - D’Shine",
    default: "D’Shine",
  },
  description: "Your AI-driven marketing and customer engagement tool.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`} suppressHydrationWarning> 
      <body>
        <NextTopLoader color="#3849ff" showSpinner={true} />
        <Toaster />
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
