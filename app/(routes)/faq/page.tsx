"use client";

import Header from "@/app/components/Header";
import Navbar from "@/app/components/Navbar";
import React, { useState } from "react";
import { useTheme } from "@/app/context/ThemeContext";
import { classNames } from "@/app/utils/appearance";
import Container from "@/app/components/Container";
import {
  LuChevronDown,
  LuChevronUp,
  LuInfo,
} from "react-icons/lu";

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

function FAQPage() {
  const { theme } = useTheme();
  const [openIndexes, setOpenIndexes] = useState<Record<number, boolean>>({
    0: true, // open the first one by default
  });

  const toggleFAQ = (index: number) => {
    setOpenIndexes((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const faqItems: FAQItem[] = [
    {
      question: "What is SmartList and how does it work?",
      answer: (
        <p className="leading-relaxed">
          SmartList is an intelligent, offline-first Progressive Web App (PWA) designed to organize your grocery shopping lists and find the absolute best deals. By typing simple items (e.g. &quot;Milk&quot;, &quot;Strawberries&quot;) or scanning a receipt, the app automatically queries a comprehensive supermarket database to show you where the cheapest and most expensive grocery baskets lie, unlocking substantial weekly savings.
        </p>
      ),
    },
    {
      question: "How are supermarket prices retrieved and matched?",
      answer: (
        <p className="leading-relaxed">
          Our system accesses a curated database containing product lists and price information across leading UK supermarkets (such as Tesco, Sainsbury&apos;s, and Aldi). When you add an item, we use clean name-tokenization and alias mapping (e.g. matching &quot;mlk&quot; or &quot;semi skim&quot; to &quot;milk&quot;) to find genuine product matches, and automatically filter the results to display the lowest and highest price options.
        </p>
      ),
    },
    {
      question: "Can I use SmartList offline in the supermarket?",
      answer: (
        <p className="leading-relaxed">
          Yes! SmartList is built offline-first as an installable Progressive Web App. All your active shopping lists and comparative calculations are safely stored inside your browser&apos;s local database (IndexedDB). This ensures you can access, edit, and check off items directly on the supermarket floor even with zero cellular reception.
        </p>
      ),
    },
    {
      question: "How do I scan a physical paper receipt?",
      answer: (
        <p className="leading-relaxed">
          Simply navigate to the &quot;Scan&quot; tab. You can take a photo of your paper grocery receipt or upload one from your library. For best accuracy, fold the receipt before the final total/payment lines, ensure the supermarket brand at the top is clearly visible, and upload. Our secure parsing pipeline will read the items, match them to our catalog, and simulate the ingestion of lists seamlessly!
        </p>
      ),
    },
    {
      question: "Is my personal data safe with SmartList?",
      answer: (
        <p className="leading-relaxed">
          Absolutely. We stand by our Privacy Guarantee: your lists never leave your device. SmartList does not use centralized accounts, login passwords, or persistent remote tracking databases for list storage. All list data resides in your browser&apos;s private state, making it highly secure and fully in your control.
        </p>
      ),
    },
    {
      question: "How do I install SmartList on my home screen?",
      answer: (
        <p className="leading-relaxed">
          To install SmartList, simply click the &quot;Add to Home Screen&quot; action button at the top header of our website (or look for the install prompt in your browser&apos;s address bar). On mobile Safari, click the share icon and select &quot;Add to Home Screen&quot;. On Chrome, tap the menu and select &quot;Install App&quot;. This allows SmartList to launch as a standalone fullscreen application.
        </p>
      ),
    },
    {
      question: "Is SmartList free to use?",
      answer: (
        <p className="leading-relaxed">
          Yes, SmartList is 100% free! Our mission is to democratize smart shopping and help households save money on groceries. We display minimal, non-intrusive advertisements via Google AdSense to cover server infrastructure and Optical Character Recognition (OCR) processing costs.
        </p>
      ),
    },
  ];

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
              Support Center
            </span>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <LuInfo className="w-8 h-8" style={{ color: theme.colorCode }} />
              <span>Frequently Asked Questions</span>
            </h1>
            <p className="text-xs md:text-sm font-semibold text-slate-500 max-w-2xl leading-relaxed mt-1">
              Have questions about how SmartList works, how we calculate savings, or how to use receipt scanning? Find fast, detailed answers below.
            </p>
          </div>

          {/* Interactive Accordion List */}
          <div className="flex flex-col gap-4">
            {faqItems.map((faq, index) => {
              const isOpen = !!openIndexes[index];
              return (
                <div
                  key={index}
                  className="bg-white/95 border border-slate-200/60 shadow-md hover:shadow-lg rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left font-extrabold text-slate-800 text-sm md:text-base cursor-pointer hover:bg-slate-50/50 transition-colors select-none outline-none focus:ring-1 focus:ring-slate-200"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <LuChevronUp className="w-5 h-5 text-slate-400 shrink-0" />
                    ) : (
                      <LuChevronDown className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                  </button>

                  <div
                    className={classNames(
                      "transition-all duration-300 ease-in-out border-t border-slate-100/50 bg-slate-50/30",
                      isOpen ? "max-h-[500px] p-6 opacity-100" : "max-h-0 opacity-0 overflow-hidden"
                    )}
                  >
                    <div className="text-xs md:text-sm font-semibold text-slate-500">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Card */}
          <div className="bg-white/80 border border-slate-200/50 shadow-lg rounded-3xl p-6 flex items-center justify-between gap-4 flex-col md:flex-row text-center md:text-left">
            <div className="flex items-center gap-4 flex-col md:flex-row">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm"
                style={{
                  backgroundColor: `${theme.colorCode}15`,
                  color: theme.colorCode,
                }}
              >
                <LuInfo className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-slate-800 tracking-tight">
                  Still have questions?
                </h3>
                <p className="text-[11px] font-semibold text-slate-400 mt-0.5 leading-relaxed">
                  We are here to help. Reach out to the team via the developer portal at any time.
                </p>
              </div>
            </div>
            <a
              href="https://fabriciocunha.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className={classNames(
                "inline-flex items-center justify-center px-6 py-2.5 rounded-xl text-xs font-bold text-white shadow-md transition-all duration-300 active:scale-95 hover:shadow-lg hover:brightness-105 cursor-pointer shrink-0",
                theme.primary
              )}
            >
              Contact Support
            </a>
          </div>
        </div>
      </Container>

      <Navbar />
    </div>
  );
}

export default FAQPage;
