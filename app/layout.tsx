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
import CookieConsent from "./components/CookieConsent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://smart-list.co.uk"),
  title: "SmartList",
  description:
    "Looking for an easy way to manage your shopping lists and find the best deals? SmartList Price Comparison is here to help! Our intuitive tool lets you create and organize shopping lists effortlessly while comparing prices across multiple stores to ensure you always get the best deal. Whether you're saving on groceries, electronics, or household essentials, SmartList saves you time and money. Try it today and discover how simple shopping can be!",
  alternates: {
    canonical: "/",
  },
  other: {
    "google-adsense-account": "ca-pub-7386584956005563",
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
        
        {/* WebApplication Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "SmartList",
              url: "https://smart-list.co.uk",
              description:
                "UK grocery price comparison PWA. Compare Tesco, Aldi, and Sainsbury's prices and save on your weekly shop.",
              applicationCategory: "ShoppingApplication",
              operatingSystem: "All",
              browserRequirements: "Requires JavaScript",
              offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
              areaServed: { "@type": "Country", name: "United Kingdom" },
              publisher: {
                "@type": "Organization",
                name: "SmartList",
                url: "https://smart-list.co.uk",
              },
            }),
          }}
        />

        {/* Google AdSense */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7386584956005563"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* Google Analytics & Consent Mode v2 */}
        {gaId && (
          <>
            <Script id="google-consent-mode" strategy="beforeInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                
                try {
                  const savedConsent = localStorage.getItem('cookie-consent-v2');
                  if (savedConsent) {
                    const consent = JSON.parse(savedConsent);
                    gtag('consent', 'default', {
                      'ad_storage': consent.marketing ? 'granted' : 'denied',
                      'ad_user_data': consent.marketing ? 'granted' : 'denied',
                      'ad_personalization': consent.marketing ? 'granted' : 'denied',
                      'analytics_storage': consent.analytics ? 'granted' : 'denied'
                    });
                  } else {
                    gtag('consent', 'default', {
                      'ad_storage': 'denied',
                      'ad_user_data': 'denied',
                      'ad_personalization': 'denied',
                      'analytics_storage': 'denied'
                    });
                  }
                } catch (e) {
                  gtag('consent', 'default', {
                    'ad_storage': 'denied',
                    'ad_user_data': 'denied',
                    'ad_personalization': 'denied',
                    'analytics_storage': 'denied'
                  });
                }
              `}
            </Script>
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
              "flex flex-col justify-between min-h-screen"
            )}
          >
            <Toast />
            <CookieConsent />
            <main className="flex-grow md:flex md:flex-col">{children}</main>
            <Footer />
            <Analytics />
          </body>
        </ThemeProvider>
      </ToastMessageProvider>
    </html>
  );
}
