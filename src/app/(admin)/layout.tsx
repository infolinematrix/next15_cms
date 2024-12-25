import type { Metadata, Viewport } from "next";

import "@/app/globals.css";
import { siteConfig } from "@/config/site";

import { TailwindIndicator } from "@/components/tailwind-indicator";

import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: {
    default: "Administration",
    template: `%s - Administration`,
  },
  description: siteConfig.description,

  authors: [
    {
      name: "Subha",
      url: "https://www.sadmn.com",
    },
  ],

  icons: {
    icon: "/icon.png",
  },
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased"
          // GeistSans.variable,
          // GeistMono.variable
        )}
      >
        <main className="flex justify-start ">{children}</main>

        <TailwindIndicator />
        <Toaster />
      </body>
    </html>
  );
}
