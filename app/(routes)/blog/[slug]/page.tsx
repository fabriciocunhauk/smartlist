"use client";

import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/app/components/Header";
import Navbar from "@/app/components/Navbar";
import Container from "@/app/components/Container";
import AdSense from "@/app/components/AdSense";
import ArticleCard from "@/app/components/blog/ArticleCard";
import { getArticleBySlug, getAllArticles, ArticleSection } from "@/app/lib/blog";
import { useTheme } from "@/app/context/ThemeContext";
import { classNames } from "@/app/utils/appearance";
import { LuClock, LuArrowLeft, LuTag } from "react-icons/lu";
import { use } from "react";

function renderSection(section: ArticleSection, index: number, colorCode: string) {
  switch (section.type) {
    case "heading":
      return (
        <h2
          key={index}
          className="text-xl font-black text-slate-800 tracking-tight mt-6 mb-2"
        >
          {section.content as string}
        </h2>
      );
    case "subheading":
      return (
        <h3
          key={index}
          className="text-base font-extrabold text-slate-700 tracking-tight mt-4 mb-1"
        >
          {section.content as string}
        </h3>
      );
    case "paragraph":
      return (
        <p key={index} className="text-sm font-semibold text-slate-600 leading-relaxed">
          {section.content as string}
        </p>
      );
    case "list":
      return (
        <ul key={index} className="flex flex-col gap-2 pl-4">
          {(section.content as string[]).map((item, i) => (
            <li key={i} className="flex gap-2 text-sm font-semibold text-slate-600 leading-relaxed">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: colorCode }} />
              {item}
            </li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <div
          key={index}
          className="rounded-2xl p-5 border-l-4 my-2"
          style={{ backgroundColor: `${colorCode}10`, borderColor: colorCode }}
        >
          <p className="text-sm font-bold text-slate-700 leading-relaxed">
            {section.content as string}
          </p>
        </div>
      );
    default:
      return null;
  }
}

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const { theme } = useTheme();

  const formattedDate = new Date(article.publishedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const allArticles = getAllArticles();
  const related = allArticles.filter((a) => a.slug !== slug).slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: article.title,
        description: article.description,
        author: { "@type": "Organization", name: article.author, url: "https://smart-list.co.uk" },
        publisher: { "@type": "Organization", name: "SmartList", url: "https://smart-list.co.uk" },
        datePublished: article.publishedAt,
        dateModified: article.updatedAt ?? article.publishedAt,
        mainEntityOfPage: `https://smart-list.co.uk/blog/${article.slug}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://smart-list.co.uk" },
          { "@type": "ListItem", position: 2, name: "Blog", item: "https://smart-list.co.uk/blog" },
          { "@type": "ListItem", position: 3, name: article.title, item: `https://smart-list.co.uk/blog/${article.slug}` },
        ],
      },
    ],
  };

  return (
    <div
      className={classNames(
        "flex flex-col min-h-screen pb-12 transition-colors duration-300 ease-in-out",
        theme.secondary
      )}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <Container
        classes={{
          container: "w-full pt-28 pb-12 md:pt-24 md:max-w-3xl md:px-8",
        }}
      >
        <div className="w-full flex flex-col gap-6">
          {/* Breadcrumb */}
          <Link
            href="/blog"
            className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-700 transition-colors w-fit"
          >
            <LuArrowLeft className="w-3.5 h-3.5" />
            Back to Blog
          </Link>

          {/* Article Header */}
          <div className="bg-white/80 backdrop-blur-md border border-slate-200/50 shadow-xl rounded-3xl p-6 md:p-8 flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-white border border-slate-200/60 shadow-sm"
                style={{ color: theme.colorCode }}
              >
                {article.category}
              </span>
              <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-400">
                <LuClock className="w-3 h-3" />
                <span>{article.readingTime} min read</span>
              </div>
              <span className="text-[10px] font-semibold text-slate-400">{formattedDate}</span>
            </div>

            <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-snug">
              {article.title}
            </h1>

            <p className="text-sm font-semibold text-slate-500 leading-relaxed">
              {article.description}
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500"
                >
                  <LuTag className="w-2.5 h-2.5" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Article Body */}
          <div className="bg-white/95 border border-slate-200/60 shadow-xl rounded-3xl p-6 md:p-8 flex flex-col gap-4">
            {article.sections.map((section, index) => (
              <div key={index}>
                {renderSection(section, index, theme.colorCode)}
                {/* In-article ad after the 3rd section */}
                {index === 2 && (
                  <div className="w-full flex justify-center my-4">
                    <AdSense adSlot="3727793913" className="w-full max-w-[728px]" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Related Articles */}
          {related.length > 0 && (
            <div className="flex flex-col gap-4">
              <h2 className="text-lg font-black text-slate-800 tracking-tight px-1">
                More Saving Tips
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {related.map((a) => (
                  <ArticleCard key={a.slug} article={a} colorCode={theme.colorCode} />
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
      <Navbar />
    </div>
  );
}
