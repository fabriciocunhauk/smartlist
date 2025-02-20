"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getDataFromIndexedDb } from "../utils/getDataFromIndexedDb";
import { storeToIndexedDb } from "../utils/storeToIndexedDb";

interface Theme {
  colorCode: string;
  text: string;
  primary: string;
  secondary: string;
}

const initialTheme: Theme = {
  colorCode: "#FBB14B",
  text: "text-orange",
  primary: "bg-orange",
  secondary: "bg-lightOrange",
};

const getInitialTheme = async () => {
  const dbName = "theme_db";
  const storeName = "theme_store";
  const storedTheme = await getDataFromIndexedDb(dbName, storeName);
  return storedTheme || initialTheme;
};

interface ThemeContextType {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: initialTheme,
  setTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(initialTheme);

  const dbName = "theme_db";
  const storeName = "theme_store";

  useEffect(() => {
    const loadTheme = async () => {
      const loadedTheme = await getInitialTheme();
      setTheme(loadedTheme);
    };

    loadTheme();
  }, []);

  useEffect(() => {
    storeToIndexedDb(theme, dbName, storeName);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
