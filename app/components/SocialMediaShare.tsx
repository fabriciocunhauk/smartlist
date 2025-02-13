import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareFacebook, FaSquareXTwitter } from "react-icons/fa6";
import { RiWhatsappFill } from "react-icons/ri";
import instagram from "@/public/images/instagram-icon.svg";
import Image from "next/image";

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
    linkedin: `https://www.linkedin.com/sharing/shareArticle?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedText}`,
    instagram: `https://www.instagram.com/direct/new/?text=${encodedText} ${encodedUrl}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodedText} ${encodedUrl}`,
  };
  return (
    <div className="flex gap-4">
      <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer">
        <FaSquareFacebook className="w-10 h-10 text-blue-600" />
      </a>
      <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer">
        <FaSquareXTwitter className="w-10 h-10 text-black" />
      </a>
      <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer">
        <FaLinkedin className="w-10 h-10 text-blue-600" />
      </a>
      <a href={shareLinks.instagram} target="_blank" rel="noopener noreferrer">
        <Image
          src={instagram}
          className="h-10 w-10 object-cover rounded"
          alt="share qr code"
        />
      </a>
      <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer">
        <RiWhatsappFill className="w-10 h-10 text-green-500" />
      </a>
    </div>
  );
}

export default SocialMediaShare;
