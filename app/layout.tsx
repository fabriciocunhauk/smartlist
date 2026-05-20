import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { classNames } from "./utils/appearance";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastMessageProvider } from "./context/ToastMessageContext";
import Toast from "./components/Toast";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.smart-list.co.uk"),
  title: "SmartList",
  description:
    "Looking for an easy way to manage your shopping lists and find the best deals? SmartList Price Comparison is here to help! Our intuitive tool lets you create and organize shopping lists effortlessly while comparing prices across multiple stores to ensure you always get the best deal. Whether you're saving on groceries, electronics, or household essentials, SmartList saves you time and money. Try it today and discover how simple shopping can be!",
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Disable analytics in development or local builds unless explicitly configured via env
  const gaId = process.env.NEXT_PUBLIC_GA_ID || (process.env.NODE_ENV === "production" ? "G-XXGG3TLW5C" : "");

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
        
        {/* Google Analytics (gtag.js) */}
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
      </head>

      <ToastMessageProvider>
        <ThemeProvider>
          <body
            className={classNames(
              `${geistSans.variable} ${geistMono.variable} antialiased text-darkGray`,
              "flex flex-col justify-between md:h-screen md:overflow-hidden"
            )}
          >
            <Toast />
            <main className="flex-grow md:flex md:flex-col md:overflow-hidden">{children}</main>
            <Footer />
            <Analytics />
          </body>
        </ThemeProvider>
      </ToastMessageProvider>
    </html>
  );
}
