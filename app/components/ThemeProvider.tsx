"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

const getInitialTheme = () => {
  const store = localStorage.getItem("theme");

  if (store === null) {
    localStorage.setItem(
      "theme",
      JSON.stringify({
        text: "text-orange",
        primary: "bg-orange",
        secondary: "bg-lightOrange",
      })
    );
  }

  const initialThemeColor = JSON.parse(store as string);

  return initialThemeColor;
};

const ThemeContext = createContext(getInitialTheme());

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState(getInitialTheme());

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
