import Image from "next/image";
import React from "react";
import logo from "@/public/images/shopwize-logo.svg";
import Link from "next/link";

interface HeaderProps {
  children?: React.ReactNode;
}

function Header({ children }: HeaderProps) {
  return (
    <header className="fixed top-0 grid grid-cols-3 w-full place-items-center bg-orange h-20">
      <div className="place-self-start">{children}</div>
      <Link href="/" className="w-52">
        <Image
          src={logo.src}
          alt="Logo"
          width={logo.width}
          height={logo.height}
        />
      </Link>
    </header>
  );
}

export default Header;
