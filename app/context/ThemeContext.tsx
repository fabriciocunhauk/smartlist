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
  id?: number;
  colorCode: string;
  text: string;
  primary: string;
  secondary: string;
}

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

const getInitialThemes = async () => {
  const dbName = "theme_selection_db";
  const storeName = "theme_selection_store";
  const storedTheme = await getDataFromIndexedDb(dbName, storeName);

  if (!storedTheme) {
    storeToIndexedDb(themeSelection, dbName, storeName);
  }

  return storedTheme;
};

interface ThemeContextType {
  theme: Theme;
  storedThemes: Theme[];
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: initialTheme,
  storedThemes: themeSelection,
  setTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [storedThemes, setStoredThemes] = useState<Theme[]>([]);

  const dbName = "theme_db";
  const storeName = "theme_store";

  useEffect(() => {
    const loadTheme = async () => {
      const loadedTheme = await getInitialTheme();
      const storedThemes = await getInitialThemes();

      setTheme(loadedTheme);
      setStoredThemes(storedThemes);
    };

    loadTheme();
  }, []);

  useEffect(() => {
    storeToIndexedDb(theme, dbName, storeName);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ storedThemes, theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
