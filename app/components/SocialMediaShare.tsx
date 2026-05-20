"use client";
import React from "react";
import { FaFacebook, FaXTwitter, FaWhatsapp } from "react-icons/fa6";
import instagramIcon from "@/public/images/instagram-icon.svg";
import Image from "next/image";
import { classNames } from "../utils/appearance";

interface SocialMediaShareProps {
  url: string;
  title: string;
  text: string;
}

function SocialMediaShare({ url, title, text }: SocialMediaShareProps) {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedText = encodeURIComponent(text);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${
      encodedTitle + " - " + encodedText
    }`,
    instagram: `https://www.instagram.com/direct/new/?text=${encodedText} ${encodedUrl}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedText} ${encodedUrl}`,
  };

  const platforms = [
    {
      name: "Facebook",
      href: shareLinks.facebook,
      icon: <FaFacebook className="w-5 h-5 text-[#1877F2] group-hover:scale-110 transition-transform duration-200" />,
      colorClass: "hover:bg-[#1877F2]/10 hover:border-[#1877F2]/30 text-[#1877F2]",
    },
    {
      name: "X (Twitter)",
      href: shareLinks.twitter,
      icon: <FaXTwitter className="w-5 h-5 text-slate-900 group-hover:scale-110 transition-transform duration-200" />,
      colorClass: "hover:bg-slate-900/10 hover:border-slate-900/30 text-slate-900",
    },
    {
      name: "Instagram",
      href: shareLinks.instagram,
      icon: (
        <Image
          src={instagramIcon}
          className="w-5 h-5 object-contain group-hover:scale-110 transition-transform duration-200 rounded"
          alt="Instagram"
        />
      ),
      colorClass: "hover:bg-[#E4405F]/10 hover:border-[#E4405F]/30",
    },
    {
      name: "WhatsApp",
      href: shareLinks.whatsapp,
      icon: <FaWhatsapp className="w-5 h-5 text-[#25D366] group-hover:scale-110 transition-transform duration-200" />,
      colorClass: "hover:bg-[#25D366]/10 hover:border-[#25D366]/30 text-[#25D366]",
    },
  ];

  return (
    <div className="flex flex-col gap-3.5 w-full mt-2">
      <p className="text-xs font-bold text-slate-500/80 uppercase tracking-wider text-left">
        Or share directly via
      </p>
      <div className="grid grid-cols-4 gap-3 justify-center w-full">
        {platforms.map((platform) => (
          <a
            key={platform.name}
            href={platform.href}
            target="_blank"
            rel="noopener noreferrer"
            className={classNames(
              "group flex flex-col items-center justify-center p-3 rounded-2xl border border-slate-200/50 bg-white/40 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2",
              platform.colorClass
            )}
            title={`Share on ${platform.name}`}
          >
            {platform.icon}
          </a>
        ))}
      </div>
    </div>
  );
}

export default SocialMediaShare;
