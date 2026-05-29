"use client";

import Header from "@/app/components/Header";
import Navbar from "@/app/components/Navbar";
import React from "react";
import { useTheme } from "@/app/context/ThemeContext";
import { classNames } from "@/app/utils/appearance";
import Container from "@/app/components/Container";
import { LuFileText, LuInfo, LuLock } from "react-icons/lu";

function TermsOfService() {
  const { theme } = useTheme();

  return (
    <div
      className={classNames(
        "flex flex-col min-h-screen pb-12 transition-colors duration-300 ease-in-out",
        theme.secondary
      )}
    >
      <Header />

      <Container
        classes={{
          container:
            "w-full pt-28 pb-12 md:pt-24 md:max-w-4xl md:px-8",
        }}
      >
        <div className="w-full flex flex-col gap-6">
          {/* Header Card */}
          <div className="bg-white/80 backdrop-blur-md border border-slate-200/50 shadow-xl rounded-3xl p-6 md:p-8 flex flex-col items-center text-center gap-4 transition-all duration-300">
            <span
              className={classNames(
                "px-3.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-white border border-slate-200/60 shadow-sm",
                theme.text
              )}
            >
              Legal & Trust
            </span>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <LuFileText className="w-8 h-8" style={{ color: theme.colorCode }} />
              <span>Terms of Service</span>
            </h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Last Updated: May 2026
            </p>
            <p className="text-xs md:text-sm font-semibold text-slate-500 max-w-2xl leading-relaxed mt-1">
              Welcome to SmartList! These Terms of Service govern your access to and use of our Progressive Web App (PWA). By accessing SmartList, you agree to comply with these terms.
            </p>
          </div>

          {/* Detailed Terms Sections */}
          <div className="bg-white/95 border border-slate-200/60 shadow-xl rounded-3xl p-6 md:p-8 flex flex-col gap-8 text-slate-700">
            
            {/* Section 1 */}
            <div className="flex flex-col gap-3">
              <h2 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-2">
                <LuInfo className="w-5 h-5" style={{ color: theme.colorCode }} />
                <span>1. Description of Service</span>
              </h2>
              <p className="text-xs font-semibold leading-relaxed text-slate-500">
                SmartList provides users with an installable, offline-first web interface designed to organize shopping lists, match item queries against standard UK supermarket databases, extract item data from uploaded receipt images, and highlight saving opportunities.
              </p>
            </div>

            <div className="w-full h-px bg-slate-200/60" />

            {/* Section 2 */}
            <div className="flex flex-col gap-3">
              <h2 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-2">
                <LuInfo className="w-5 h-5" style={{ color: theme.colorCode }} />
                <span>2. Supermarket Price Disclaimer</span>
              </h2>
              <p className="text-xs font-semibold leading-relaxed text-slate-500">
                While we strive to keep store prices and catalogs highly accurate and relevant:
              </p>
              <ul className="list-disc list-inside text-xs font-semibold text-slate-500 space-y-1.5 pl-2">
                <li>Supermarket prices, stock availability, and promotional offers change continuously and vary across locations.</li>
                <li>All calculated basket comparisons, price tags, and savings percentages shown in the application are <strong className="text-slate-700">estimates</strong> for general information.</li>
                <li>We do not guarantee that the prices displayed will exactly match those in your local store shelf at any given moment.</li>
                <li>SmartList does not sell products and is not affiliated with, endorsed by, or sponsored by any supermarkets mentioned (e.g. Tesco, Sainsbury&apos;s, Aldi).</li>
              </ul>
            </div>

            <div className="w-full h-px bg-slate-200/60" />

            {/* Section 3 */}
            <div className="flex flex-col gap-3">
              <h2 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-2">
                <LuFileText className="w-5 h-5" style={{ color: theme.colorCode }} />
                <span>3. Image Processing & Scanner Ingestion</span>
              </h2>
              <p className="text-xs font-semibold leading-relaxed text-slate-500">
                By uploading receipt files or images through the Scanner Arena:
              </p>
              <ul className="list-disc list-inside text-xs font-semibold text-slate-500 space-y-1.5 pl-2">
                <li>You confirm you have the authority to process the receipt content.</li>
                <li>You understand that processing is fully automatic and simulated OCR templates are available for testing.</li>
                <li>Images are transient and uploaded solely for text recognition.</li>
              </ul>
            </div>

            <div className="w-full h-px bg-slate-200/60" />

            {/* Section 4 */}
            <div className="flex flex-col gap-3">
              <h2 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-2">
                <LuLock className="w-5 h-5" style={{ color: theme.colorCode }} />
                <span>4. Local Database Storage & Offline Reliability</span>
              </h2>
              <p className="text-xs font-semibold leading-relaxed text-slate-500">
                SmartList utilizes client-side storage technologies to preserve your lists offline. We are not responsible for data loss caused by clearing browser histories, caching issues, hardware faults, or database corruptions on user devices.
              </p>
            </div>

            <div className="w-full h-px bg-slate-200/60" />

            {/* Section 5 */}
            <div className="flex flex-col gap-3">
              <h2 className="text-lg font-black text-slate-800 tracking-tight">
                5. Limitations of Liability & Warranty
              </h2>
              <p className="text-xs font-semibold leading-relaxed text-slate-500 font-medium">
                THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND. IN NO EVENT SHALL SMARTLIST OR ITS DEVELOPER BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, OR CONSEQUENTIAL LOSSES RESULTING FROM THE USE OF OR INABILITY TO USE THE APPLICATION.
              </p>
            </div>
          </div>
        </div>
      </Container>

      <Navbar />
    </div>
  );
}

export default TermsOfService;
