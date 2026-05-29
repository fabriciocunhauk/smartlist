import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | SmartList",
  description:
    "Have questions about SmartList? Read our FAQ to learn about grocery price comparisons, receipt scanning, local secure storage, and how you can save up to 40% on your weekly shopping.",
  alternates: {
    canonical: "https://smart-list.co.uk/faq",
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
