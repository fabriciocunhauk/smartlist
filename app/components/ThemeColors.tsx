import React, { useState } from "react";
import { useTheme } from "./ThemeProvider";
import { classNames } from "../utils/appearance";
import { IoIosArrowDown } from "react-icons/io";

function ThemeColors() {
  const [active, setActive] = useState(false);
  const { storedThemes, theme, setTheme } = useTheme();

  // Separate the selected theme from the rest of the themes
  const sortedThemes = [
    ...storedThemes.filter((t) => t.primary === theme.primary), // Selected theme first
    ...storedThemes.filter((t) => t.primary !== theme.primary), // Rest of the themes
  ];

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
    <div className="flex flex-col absolute left-4 top-5">
      <div
        className={classNames(
          "overflow-hidden h-10 p-2 transition-all duration-300 ease-in-out",
          active && "h-80"
        )}
      >
        <div className="flex flex-col gap-10">
          {sortedThemes.map(({ id, colorCode, text, primary, secondary }) => {
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
