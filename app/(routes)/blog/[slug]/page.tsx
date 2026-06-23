import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticleBySlug, getAllArticles } from "@/app/lib/blog";
import ArticlePage from "@/app/components/blog/ArticlePage";

export async function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: `${article.title} | SmartList Blog`,
    description: article.description,
    alternates: { canonical: `https://smart-list.co.uk/blog/${article.slug}` },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const related = getAllArticles()
    .filter((a) => a.slug !== slug)
    .slice(0, 2);

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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ArticlePage article={article} related={related} />
    </>
  );
}
