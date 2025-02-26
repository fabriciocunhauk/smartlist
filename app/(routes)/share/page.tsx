"use client";
import Header from "@/app/components/Header";
import Navbar from "@/app/components/Navbar";
import Image from "next/image";
import shareQRcode from "@/public/images/share-smart-list.png";
import SocialMediaShare from "@/app/components/SocialMediaShare";
import { useTheme } from "@/app/context/ThemeContext";
import { classNames } from "@/app/utils/appearance";

function IoShareSocialOutline() {
  const { theme } = useTheme();

  return (
    <div
      className={classNames(
        "flex flex-col gap-10 items-center justify-center h-full",
        theme.secondary
      )}
    >
      <Header />

      <h2 className="font-bold text-4xl">Share The SmartList</h2>

      <Image
        src={shareQRcode}
        className="h-40 w-40 object-cover rounded"
        alt="share qr code"
      />

      <SocialMediaShare
        url="https://www.smart-list.co.uk"
        title="Unlock Your Smart Shopping Experience!"
        text="Streamline your shopping with SmartList, the ultimate tool for organizing, price comparison, and deal hunting."
      />

      <Navbar />
    </div>
  );
}

export default IoShareSocialOutline;
