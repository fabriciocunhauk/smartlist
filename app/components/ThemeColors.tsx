import React from "react";
import { useTheme } from "./ThemeProvider";

const themeSelection = [
  {
    id: 1,
    text: "text-orange",
    primary: "bg-orange",
    secondary: "bg-lightOrange",
  },
  {
    id: 2,
    text: "text-blue-500",
    primary: "bg-blue-500",
    secondary: "bg-blue-200",
  },
  {
    id: 3,
    text: "text-darkGray",
    primary: "bg-darkGray",
    secondary: "bg-gray-300",
  },
  {
    id: 4,
    text: "text-red-500",
    primary: "bg-red-500",
    secondary: "bg-red-300",
  },
];

function ThemeColors() {
  const { setTheme } = useTheme();

  const handleThemeColor = (
    text: string,
    primary: string,
    secondary: string
  ) => {
    const updatedList = { text, primary, secondary };

    setTheme(updatedList);
  };

  return (
    <div className="flex gap-10">
      {themeSelection.map(({ id, text, primary, secondary }: any) => {
        return (
          <div
            key={id}
            className="flex flex-col items-center justify-center outline outline-1 rounded-full overflow-hidden w-10 h-10 rotate-45 cursor-pointer"
            onClick={() => handleThemeColor(text, primary, secondary)}
          >
            <div className={`${primary} w-10 h-10`}></div>
            <div className={`${secondary} w-10 h-10`}></div>
          </div>
        );
      })}
    </div>
  );
}

export default ThemeColors;
