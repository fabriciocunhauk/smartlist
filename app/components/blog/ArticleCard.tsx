import Link from "next/link";
import { Article } from "@/app/lib/blog";
import { formatDate } from "@/app/utils/formatDate";
import { LuClock, LuArrowRight } from "react-icons/lu";

interface ArticleCardProps {
  article: Article;
  colorCode?: string;
}

export default function ArticleCard({ article, colorCode = "#f97316" }: ArticleCardProps) {
  const formattedDate = formatDate(article.publishedAt);

  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group bg-white/90 border border-slate-200/60 shadow-lg hover:shadow-xl hover:scale-[1.02] rounded-3xl p-6 flex flex-col gap-4 transition-all duration-300"
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest border border-slate-200/60 shadow-sm bg-white"
          style={{ color: colorCode }}
        >
          {article.category}
        </span>
        <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-400">
          <LuClock className="w-3 h-3" />
          <span>{article.readingTime} min read</span>
        </div>
      </div>

      <h2 className="text-lg font-black text-slate-800 tracking-tight leading-snug group-hover:text-slate-900 transition-colors">
        {article.title}
      </h2>

      <p className="text-xs font-semibold text-slate-500 leading-relaxed line-clamp-3">
        {article.description}
      </p>

      <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-100">
        <span className="text-[11px] font-semibold text-slate-400">{formattedDate}</span>
        <span
          className="flex items-center gap-1 text-[11px] font-extrabold transition-colors"
          style={{ color: colorCode }}
        >
          Read article <LuArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </span>
      </div>
    </Link>
  );
}
