"use client";
import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { classNames } from "../utils/appearance";
import { IoIosArrowDown } from "react-icons/io";

interface ThemeColorsProps {
  className?: string;
}

function ThemeColors({ className = "" }: ThemeColorsProps) {
  const [active, setActive] = useState(false);
  const { storedThemes, theme, setTheme } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActive(false);
      }
    };
    if (active) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [active]);

  const handleThemeColor = (
    colorCode: string,
    text: string,
    primary: string,
    secondary: string
  ) => {
    const updatedList = { colorCode, text, primary, secondary };
    setTheme(updatedList);
    setActive(false);
  };

  // Separate the selected theme from the rest of the themes, keeping the current theme first
  const sortedThemes = [
    ...storedThemes.filter((t) => t.primary === theme.primary),
    ...storedThemes.filter((t) => t.primary !== theme.primary),
  ];

  return (
    <div
      ref={dropdownRef}
      className={classNames("relative flex flex-col items-center select-none w-10 h-10", className)}
    >
      <div
        className={classNames(
          "absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center overflow-hidden transition-all duration-300 ease-in-out z-50 rounded-full",
          active
            ? "h-[210px] bg-slate-950/85 backdrop-blur-md border border-white/10 shadow-2xl p-2"
            : "h-[36px] bg-transparent p-1.5"
        )}
        style={{ width: "36px" }}
      >
        <div className="flex flex-col items-center gap-3">
          {sortedThemes.map(({ id, colorCode, text, primary, secondary }) => {
            return (
              <button
                key={id}
                className={classNames(
                  "flex flex-col items-center justify-center outline outline-1 rounded-full overflow-hidden w-6 h-6 rotate-45 cursor-pointer shrink-0 transition-transform duration-200 hover:scale-110 focus:outline-none",
                  active ? "outline-white/20 hover:outline-white/60" : "outline-white/30"
                )}
                onClick={(e) => {
                  if (!active) {
                    setActive(true);
                  } else {
                    e.stopPropagation();
                    handleThemeColor(colorCode, text, primary, secondary);
                  }
                }}
                aria-label={`Select ${text.replace("text-", "")} theme`}
              >
                <div className={`${primary} w-10 h-10`}></div>
                <div className={`${secondary} w-10 h-10`}></div>
              </button>
            );
          })}
          
          <IoIosArrowDown
            size="14"
            className={classNames(
              "text-white/80 transition-transform duration-300 ease-in-out cursor-pointer mt-1 hover:text-white",
              active && "rotate-180"
            )}
            onClick={(e) => {
              e.stopPropagation();
              setActive(!active);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ThemeColors;
