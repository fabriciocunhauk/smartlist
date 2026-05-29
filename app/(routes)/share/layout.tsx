import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Share List | SmartList",
  description:
    "Share or synchronize your grocery shopping lists with friends and family. Instantly access list backups and collaborate on your grocery shopping easily.",
  alternates: {
    canonical: "https://smart-list.co.uk/share",
  },
};

export default function ShareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
