"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import logo from "@/public/images/smart-list-logo.svg";
import { useTheme } from "../context/ThemeContext";
import { classNames } from "../utils/appearance";
import AdSense from "./AdSense";

const NO_AD_PATHS = [
  "/privacy-policy",
  "/terms-of-service",
  "/about-us",
  "/faq",
  "/share",
];

function Footer() {
  const { theme } = useTheme();
  const pathname = usePathname();
  const shouldShowAd = !NO_AD_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );

  // Adjust colors dynamically based on the active theme
  const isLightTheme = theme.id === 1; // Theme ID 1 is Orange

  const textSecondaryClass = isLightTheme 
    ? "text-slate-700/80" 
    : "text-white/70";

  const linkClass = isLightTheme
    ? "text-slate-700 hover:text-slate-900 transition-colors duration-200"
    : "text-white/80 hover:text-white transition-colors duration-200";

  const portfolioClass = isLightTheme
    ? "text-slate-700 hover:text-slate-900 transition-colors duration-200 underline underline-offset-4 decoration-slate-400 hover:decoration-slate-600"
    : "text-white/80 hover:text-white transition-colors duration-200 underline underline-offset-4 decoration-white/30 hover:decoration-white/60";

  const copyrightClass = isLightTheme
    ? "flex flex-col items-center md:items-end gap-2 text-xs text-slate-700/80 font-medium"
    : "flex flex-col items-center md:items-end gap-2 text-xs text-white/70 font-medium";

  return (
    <footer
      className={classNames(
        "hidden md:block w-full border-t border-slate-200/50 pt-6 pb-10 px-8 transition-all duration-300",
        theme.primary
      )}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Desktop Footer Ad Unit — only shown on content pages */}
        {shouldShowAd && (
          <div className="w-full flex justify-center">
            <AdSense adSlot="3727793913" className="w-full max-w-[728px] m-0 p-0" />
          </div>
        )}

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left Side: Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <Link href="/" className="w-36 flex items-center">
              <Image
                src={logo.src}
                alt="Logo"
                width={logo.width}
                height={logo.height}
                priority={true}
                className="brightness-90 contrast-125"
                style={theme.id !== 1 ? { filter: "brightness(0) invert(1)" } : undefined}
              />
            </Link>
            <p className={classNames("text-xs font-medium tracking-wide", textSecondaryClass)}>
              Smart shopping starts here.
            </p>
          </div>

          {/* Middle Side: Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold">
            <Link href="/how-it-works" className={linkClass}>
              How It Works
            </Link>
            <Link href="/blog" className={linkClass}>
              Blog
            </Link>
            <Link href="/about-us" className={linkClass}>
              About Us
            </Link>
            <Link href="/faq" className={linkClass}>
              FAQ
            </Link>
            <Link href="/privacy-policy" className={linkClass}>
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className={linkClass}>
              Terms of Service
            </Link>
          </div>

          {/* Right Side: Copyright & Portfolio */}
          <div className={copyrightClass}>
            <Link
              href="https://fabriciocunha.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className={portfolioClass}
            >
              Developer Portfolio
            </Link>
            <p className="tracking-wide">
              © {new Date().getFullYear()} Smart List. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
