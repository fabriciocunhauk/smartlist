"use client";

import Header from "@/app/components/Header";
import Navbar from "@/app/components/Navbar";
import Container from "@/app/components/Container";
import ArticleCard from "@/app/components/blog/ArticleCard";
import { getAllArticles } from "@/app/lib/blog";
import { useTheme } from "@/app/context/ThemeContext";
import { classNames } from "@/app/utils/appearance";
import { LuBookOpen } from "react-icons/lu";

const articles = getAllArticles();

export default function BlogIndex() {
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
          container: "w-full pt-28 pb-12 md:pt-24 md:max-w-4xl md:px-8",
        }}
      >
        <div className="w-full flex flex-col gap-8">
          {/* Hero */}
          <div className="bg-white/80 backdrop-blur-md border border-slate-200/50 shadow-xl rounded-3xl p-6 md:p-8 flex flex-col items-center text-center gap-4 transition-all duration-300">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm"
              style={{ backgroundColor: `${theme.colorCode}15`, color: theme.colorCode }}
            >
              <LuBookOpen className="w-6 h-6" />
            </div>
            <span
              className={classNames(
                "px-3.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-white border border-slate-200/60 shadow-sm",
                theme.text
              )}
            >
              SmartList Blog
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-none">
              Grocery saving tips &amp;{" "}
              <span style={{ color: theme.colorCode }}>guides</span>
            </h1>
            <p className="text-sm md:text-base font-semibold text-slate-500 max-w-2xl leading-relaxed">
              Expert advice on comparing UK supermarket prices, beating grocery inflation,
              timing your shop for the best deals, and building smarter shopping habits.
            </p>
          </div>

          {/* Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((article) => (
              <ArticleCard
                key={article.slug}
                article={article}
                colorCode={theme.colorCode}
              />
            ))}
          </div>
        </div>
      </Container>
      <Navbar />
    </div>
  );
}
