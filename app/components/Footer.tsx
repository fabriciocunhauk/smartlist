"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/images/smart-list-logo.svg";
import { useTheme } from "../context/ThemeContext";
import { classNames } from "../utils/appearance";

function Footer() {
  const { theme } = useTheme();

  return (
    <footer
      className={classNames(
        "hidden md:block w-full border-t border-slate-200/50 py-10 px-8 transition-all duration-300",
        theme.primary
      )}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
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
            />
          </Link>
          <p className="text-xs text-slate-500 font-medium tracking-wide">
            Smart shopping starts here.
          </p>
        </div>


        {/* Right Side: Copyright & Portfolio */}
        <div className="flex flex-col items-center md:items-end gap-2 text-xs text-slate-500 font-medium">
          <Link
            href="https://fabriciocunha.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-800 transition-colors duration-200 underline underline-offset-4 decoration-slate-300 hover:decoration-slate-500"
          >
            Developer Portfolio
          </Link>
          <p className="tracking-wide">
            © {new Date().getFullYear()} Smart List. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
