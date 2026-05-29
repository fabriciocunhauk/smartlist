import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | SmartList",
  description:
    "At SmartList, we are committed to protecting your privacy. Read our Privacy Policy to understand how your local grocery lists remain entirely on your device under your control.",
  alternates: {
    canonical: "https://smart-list.co.uk/privacy-policy",
  },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
