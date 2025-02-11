import { classNames } from "@/app/utils/appearance";
import Link from "next/link";
import React, { ReactNode } from "react";

type ButtonProps = {
  children?: ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  onClick?: () => void;
  link?: string;
  classes?: { link?: string; button?: string };
  disabled?: boolean;
};

function Button({
  children,
  type = "button",
  onClick,
  link,
  classes,
  disabled,
}: ButtonProps) {
  return link ? (
    <Link
      href={link}
      className={classNames(
        "flex items-center justify-center bg-orange hover:bg-orange/75 transition ease-in-out duration-300 max-w-max h-11 p-2 rounded",
        classes?.link
      )}
    >
      {children}
    </Link>
  ) : (
    <button
      className={classNames(
        "flex items-center justify-center bg-orange hover:bg-orange/75 transition ease-in-out duration-300 max-w-max h-11 p-2 rounded",
        classes?.button,
        disabled ? "opacity-30 cursor-not-allowed pointer-events-none" : ""
      )}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
