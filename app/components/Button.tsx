import { classNames } from "@/app/utils/appearance";
import Link from "next/link";
import React, { ReactNode } from "react";
import { useTheme } from "../context/ThemeContext";

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
  const { theme } = useTheme();

  return link ? (
    <Link
      href={link}
      className={classNames(
        "flex items-center justify-center transition hover:opacity-80 ease-in-out duration-300 max-w-max h-11 p-2 rounded",
        classes?.link,
        theme.primary
      )}
    >
      {children}
    </Link>
  ) : (
    <button
      className={classNames(
        "flex items-center justify-center transition hover:opacity-80 ease-in-out duration-300 max-w-max h-11 p-2 rounded",
        classes?.button,
        disabled ? "opacity-30 cursor-not-allowed pointer-events-none" : "",
        theme.primary
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
