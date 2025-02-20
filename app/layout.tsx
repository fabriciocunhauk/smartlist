import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { classNames } from "./utils/appearance";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { ThemeProvider } from "./components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SmartList",
  description:
    "Streamline your shopping with SmartList, the ultimate tool for organizing, price comparison, and deal hunting.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon.png"
          sizes="180x180"
        />
        <link rel="mask-icon" href="/mask-icon.svg" color="#FFFFFF" />
      </head>

      <ThemeProvider>
        <body
          className={classNames(
            `${geistSans.variable} ${geistMono.variable} antialiased text-darkGray`,
            "flex flex-col justify-between"
          )}
        >
          <main className="flex-grow">{children}</main>
          <Analytics />
        </body>
      </ThemeProvider>
    </html>
  );
}
