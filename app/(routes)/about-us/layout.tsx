import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | SmartList",
  description:
    "SmartList was born from a mission to empower shoppers to make smarter grocery decisions, compare prices in real-time, and save money effortlessly. Learn more about our privacy-first philosophy.",
  alternates: {
    canonical: "https://smart-list.co.uk/about-us",
  },
};

export default function AboutUsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
