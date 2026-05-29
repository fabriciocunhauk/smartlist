import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | SmartList",
  description:
    "Review the Terms of Service for using SmartList. Read our user agreement, data disclaimer, and policies governing our smart grocery list and price comparison platform.",
  alternates: {
    canonical: "https://smart-list.co.uk/terms-of-service",
  },
};

export default function TermsOfServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
