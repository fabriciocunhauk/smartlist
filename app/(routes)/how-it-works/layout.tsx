import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How SmartList Works | Save Up to 40% on Groceries",
  description:
    "Learn how SmartList helps UK families compare prices across Tesco, Aldi, and Sainsbury's, save up to 40% on their weekly grocery shop, and manage shopping lists offline.",
  alternates: {
    canonical: "https://smart-list.co.uk/how-it-works",
  },
};

export default function HowItWorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
