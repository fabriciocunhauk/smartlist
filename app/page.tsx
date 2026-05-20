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
    <div
      className={classNames(
        "h-full pt-24 md:pt-20 md:flex md:flex-col md:overflow-hidden",
        theme.secondary
      )}
    >
      <Header />
      <Container
        classes={{
          container:
            "w-full md:flex-grow md:flex md:flex-col md:overflow-hidden md:max-w-4xl md:px-8",
        }}
      >
        <ShoppingList />
      </Container>
      <Navbar />
    </div>
  );
}
