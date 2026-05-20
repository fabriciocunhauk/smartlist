import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare Grocery Prices | SmartList",
  description:
    "Compare prices of your shopping list items across top supermarkets like Sainsbury's, Morrisons, Aldi, and Tesco. Find the cheapest prices and save money instantly with SmartList.",
  alternates: {
    canonical: "https://www.smart-list.co.uk/compare-prices",
  },
};

export default function ComparePricesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
