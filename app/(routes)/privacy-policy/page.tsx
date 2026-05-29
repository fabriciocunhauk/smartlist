"use client";

import Header from "@/app/components/Header";
import Navbar from "@/app/components/Navbar";
import React from "react";
import { useTheme } from "@/app/context/ThemeContext";
import { classNames } from "@/app/utils/appearance";
import Container from "@/app/components/Container";
import { LuShield, LuEye, LuLock, LuCookie } from "react-icons/lu";

function PrivacyPolicy() {
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
              <LuShield className="w-8 h-8" style={{ color: theme.colorCode }} />
              <span>Privacy Policy</span>
            </h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Last Updated: May 2026
            </p>
            <p className="text-xs md:text-sm font-semibold text-slate-500 max-w-2xl leading-relaxed mt-1">
              At SmartList, we are committed to protecting your privacy. This Privacy Policy details how we handle, store, and process your data. Our core philosophy is simple: your lists and data belong to you.
            </p>
          </div>

          {/* Detailed Policy Sections */}
          <div className="bg-white/95 border border-slate-200/60 shadow-xl rounded-3xl p-6 md:p-8 flex flex-col gap-8 text-slate-700">
            
            {/* Section 1 */}
            <div className="flex flex-col gap-3">
              <h2 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-2">
                <LuEye className="w-5 h-5" style={{ color: theme.colorCode }} />
                <span>1. Data We Do NOT Collect (Privacy First)</span>
              </h2>
              <p className="text-xs font-semibold leading-relaxed text-slate-500">
                Unlike traditional platforms, SmartList does not host your personal shopping lists on centralized databases.
              </p>
              <ul className="list-disc list-inside text-xs font-semibold text-slate-500 space-y-1.5 pl-2">
                <li>Your shopping lists, item names, and checked item statuses are stored locally on your device via browser memory (<strong className="text-slate-700">IndexedDB</strong>).</li>
                <li>Your selected application color theme is saved locally (<strong className="text-slate-700">theme_store</strong>) and never transmitted to our servers.</li>
                <li>We do not require user registration or logins to use our core features, guaranteeing anonymous use.</li>
              </ul>
            </div>

            <div className="w-full h-px bg-slate-200/60" />

            {/* Section 2 */}
            <div className="flex flex-col gap-3">
              <h2 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-2">
                <LuLock className="w-5 h-5" style={{ color: theme.colorCode }} />
                <span>2. Receipt Uploads & OCR Processing</span>
              </h2>
              <p className="text-xs font-semibold leading-relaxed text-slate-500">
                When you use our <strong className="text-slate-700">Scan Receipt</strong> feature:
              </p>
              <ul className="list-disc list-inside text-xs font-semibold text-slate-500 space-y-1.5 pl-2">
                <li>Your uploaded receipt images are compressed client-side to minimize bandwidth and transmitted securely via HTTPS to our dedicated parser endpoint.</li>
                <li>The receipt image is processed transiently in memory to perform OCR (Optical Character Recognition) to extract item descriptions and price details.</li>
                <li>Images are NOT stored permanently on our backend and are discarded immediately after extraction is completed.</li>
              </ul>
            </div>

            <div className="w-full h-px bg-slate-200/60" />

            {/* Section 3 */}
            <div className="flex flex-col gap-3">
              <h2 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-2">
                <LuCookie className="w-5 h-5" style={{ color: theme.colorCode }} />
                <span>3. Cookies, Analytics & Third-Party Services</span>
              </h2>
              <p className="text-xs font-semibold leading-relaxed text-slate-500">
                To keep our service sustainable and continuously improve user experience, we partner with industry-leading third-party integrations:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col gap-1.5">
                  <h4 className="text-xs font-extrabold text-slate-800">Google Analytics (GA4)</h4>
                  <p className="text-[11px] font-semibold text-slate-400 leading-relaxed">
                    We use Google Analytics to track anonymous metrics (visit counts, active regions, pages viewed). We fully support Google Consent Mode v2, respecting your selections on our consent banner.
                  </p>
                </div>
                
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col gap-1.5">
                  <h4 className="text-xs font-extrabold text-slate-800">Google AdSense</h4>
                  <p className="text-[11px] font-semibold text-slate-400 leading-relaxed">
                    We display ads through Google AdSense. AdSense uses cookies to serve relevant advertisements to users based on their browsing behavior. You can opt-out of personalized advertising at any time.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full h-px bg-slate-200/60" />

            {/* Section 4 */}
            <div className="flex flex-col gap-3">
              <h2 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-2">
                <LuShield className="w-5 h-5" style={{ color: theme.colorCode }} />
                <span>4. Your Control Over Data</span>
              </h2>
              <p className="text-xs font-semibold leading-relaxed text-slate-500">
                Because your shopping list information is stored in browser memory, you have 100% control over its disposal:
              </p>
              <ul className="list-disc list-inside text-xs font-semibold text-slate-500 space-y-1.5 pl-2">
                <li>Clearing your web browser history, cache, or site database data will immediately and permanently wipe all your shopping lists.</li>
                <li>You can manually clear individual items or empty your list via the home dashboard action buttons.</li>
              </ul>
            </div>

            <div className="w-full h-px bg-slate-200/60" />

            {/* Section 5 */}
            <div className="flex flex-col gap-3">
              <h2 className="text-lg font-black text-slate-800 tracking-tight">
                5. Contact Support
              </h2>
              <p className="text-xs font-semibold leading-relaxed text-slate-500">
                If you have any questions or feedback concerning this Privacy Policy or your data, please contact the developer via the official Developer Portfolio page linked below in our footer.
              </p>
            </div>
          </div>
        </div>
      </Container>

      <Navbar />
    </div>
  );
}

export default PrivacyPolicy;
