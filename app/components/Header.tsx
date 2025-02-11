import Image from "next/image";
import React from "react";
import logo from "@/public/images/shopwize-logo.svg";
import Link from "next/link";

interface HeaderProps {
  children?: React.ReactNode;
}

function Header({ children }: HeaderProps) {
  return (
    <header className="fixed top-0 grid grid-cols-3 text-center text-xl font-semibold w-full place-items-center bg-orange p-2">
      <div className="place-self-start">{children}</div>
      <Link href="/">
        <Image
          src={logo.src}
          className="flex-shrink-0 w-48"
          alt="Logo"
          width={logo.width}
          height={logo.height}
        />
      </Link>
    </header>
  );
}

export default Header;
