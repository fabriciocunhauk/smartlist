import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { classNames } from "./utils/appearance";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastMessageProvider } from "./context/ToastMessageContext";
import Toast from "./components/Toast";

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
    "Looking for an easy way to manage your shopping lists and find the best deals? SmartList Price Comparison is here to help! Our intuitive tool lets you create and organize shopping lists effortlessly while comparing prices across multiple stores to ensure you always get the best deal. Whether you're saving on groceries, electronics, or household essentials, SmartList saves you time and money. Try it today and discover how simple shopping can be!",
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

      <ToastMessageProvider>
        <ThemeProvider>
          <body
            className={classNames(
              `${geistSans.variable} ${geistMono.variable} antialiased text-darkGray`,
              "flex flex-col justify-between"
            )}
          >
            <Toast />
            <main className="flex-grow">{children}</main>
            <Analytics />
          </body>
        </ThemeProvider>
      </ToastMessageProvider>
    </html>
  );
}
