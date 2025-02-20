"use client";
import React from "react";
import Button from "./Button";
import { LuScanText } from "react-icons/lu";
import { IoIosList } from "react-icons/io";
import { IoShareSocialOutline } from "react-icons/io5";
import { GoTasklist } from "react-icons/go";
import { useTheme } from "./ThemeProvider";
import { classNames } from "../utils/appearance";

function Navbar() {
  const { theme } = useTheme();

  return (
    <footer
      className={classNames(
        "fixed bottom-0 flex items-center justify-between h-20 w-full p-4 text-white",
        theme.primary
      )}
    >
      <Button
        link="/"
        classes={{
          link: "flex flex-col bg-transparent hover:bg-transparent h-20",
        }}
      >
        <GoTasklist className="w-7 h-7" />
        <span className="text-xs">List</span>
      </Button>
      <Button
        link="/scan-receipt"
        classes={{
          link: "flex flex-col bg-transparent hover:bg-transparent h-20",
        }}
      >
        <LuScanText className="w-7 h-7" />
        <span className="text-xs">Scan</span>
      </Button>
      <Button
        link="/compare-prices"
        classes={{
          link: "flex flex-col bg-transparent hover:bg-transparent h-20",
        }}
      >
        <IoIosList className="w-7 h-7" />
        <span className="text-xs">Compare</span>
      </Button>
      <Button
        link="/share"
        classes={{
          link: "flex flex-col bg-transparent hover:bg-transparent h-20",
        }}
      >
        <IoShareSocialOutline className="w-7 h-7" />
        <span className="text-xs">Share</span>
      </Button>
    </footer>
  );
}

export default Navbar;
