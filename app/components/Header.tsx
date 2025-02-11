import Image from "next/image";
import React from "react";
import logo from "@/public/images/shopwize-logo.svg";

interface HeaderProps {
  children?: React.ReactNode;
}

function Header({ children }: HeaderProps) {
  return (
    <header className="grid grid-cols-3 text-center text-xl font-semibold w-full place-items-center bg-orange">
      <div className="place-self-start">{children}</div>
      <Image
        src={logo.src}
        className="flex-shrink-0 w-20"
        alt="Logo"
        width={logo.width}
        height={logo.height}
      />
    </header>
  );
}

export default Header;
