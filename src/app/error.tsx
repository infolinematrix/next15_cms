"use client"; // Error components must be Client Components
import "./globals.css";

import * as React from "react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import localFont from "next/font/local";
import { Metadata } from "next";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Not Found",
};

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // eslint-disable-next-line no-console
    console.error(error);
  }, [error]);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <main>
          <section className="bg-white">
            <div className="flex items-center min-h-screen px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
              <div className="w-full space-y-6 text-center">
                <div className="space-y-3">
                  <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl animate-pulse">
                    Something went wrong!
                  </h1>
                  <p className="text-gray-500">
                    Looks like you've ventured into the unknown digital realm.
                  </p>
                </div>
                <button
                  onClick={
                    // Attempt to recover by trying to re-render the segment
                    () => reset()
                  }
                >
                  Try again
                </button>
              </div>
            </div>
          </section>
        </main>
      </body>
    </html>
  );
}
