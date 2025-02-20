import React from "react";
import { classNames } from "../utils/appearance";
import { useTheme } from "./ThemeProvider";

type CardProps = {
  children: React.ReactNode;
  classes?: { card?: string };
};

function Card({ children, classes }: CardProps) {
  const { theme } = useTheme();
  return (
    <div
      className={classNames(
        "flex items-center justify-between w-full h-20 border border-orange rounded bg-opacity-10 odd:bg-opacity-60 p-4 shadow-md",
        classes?.card,
        theme.primary
      )}
    >
      {children}
    </div>
  );
}

export default Card;
