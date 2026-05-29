import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scan Receipt | SmartList",
  description:
    "Upload or capture photos of your paper grocery receipts. SmartList uses advanced Optical Character Recognition (OCR) to instantly import items and compare prices.",
  alternates: {
    canonical: "https://smart-list.co.uk/scan-receipt",
  },
};

export default function ScanReceiptLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
