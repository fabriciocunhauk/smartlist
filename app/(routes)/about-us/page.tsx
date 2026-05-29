"use client";

import Header from "@/app/components/Header";
import Navbar from "@/app/components/Navbar";
import React from "react";
import { useTheme } from "@/app/context/ThemeContext";
import { classNames } from "@/app/utils/appearance";
import Container from "@/app/components/Container";
import Link from "next/link";
import {
  LuSparkles,
  LuListTodo,
  LuCoins,
  LuCamera,
  LuShieldCheck,
  LuHeart,
  LuCode,
} from "react-icons/lu";

function AboutUs() {
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
        <div className="w-full flex flex-col gap-8">
          {/* Hero Section */}
          <div className="bg-white/80 backdrop-blur-md border border-slate-200/50 shadow-xl rounded-3xl p-6 md:p-8 flex flex-col items-center text-center gap-4 transition-all duration-300">
            <span
              className={classNames(
                "px-3.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-white border border-slate-200/60 shadow-sm",
                theme.text
              )}
            >
              Who We Are
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-none">
              Smart shopping starts with <span style={{ color: theme.colorCode }}>SmartList</span>
            </h1>
            <p className="text-sm md:text-base font-semibold text-slate-500 max-w-2xl leading-relaxed mt-2">
              SmartList was born from a simple yet powerful mission: to empower shoppers to make smarter grocery decisions, compare prices in real-time, and save their hard-earned money effortlessly. By pairing local browser-based lists with price comparison analytics, we put the power back in your hands.
            </p>
          </div>

          {/* Key Value Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/90 border border-slate-200/60 shadow-lg hover:shadow-xl hover:scale-[1.02] rounded-3xl p-6 flex flex-col gap-4 transition-all duration-300">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm"
                style={{
                  backgroundColor: `${theme.colorCode}15`,
                  color: theme.colorCode,
                }}
              >
                <LuListTodo className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-800 tracking-tight">
                Effortless Lists
              </h3>
              <p className="text-xs font-semibold text-slate-500 leading-relaxed">
                Add, manage, and tick off products dynamically. Your lists are persisted locally in your browser&apos;s secure database so they are always safe and available.
              </p>
            </div>

            <div className="bg-white/90 border border-slate-200/60 shadow-lg hover:shadow-xl hover:scale-[1.02] rounded-3xl p-6 flex flex-col gap-4 transition-all duration-300">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm"
                style={{
                  backgroundColor: `${theme.colorCode}15`,
                  color: theme.colorCode,
                }}
              >
                <LuCoins className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-800 tracking-tight">
                Price Comparison
              </h3>
              <p className="text-xs font-semibold text-slate-500 leading-relaxed">
                Our analytical matcher searches through real store catalogs, showing you the absolute lowest price and which supermarket is offering the best deal.
              </p>
            </div>

            <div className="bg-white/90 border border-slate-200/60 shadow-lg hover:shadow-xl hover:scale-[1.02] rounded-3xl p-6 flex flex-col gap-4 transition-all duration-300">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm"
                style={{
                  backgroundColor: `${theme.colorCode}15`,
                  color: theme.colorCode,
                }}
              >
                <LuCamera className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-black text-slate-800 tracking-tight">
                Receipt Scanner
              </h3>
              <p className="text-xs font-semibold text-slate-500 leading-relaxed">
                Don&apos;t waste time typing! Scan paper grocery receipts using our advanced Optical Character Recognition (OCR) scanner to instantly extract and ingest purchases.
              </p>
            </div>
          </div>

          {/* Deep Dive Content - How It Works */}
          <div className="bg-white/95 border border-slate-200/60 shadow-xl rounded-3xl p-6 md:p-8 flex flex-col gap-6">
            <h2 className="text-2xl font-black text-slate-800 tracking-tight flex items-center gap-2">
              <span>How SmartList Works</span>
              <LuSparkles className="w-5 h-5 text-amber-500 animate-pulse" />
            </h2>
            
            <div className="relative flex flex-col gap-6 pl-4 border-l-2 border-slate-100">
              <div className="relative flex gap-4">
                <div
                  className="absolute -left-[29px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow text-[10px] font-black text-white"
                  style={{ backgroundColor: theme.colorCode }}
                >
                  1
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-800">Build Your Shopping List</h4>
                  <p className="text-xs font-semibold text-slate-500 mt-1 leading-relaxed">
                    Create shopping lists for your groceries, household goods, or events. Add simple items like &quot;Milk&quot;, &quot;Tomatoes&quot;, or &quot;Bread&quot;.
                  </p>
                </div>
              </div>

              <div className="relative flex gap-4">
                <div
                  className="absolute -left-[29px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow text-[10px] font-black text-white"
                  style={{ backgroundColor: theme.colorCode }}
                >
                  2
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-800">Compare Real Stores</h4>
                  <p className="text-xs font-semibold text-slate-500 mt-1 leading-relaxed">
                    Our database keeps track of up-to-date prices from leading UK supermarkets. We match your terms automatically and calculate the cheapest and most expensive store totals.
                  </p>
                </div>
              </div>

              <div className="relative flex gap-4">
                <div
                  className="absolute -left-[29px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow text-[10px] font-black text-white"
                  style={{ backgroundColor: theme.colorCode }}
                >
                  3
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-800">Save Up to 40% on Groceries</h4>
                  <p className="text-xs font-semibold text-slate-500 mt-1 leading-relaxed">
                    Choose store-specific deals or see where the cheapest basket lies. By knowing exactly where to buy each item, you can unlock substantial weekly savings.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Privacy & Principles */}
          <div className="bg-white/90 border border-slate-200/60 shadow-lg rounded-3xl p-6 flex flex-col md:flex-row items-center gap-6">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm"
              style={{
                backgroundColor: `${theme.colorCode}15`,
                color: theme.colorCode,
              }}
            >
              <LuShieldCheck className="w-8 h-8" />
            </div>
            <div className="flex flex-col text-center md:text-left">
              <h3 className="text-lg font-black text-slate-800 tracking-tight">
                Our Privacy Guarantee
              </h3>
              <p className="text-xs font-semibold text-slate-500 leading-relaxed mt-1">
                We believe your personal grocery habits are your own business. SmartList stores all your shopping list data directly inside your browser database (IndexedDB). Your lists never leave your device, ensuring maximum privacy and offline accessibility.
              </p>
            </div>
          </div>

          {/* Developer / Credits */}
          <div className="bg-white/80 border border-slate-200/50 shadow-lg rounded-3xl p-6 flex flex-col items-center gap-4 text-center">
            <div className="flex items-center gap-2 text-slate-800 font-extrabold text-sm">
              <LuCode className="w-4 h-4" />
              <span>Designed & Built with</span>
              <LuHeart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" />
            </div>
            <p className="text-xs font-semibold text-slate-500 max-w-md">
              SmartList was designed by a dedicated developer passionate about creating premium user interfaces and utility software that saves people money.
            </p>
            <Link
              href="https://fabriciocunha.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className={classNames(
                "inline-flex items-center justify-center px-6 py-2.5 rounded-xl text-xs font-bold text-white shadow-md transition-all duration-300 active:scale-95 hover:shadow-lg hover:brightness-105 cursor-pointer",
                theme.primary
              )}
            >
              View Developer Portfolio
            </Link>
          </div>
        </div>
      </Container>

      <Navbar />
    </div>
  );
}

export default AboutUs;

