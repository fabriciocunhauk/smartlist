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

interface Theme {
  id?: number;
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
  const [storedThemes, setStoredThemes] = useState<Theme[]>(themeSelection);

  const dbName = "theme_db";
  const storeName = "theme_store";
  const dbNameForSelection = "theme_selection_db";
  const storeNameForSelection = "theme_selection_store";

  useEffect(() => {
    const initializeThemeAndStoredThemes = async () => {
      const loadedTheme = await getDataFromIndexedDb(dbName, storeName);
      if (loadedTheme) {
        setTheme(loadedTheme);
      }

      const storedThemes = await getDataFromIndexedDb(
        dbNameForSelection,
        storeNameForSelection
      );
      if (!storedThemes) {
        storeToIndexedDb(
          themeSelection,
          dbNameForSelection,
          storeNameForSelection
        );
        setStoredThemes(themeSelection);
      } else {
        setStoredThemes(storedThemes);
      }
    };

    initializeThemeAndStoredThemes();
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
