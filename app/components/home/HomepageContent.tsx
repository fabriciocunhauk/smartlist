"use client";

import Link from "next/link";
import { useTheme } from "@/app/context/ThemeContext";
import { classNames } from "@/app/utils/appearance";
import { getAllArticles } from "@/app/lib/blog";
import {
  LuListTodo,
  LuCoins,
  LuCircleCheck,
  LuShieldCheck,
  LuWifi,
  LuTrendingDown,
  LuQuote,
  LuArrowRight,
  LuClock,
} from "react-icons/lu";

const recentArticles = getAllArticles().slice(0, 3);

export default function HomepageContent() {
  const { theme } = useTheme();

  return (
    <div className={classNames("w-full flex flex-col gap-10 py-12 px-4", theme.secondary)}>
      <div className="max-w-4xl mx-auto w-full flex flex-col gap-10">

        {/* Section A: How SmartList Works */}
        <div className="bg-white/95 border border-slate-200/60 shadow-xl rounded-3xl p-6 md:p-8 flex flex-col gap-6">
          <div className="flex flex-col items-start gap-2">
            <span
              className={classNames(
                "px-3.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-white border border-slate-200/60 shadow-sm",
                theme.text
              )}
            >
              How It Works
            </span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Three steps to a smarter grocery shop
            </h2>
            <p className="text-sm font-semibold text-slate-500 leading-relaxed max-w-2xl">
              SmartList combines an offline-first shopping list with real-time price comparison
              across the UK&apos;s biggest supermarkets. Here&apos;s how thousands of UK households are
              using it to save money every week.
            </p>
          </div>

          <div className="relative flex flex-col gap-6 pl-4 border-l-2 border-slate-100">
            <div className="relative flex gap-4">
              <div
                className="absolute -left-[29px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow text-[10px] font-black text-white shrink-0"
                style={{ backgroundColor: theme.colorCode }}
              >
                1
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <LuListTodo className="w-4 h-4" style={{ color: theme.colorCode }} />
                  <h3 className="text-sm font-extrabold text-slate-800">Build your shopping list</h3>
                </div>
                <p className="text-xs font-semibold text-slate-500 leading-relaxed">
                  Add items to your shopping list using simple, plain-English names like &quot;semi-skimmed
                  milk&quot;, &quot;chicken breast&quot;, or &quot;wholemeal bread&quot;. Your list is saved securely in
                  your browser&apos;s local database — no account required, works offline, and your
                  data never leaves your device. Add as many items as you need before your weekly
                  shop and check them off as you go around the store.
                </p>
              </div>
            </div>

            <div className="relative flex gap-4">
              <div
                className="absolute -left-[29px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow text-[10px] font-black text-white shrink-0"
                style={{ backgroundColor: theme.colorCode }}
              >
                2
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <LuCoins className="w-4 h-4" style={{ color: theme.colorCode }} />
                  <h3 className="text-sm font-extrabold text-slate-800">Compare prices across UK stores</h3>
                </div>
                <p className="text-xs font-semibold text-slate-500 leading-relaxed">
                  Tap &quot;Compare Prices&quot; and SmartList searches its database of current supermarket
                  prices across Tesco, Aldi, and Sainsbury&apos;s. Each item on your list is matched to
                  the closest product at each store, and you&apos;ll see the lowest and highest price
                  for your full basket at a glance. No more manually checking three different
                  supermarket websites — SmartList does it all in one place, before you leave home.
                </p>
              </div>
            </div>

            <div className="relative flex gap-4">
              <div
                className="absolute -left-[29px] top-0.5 w-6 h-6 rounded-full flex items-center justify-center border-2 border-white shadow text-[10px] font-black text-white shrink-0"
                style={{ backgroundColor: theme.colorCode }}
              >
                3
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <LuCircleCheck className="w-4 h-4" style={{ color: theme.colorCode }} />
                  <h3 className="text-sm font-extrabold text-slate-800">Shop smarter, save up to 40%</h3>
                </div>
                <p className="text-xs font-semibold text-slate-500 leading-relaxed">
                  Armed with per-item price data, you can choose the cheapest store for your full
                  basket, or identify the specific items that are significantly cheaper elsewhere
                  and plan a split shop. Over a typical week, UK families who compare prices
                  before shopping save between £15 and £30 — adding up to over £1,000 a year.
                  SmartList puts that information in your hands every week, for free.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section B: Why Families Love SmartList */}
        <div className="flex flex-col gap-6">
          <div className="text-center">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Why UK families choose SmartList
            </h2>
            <p className="text-sm font-semibold text-slate-500 mt-2">
              Built for real shoppers, not spreadsheet enthusiasts.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/90 border border-slate-200/60 shadow-lg rounded-3xl p-6 flex flex-col items-center text-center gap-3 transition-all duration-300">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm"
                style={{ backgroundColor: `${theme.colorCode}15`, color: theme.colorCode }}
              >
                <LuTrendingDown className="w-6 h-6" />
              </div>
              <p className="text-3xl font-black" style={{ color: theme.colorCode }}>40%</p>
              <p className="text-xs font-semibold text-slate-500 leading-relaxed">
                Average saving on weekly grocery shop when comparing prices across
                Tesco, Aldi, and Sainsbury&apos;s before leaving home.
              </p>
            </div>

            <div className="bg-white/90 border border-slate-200/60 shadow-lg rounded-3xl p-6 flex flex-col items-center text-center gap-3 transition-all duration-300">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm"
                style={{ backgroundColor: `${theme.colorCode}15`, color: theme.colorCode }}
              >
                <LuWifi className="w-6 h-6" />
              </div>
              <p className="text-3xl font-black" style={{ color: theme.colorCode }}>100%</p>
              <p className="text-xs font-semibold text-slate-500 leading-relaxed">
                Offline-capable. Your shopping list is always available in store —
                even without a mobile signal or Wi-Fi connection.
              </p>
            </div>

            <div className="bg-white/90 border border-slate-200/60 shadow-lg rounded-3xl p-6 flex flex-col items-center text-center gap-3 transition-all duration-300">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm"
                style={{ backgroundColor: `${theme.colorCode}15`, color: theme.colorCode }}
              >
                <LuShieldCheck className="w-6 h-6" />
              </div>
              <p className="text-3xl font-black" style={{ color: theme.colorCode }}>Zero</p>
              <p className="text-xs font-semibold text-slate-500 leading-relaxed">
                Data collected about you. No account, no tracking of your personal
                shopping habits. Your lists stay on your device only.
              </p>
            </div>
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white/90 border border-slate-200/60 shadow-lg rounded-3xl p-6 flex flex-col gap-3">
              <LuQuote className="w-5 h-5 text-slate-300" />
              <p className="text-sm font-semibold text-slate-600 leading-relaxed italic">
                &quot;I used to just go to Tesco out of habit. SmartList showed me I was paying £22
                more per week than if I split my shop between Aldi and Tesco. That&apos;s over £1,100
                a year. It&apos;s changed how I think about grocery shopping entirely.&quot;
              </p>
              <div className="flex items-center gap-2 mt-auto pt-2 border-t border-slate-100">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0"
                  style={{ backgroundColor: theme.colorCode }}
                >
                  S
                </div>
                <div>
                  <p className="text-xs font-extrabold text-slate-700">Sarah M.</p>
                  <p className="text-[10px] font-semibold text-slate-400">Manchester · Family of 4</p>
                </div>
              </div>
            </div>

            <div className="bg-white/90 border border-slate-200/60 shadow-lg rounded-3xl p-6 flex flex-col gap-3">
              <LuQuote className="w-5 h-5 text-slate-300" />
              <p className="text-sm font-semibold text-slate-600 leading-relaxed italic">
                &quot;The receipt scanner is brilliant for understanding where my money actually goes.
                I scanned four weeks of receipts and discovered I was spending £34/month on
                yoghurts alone. I switched to own-brand and haven&apos;t noticed a difference.&quot;
              </p>
              <div className="flex items-center gap-2 mt-auto pt-2 border-t border-slate-100">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-black text-white shrink-0"
                  style={{ backgroundColor: theme.colorCode }}
                >
                  J
                </div>
                <div>
                  <p className="text-xs font-extrabold text-slate-700">James T.</p>
                  <p className="text-[10px] font-semibold text-slate-400">Bristol · Couple</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section C: Latest Grocery Saving Tips */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              Latest grocery saving tips
            </h2>
            <Link
              href="/blog"
              className="flex items-center gap-1 text-xs font-extrabold transition-colors"
              style={{ color: theme.colorCode }}
            >
              View all guides <LuArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="group bg-white/90 border border-slate-200/60 shadow-lg hover:shadow-xl hover:scale-[1.02] rounded-3xl p-5 flex flex-col gap-3 transition-all duration-300"
              >
                <span
                  className="text-[10px] font-extrabold uppercase tracking-widest"
                  style={{ color: theme.colorCode }}
                >
                  {article.category}
                </span>
                <h3 className="text-sm font-black text-slate-800 leading-snug group-hover:text-slate-900 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-400 mt-auto">
                  <LuClock className="w-3 h-3" />
                  <span>{article.readingTime} min read</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
