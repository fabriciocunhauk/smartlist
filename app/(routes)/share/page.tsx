"use client";
import React, { useState } from "react";
import Header from "@/app/components/Header";
import Navbar from "@/app/components/Navbar";
import Image from "next/image";
import shareQRcode from "@/public/images/share-smart-list.png";
import SocialMediaShare from "@/app/components/SocialMediaShare";
import { useTheme } from "@/app/context/ThemeContext";
import { classNames } from "@/app/utils/appearance";
import {
  IoCopyOutline,
  IoCheckmarkOutline,
  IoDownloadOutline,
} from "react-icons/io5";

function SharePage() {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);
  const shareUrl = "https://www.smart-list.co.uk";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link", err);
    }
  };

  return (
    <div
      className={classNames(
        "flex flex-col items-center justify-between min-h-screen mt-16 md:mt-0 pb-28 md:pb-12 px-4 transition-colors duration-300 ease-in-out",
        theme.secondary,
      )}
    >
      <Header />

      <main className="flex-1 flex items-center justify-center w-full max-w-md mx-auto my-auto py-6">
        <div className="w-full bg-white/70 backdrop-blur-lg border border-white/40 shadow-xl rounded-[32px] p-6 md:p-8 flex flex-col items-center text-center gap-6 transition-all duration-300">
          {/* Header Info */}
          <div className="flex flex-col items-center gap-2">
            <span
              className={classNames(
                "px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-white/80 border border-white/60 shadow-sm",
                theme.text,
              )}
            >
              Spread the Word
            </span>
            <h2 className="text-3xl font-black tracking-tight text-slate-900">
              Share SmartList
            </h2>
            <p className="text-sm font-medium text-slate-500 max-w-[280px]">
              Help others save time and shop smarter. Invite friends and family
              to join!
            </p>
          </div>

          {/* QR Code Container */}
          <div className="relative group flex flex-col items-center gap-4 bg-white p-4.5 rounded-[24px] border border-slate-200/50 shadow-inner w-full max-w-[240px]">
            <div className="overflow-hidden rounded-2xl border border-slate-100 shadow-sm">
              <Image
                src={shareQRcode}
                className="h-44 w-44 object-cover transform transition-transform duration-300 group-hover:scale-105"
                alt="SmartList share QR code"
                priority
              />
            </div>

            {/* Download Button */}
            <a
              href={shareQRcode.src}
              download="smartlist-qr-code.png"
              className={classNames(
                "flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white shadow-md transition-all duration-300 active:scale-95 hover:shadow-lg hover:brightness-105 cursor-pointer",
                theme.primary,
              )}
            >
              <IoDownloadOutline className="w-4 h-4" />
              Download QR Code
            </a>
          </div>

          <div className="w-full h-px bg-slate-200/60" />

          {/* Copy Link Input */}
          <div className="flex flex-col gap-2 w-full">
            <p className="text-xs font-bold text-slate-500/80 uppercase tracking-wider text-left">
              Share Invite Link
            </p>
            <div className="flex items-center bg-white/80 border border-slate-200/80 rounded-2xl p-1.5 shadow-sm">
              <span className="flex-1 text-left px-3 text-sm font-semibold text-slate-600 truncate select-all">
                {shareUrl.replace("https://", "")}
              </span>
              <button
                onClick={handleCopy}
                className={classNames(
                  "flex items-center justify-center gap-1.5 py-2 px-4 rounded-xl text-xs font-bold text-white transition-all duration-300 active:scale-95 shadow-sm focus:outline-none min-w-[90px]",
                  copied
                    ? "bg-emerald-500 hover:bg-emerald-600"
                    : theme.primary,
                )}
                aria-label="Copy link to clipboard"
              >
                {copied ? (
                  <>
                    <IoCheckmarkOutline className="w-4 h-4 animate-bounce" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <IoCopyOutline className="w-3.5 h-3.5" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Social Share Grid */}
          <SocialMediaShare
            url={shareUrl}
            title="Unlock Your Smart Shopping Experience!"
            text="Streamline your shopping with SmartList, the ultimate tool for organizing, price comparison, and deal hunting."
          />
        </div>
      </main>

      <Navbar />
    </div>
  );
}

export default SharePage;
