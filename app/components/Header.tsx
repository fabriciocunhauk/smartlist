"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IoMenu, IoShareSocialOutline } from "react-icons/io5";
import { RiCloseLargeLine } from "react-icons/ri";
import { LuScanText } from "react-icons/lu";
import { GoTasklist } from "react-icons/go";
import logo from "@/public/images/smart-list-logo.svg";
import { classNames } from "../utils/appearance";
import ThemeColors from "./ThemeColors";
import { useTheme } from "../context/ThemeContext";
import { IoIosList } from "react-icons/io";
import AddToHomeScreen from "./AddToHomeScreen";

interface MenuItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme } = useTheme();
  const pathname = usePathname();

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
          "fixed top-0 w-full z-40 transition-all duration-300 ease-in-out px-4",
          "h-24",
          "md:flex md:items-center md:justify-between md:h-20 md:px-8",
          theme.primary
        )}
      >
        {/* Actions Group (Mobile: absolute left, Desktop: static flex end) */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 md:static md:translate-y-0 md:gap-4 md:order-3">
          <ThemeColors />
          <AddToHomeScreen buttonClass="ml-0 md:ml-0" />
        </div>

        {/* Logo (Mobile: absolute centered, Desktop: static left order-1) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:static md:translate-x-0 md:translate-y-0 md:order-1 flex justify-center items-center">
          <Link href="/" className="w-36 md:w-44 flex items-center justify-center">
            <Image
              src={logo.src}
              alt="Logo"
              width={logo.width}
              height={logo.height}
              priority={true}
              style={theme.id !== 1 ? { filter: "brightness(0) invert(1)" } : undefined}
            />
          </Link>
        </div>

        {/* Menu & Navigation (Mobile: absolute right, Desktop: static center order-2) */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 md:static md:translate-y-0 md:order-2 flex items-center">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-3" aria-label="Desktop Navigation">
            {menuItems.map((item, index) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname?.startsWith(item.href));
              const Icon = item.icon;
              return (
                <Link
                  key={index}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={classNames(
                    "group flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ease-out select-none outline-none focus-visible:ring-2 focus-visible:ring-white/50",
                    isActive
                      ? "bg-white/15 text-white shadow-inner scale-105"
                      : "text-white/70 hover:text-white hover:bg-white/5 active:scale-95"
                  )}
                >
                  <Icon
                    className={classNames(
                      "w-4 h-4 transition-all duration-300 ease-out",
                      isActive ? "scale-110" : "group-hover:scale-105"
                    )}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Hamburguer Icon */}
          <div
            className={classNames(
              "md:hidden my-auto rounded-md p-2 cursor-pointer",
              theme.secondary,
              theme.text
            )}
            onClick={toggleMenu}
          >
            <IoMenu className="w-6 h-6" />{" "}
          </div>
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
              priority={true}
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
