"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { IoMenu, IoShareSocialOutline } from "react-icons/io5";
import { RiCloseLargeLine } from "react-icons/ri";
import { LuScanText } from "react-icons/lu";
import { GoTasklist } from "react-icons/go";
import type { ComponentType } from "react";

import logo from "@/public/images/smart-list-logo.svg";
import { classNames } from "../utils/appearance";
import ThemeColors from "./ThemeColors";
import { useTheme } from "./ThemeProvider";
import { IoIosList } from "react-icons/io";

interface MenuItem {
  label: string;
  href: string;
  icon: ComponentType;
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useTheme();

  const menuItems: MenuItem[] = [
    { label: "List", href: "/", icon: GoTasklist },
    { label: "Scan", href: "/scan-receipt", icon: LuScanText },
    { label: "Compare", href: "/compare-prices", icon: IoIosList },
    { label: "Share", href: "/share", icon: IoShareSocialOutline },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <header
        className={classNames(
          "fixed top-0 grid grid-cols-3 w-full place-items-center h-24 z-40",
          theme.primary
        )}
      >
        <div></div>
        <Link href="/" className="w-52">
          <Image
            src={logo.src}
            alt="Logo"
            width={logo.width}
            height={logo.height}
          />
        </Link>
        <div
          className={classNames(
            "place-self-end my-auto rounded-md mr-4 p-2 cursor-pointer",
            theme.secondary,
            theme.text
          )}
          onClick={toggleMenu}
        >
          <IoMenu className="w-6 h-6" />{" "}
        </div>
      </header>

      <div
        className={classNames(
          "fixed top-0 right-0 bottom-0 left-0 flex flex-col items-center justify-between z-50 transition-all duration-150 ease-in-out",
          isMenuOpen ? "h-full p-4" : "h-0 overflow-hidden",
          theme.secondary,
          theme.text
        )}
      >
        <RiCloseLargeLine
          className="mx-2 my-6 text-3xl place-self-end cursor-pointer"
          onClick={toggleMenu}
        />
        <nav className="flex flex-col space-y-6 mt-10">
          <Link href="/" className="w-52">
            <Image
              src={logo.src}
              alt="Logo"
              width={logo.width}
              height={logo.height}
            />
          </Link>

          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex items-center gap-2 text-lg font-semibold transition-colors duration-200 ml-16"
              onClick={toggleMenu}
            >
              <item.icon />
              {item.label}
            </Link>
          ))}
          <Link
            href="https://fabriciocunha.vercel.app"
            className="font-semibold mx-auto"
            onClick={toggleMenu}
          >
            Developer Portfolio
          </Link>
        </nav>

        <ThemeColors />

        <div className="mt-8">
          <p className={classNames("text-sm", theme.text)}>
            © {new Date().getFullYear()} Smart List. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default Header;
