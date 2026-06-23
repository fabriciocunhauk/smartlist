import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | SmartList",
  description:
    "Have questions about SmartList? Read our FAQ to learn about grocery price comparisons, receipt scanning, local secure storage, and how you can save up to 40% on your weekly shopping.",
  alternates: {
    canonical: "https://smart-list.co.uk/faq",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is SmartList and how does it work?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "SmartList is an intelligent, offline-first Progressive Web App (PWA) designed to organize your grocery shopping lists and find the absolute best deals. By typing simple items or scanning a receipt, the app automatically queries a comprehensive supermarket database to show you where the cheapest and most expensive grocery baskets lie, unlocking substantial weekly savings.",
      },
    },
    {
      "@type": "Question",
      name: "How are supermarket prices retrieved and matched?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our system accesses a curated database containing product lists and price information across leading UK supermarkets (such as Tesco, Sainsbury's, and Aldi). When you add an item, we use clean name-tokenization and alias mapping to find genuine product matches, and automatically filter the results to display the lowest and highest price options.",
      },
    },
    {
      "@type": "Question",
      name: "Can I use SmartList offline in the supermarket?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes! SmartList is built offline-first as an installable Progressive Web App. All your active shopping lists and comparative calculations are safely stored inside your browser's local database (IndexedDB). This ensures you can access, edit, and check off items directly on the supermarket floor even with zero cellular reception.",
      },
    },
    {
      "@type": "Question",
      name: "How do I scan a physical paper receipt?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Simply navigate to the Scan tab. You can take a photo of your paper grocery receipt or upload one from your library. For best accuracy, fold the receipt before the final total/payment lines, ensure the supermarket brand at the top is clearly visible, and upload. Our secure parsing pipeline will read the items, match them to our catalog, and simulate the ingestion of lists seamlessly.",
      },
    },
    {
      "@type": "Question",
      name: "Is my personal data safe with SmartList?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. We stand by our Privacy Guarantee: your lists never leave your device. SmartList does not use centralized accounts, login passwords, or persistent remote tracking databases for list storage. All list data resides in your browser's private state, making it highly secure and fully in your control.",
      },
    },
    {
      "@type": "Question",
      name: "How do I install SmartList on my home screen?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "To install SmartList, simply click the Add to Home Screen action button at the top header of our website or look for the install prompt in your browser's address bar. On mobile Safari, click the share icon and select Add to Home Screen. On Chrome, tap the menu and select Install App. This allows SmartList to launch as a standalone fullscreen application.",
      },
    },
    {
      "@type": "Question",
      name: "Is SmartList free to use?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, SmartList is 100% free. Our mission is to democratize smart shopping and help households save money on groceries. We display minimal, non-intrusive advertisements via Google AdSense to cover server infrastructure and Optical Character Recognition (OCR) processing costs.",
      },
    },
  ],
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {children}
    </>
  );
}
