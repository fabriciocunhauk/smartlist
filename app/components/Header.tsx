import React from "react";

interface HeaderProps {
  children?: React.ReactNode;
}

function Header({ children }: HeaderProps) {
  return (
    <header className="grid grid-cols-3 text-center h-16 text-xl font-semibold w-full place-content-center">
      <div className="place-self-start">{children}</div>
      <h1 className="my-auto">ShopWize</h1>
    </header>
  );
}

export default Header;
