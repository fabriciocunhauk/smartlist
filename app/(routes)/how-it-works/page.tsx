"use client";

import Header from "@/app/components/Header";
import Navbar from "@/app/components/Navbar";
import HomepageContent from "@/app/components/home/HomepageContent";
import { useTheme } from "@/app/context/ThemeContext";
import { classNames } from "@/app/utils/appearance";

export default function HowItWorks() {
  const { theme } = useTheme();

  return (
    <div
      className={classNames(
        "flex flex-col min-h-screen pb-12 transition-colors duration-300 ease-in-out",
        theme.secondary
      )}
    >
      <Header />
      <div className="pt-20">
        <HomepageContent />
      </div>
      <Navbar />
    </div>
  );
}
