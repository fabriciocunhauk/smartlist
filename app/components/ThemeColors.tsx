import React, { useState } from "react";
import { useTheme } from "./ThemeProvider";
import { classNames } from "../utils/appearance";
import { IoIosArrowDown } from "react-icons/io";

const themeSelection = [
  {
    id: 1,
    colorCode: "#FBB14B",
    text: "text-orange",
    primary: "bg-orange",
    secondary: "bg-lightOrange",
  },
  {
    id: 2,
    colorCode: "#3B82F6",
    text: "text-blue-500",
    primary: "bg-blue-500",
    secondary: "bg-blue-200",
  },
  {
    id: 3,
    colorCode: "#34495e",
    text: "text-darkGray",
    primary: "bg-darkGray",
    secondary: "bg-gray-200",
  },
  {
    id: 4,
    colorCode: "#EF4444",
    text: "text-red-500",
    primary: "bg-red-500",
    secondary: "bg-red-200",
  },
  {
    id: 5,
    colorCode: "#22C55E",
    text: "text-green-500",
    primary: "bg-green-500",
    secondary: "bg-green-200",
  },
];

function ThemeColors() {
  const [active, setActive] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleThemeColor = (
    colorCode: string,
    text: string,
    primary: string,
    secondary: string
  ) => {
    const updatedList = { colorCode, text, primary, secondary };

    setTheme(updatedList);
  };

  return (
    <div className="flex flex-col absolute left-4">
      <div
        className={classNames(
          "overflow-hidden h-10 p-2 transition-all duration-300 ease-in-out",
          active && "h-80"
        )}
      >
        <div className="flex flex-col gap-10">
          {themeSelection.map(({ id, colorCode, text, primary, secondary }) => {
            return (
              <div
                key={id}
                className={classNames(
                  "flex flex-col items-center justify-center outline outline-1 outline-darkGray rounded-full overflow-hidden w-6 h-6 rotate-45 cursor-pointer"
                )}
                onClick={() =>
                  handleThemeColor(colorCode, text, primary, secondary)
                }
              >
                <div className={`${primary} w-10 h-10`}></div>
                <div className={`${secondary} w-10 h-10`}></div>
              </div>
            );
          })}
        </div>
      </div>

      <IoIosArrowDown
        size="16"
        className={classNames(
          "text-white/90 mx-auto cursor-pointer transition-all duration-300 ease-in-out bg-white/70 w-7",
          active && "rotate-180",
          theme.text
        )}
        onClick={() => setActive(!active)}
      />
    </div>
  );
}

export default ThemeColors;
