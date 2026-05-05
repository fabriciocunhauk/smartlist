"use client";

import Container from "./components/Container";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import ShoppingList from "./components/home/ShoppingList";
import { useTheme } from "./context/ThemeContext";
import { classNames } from "./utils/appearance";

export default function Home() {
  const { theme } = useTheme();

  return (
    <div className={classNames("h-full pt-24", theme.secondary)}>
      <Header />
      <Container>
        <ShoppingList />
      </Container>
      <Navbar />
    </div>
  );
}
