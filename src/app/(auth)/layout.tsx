import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "../globals.css";
import { absoluteUrl } from "@/lib/utils";
import { siteConfig } from "@/config/site";

import { TailwindIndicator } from "@/components/tailwind-indicator";
import { MainNav } from "@/components/layout/main.nav";
import { MobileNav } from "@/components/layout/mobile-nav";
import { BaseHeader } from "@/components/layout/base-header";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "nextjs",
    "react",
    "react server components",
    "skateshop",
    "skateboarding",
    "kickflip",
  ],
  authors: [
    {
      name: "Subha",
      url: "https://www.sadmn.com",
    },
  ],
  creator: "Subha",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: "@sadmann17",
  },
  icons: {
    icon: "/icon.png",
  },
  manifest: absoluteUrl("/site.webmanifest"),
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />

      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <main className="flex justify-center">{children}</main>

        <TailwindIndicator />
      </body>
    </html>
  );
}
