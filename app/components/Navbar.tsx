"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuScanText } from "react-icons/lu";
import { IoIosList } from "react-icons/io";
import { IoShareSocialOutline } from "react-icons/io5";
import { GoTasklist } from "react-icons/go";
import { useTheme } from "../context/ThemeContext";
import { classNames } from "../utils/appearance";

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "List", icon: GoTasklist },
  { href: "/scan-receipt", label: "Scan", icon: LuScanText },
  { href: "/compare-prices", label: "Compare", icon: IoIosList },
  { href: "/share", label: "Share", icon: IoShareSocialOutline },
];

function Navbar() {
  const { theme } = useTheme();
  const pathname = usePathname();

  return (
    <footer
      className={classNames(
        "md:hidden fixed bottom-0 left-0 right-0 z-40 w-full border-t border-white/10 shadow-[0_-8px_30px_rgb(0,0,0,0.15)] transition-all duration-300 ease-in-out",
        "pb-[calc(8px+env(safe-area-inset-bottom,12px))] pt-2.5 px-6",
        theme.primary
      )}
    >
      <nav className="w-full max-w-md mx-auto" aria-label="Main Bottom Navigation">
        <ul className="flex items-center justify-between w-full">
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname?.startsWith(item.href));
            const Icon = item.icon;

            return (
              <li key={item.href} className="flex-1 flex justify-center">
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={classNames(
                    "group flex flex-col items-center justify-center gap-1 w-full max-w-[72px] py-1.5 rounded-2xl transition-all duration-300 ease-out select-none outline-none focus-visible:ring-2 focus-visible:ring-white/50",
                    isActive
                      ? "bg-white/15 text-white shadow-inner font-extrabold scale-105"
                      : "text-white/60 hover:text-white/90 hover:bg-white/5 active:scale-95"
                  )}
                >
                  <Icon
                    className={classNames(
                      "w-6 h-6 transition-all duration-300 ease-out",
                      isActive
                        ? "scale-110 drop-shadow-[0_2px_8px_rgba(255,255,255,0.25)]"
                        : "group-hover:scale-105"
                    )}
                  />
                  <span className="text-[10px] tracking-wide font-semibold">
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </footer>
  );
}

export default Navbar;
