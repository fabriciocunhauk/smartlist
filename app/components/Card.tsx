import React from "react";
import { classNames } from "../utils/appearance";

type CardProps = {
  children: React.ReactNode;
  classes?: { card?: string };
};

function Card({ children, classes }: CardProps) {
  return (
    <div
      className={classNames(
        "flex items-center justify-between w-full h-20 border border-orange rounded bg-orange bg-opacity-10 odd:bg-opacity-60 p-4 shadow-md",
        classes?.card
      )}
    >
      {children}
    </div>
  );
}

export default Card;
