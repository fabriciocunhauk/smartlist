"use client";
import Image from "next/image";
import React, { useState } from "react";
import logo from "@/public/images/smart-list-logo.svg";
import Link from "next/link";
import { IoMenu } from "react-icons/io5";
import { classNames } from "../utils/appearance";
import { RiCloseLargeLine } from "react-icons/ri";
import { LuScanText } from "react-icons/lu";
import { IoIosList } from "react-icons/io";
import { IoShareSocialOutline } from "react-icons/io5";
import { GoTasklist } from "react-icons/go";
import type { ComponentType } from "react";

interface MenuItem {
  label: string;
  href: string;
  icon: ComponentType;
}

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems: MenuItem[] = [
    { label: "List", href: "/", icon: IoIosList },
    { label: "Scan", href: "/scan-receipt", icon: LuScanText },
    { label: "Compare", href: "/compare-prices", icon: GoTasklist },
    { label: "Share", href: "/share", icon: IoShareSocialOutline },
  ];

  return (
    <>
      <header className="fixed top-0 grid grid-cols-3 w-full place-items-center bg-orange h-24 z-50">
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
          className="place-self-end my-auto bg-lightOrange rounded-md mr-4 p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <IoMenu className="w-6 h-6 text-orange" />
        </div>
      </header>

      <div
        className={classNames(
          "fixed top-0 right-0 bottom-0 left-0 flex flex-col items-center justify-between bg-lightOrange text-orange hover:text-orange/80 z-50 transition-all duration-150 ease-in-out",
          isOpen ? "h-full p-4" : "h-0 overflow-hidden"
        )}
      >
        <RiCloseLargeLine
          className="mx-2 my-6 text-3xl place-self-end cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        />

        <nav className="flex flex-col space-y-6 mt-10">
          {menuItems.map(({ href, label, icon: Icon }: MenuItem, index) => (
            <div key={index}>
              <Link
                href={href}
                className="flex items-center gap-2 text-lg font-semibold transition-colors duration-200 ml-9"
                onClick={() => setIsOpen(false)}
              >
                <Icon />
                {label}
              </Link>
            </div>
          ))}
          <Link
            href="https://fabriciocunha.vercel.app"
            className="flex  items-center gap-2 text-lg font-semibold transition-colors duration-200"
            onClick={() => setIsOpen(false)}
          >
            Developer Portfolio
          </Link>
        </nav>

        <div className="mt-8">
          <p className="text-sm text-orange">
            © {new Date().getFullYear()} Smart List. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}

export default Header;
