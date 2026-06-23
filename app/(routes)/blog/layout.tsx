import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grocery Saving Tips & Guides | SmartList Blog",
  description:
    "Expert guides on saving money at UK supermarkets. Compare Tesco, Aldi, and Sainsbury's prices, learn yellow sticker timing, meal planning strategies, and beat grocery inflation.",
  alternates: {
    canonical: "https://smart-list.co.uk/blog",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
