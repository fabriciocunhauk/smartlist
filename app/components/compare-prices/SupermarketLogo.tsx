import React from "react";
import Image from "next/image";
import morrisons from "@/public/images/morrisons.svg";
import sainsburys from "@/public/images/sainsburys-logo.svg";
import lidl from "@/public/images/lidl.svg";
import tesco from "@/public/images/tesco-logo.svg";
import aldi from "@/public/images/aldi-logo.svg";
import asda from "@/public/images/asda.svg";

const supermarketLogos = [
  {
    image: morrisons,
    nameVariants: ["morrisons", "morrison"],
    alt: "Morrisons",
  },
  {
    image: sainsburys,
    nameVariants: ["sainsburys", "sainsbury’s", "sainsbury"],
    alt: "Sainsbury's",
  },
  {
    image: lidl,
    nameVariants: ["lidl"],
    alt: "Lidl",
  },
  {
    image: tesco,
    nameVariants: ["tesco"],
    alt: "Tesco",
  },
  {
    image: aldi,
    nameVariants: ["aldi"],
    alt: "Aldi",
  },
  {
    image: asda,
    nameVariants: ["asda"],
    alt: "Asda",
  },
];

const SupermarketLogo = ({ supermarketName }: { supermarketName: string }) => {
  const normalizeName = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9]/g, "");

  const logo = supermarketLogos.find((logo) => {
    const cleanSupermarketName = normalizeName(supermarketName);
    return logo.nameVariants.some((variant) =>
      cleanSupermarketName.includes(normalizeName(variant))
    );
  });

  if (!logo) return null;

  return (
    <Image
      src={logo.image}
      className="flex-shrink-0 w-20 h-16 object-contain"
      alt={logo.alt}
      width={logo.image.width}
      height={logo.image.height}
    />
  );
};

export default SupermarketLogo;
