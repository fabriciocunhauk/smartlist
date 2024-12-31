import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { classNames } from "./utils/appearance";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={classNames(
          `${geistSans.variable} ${geistMono.variable} antialiased`,
          "flex flex-col justify-between h-screen"
        )}
      >
        <header className="flex items-center justify-center h-16 text-xl font-semibold">
          <h1>ShopWize</h1>
        </header>

        <main className="flex-grow">{children}</main>

        <footer>
          <Navbar />
        </footer>
      </body>
    </html>
  );
}
