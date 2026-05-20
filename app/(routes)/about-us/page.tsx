"use client";

import Header from "@/app/components/Header";
import Navbar from "@/app/components/Navbar";
import React from "react";
import { useTheme } from "@/app/context/ThemeContext";
import { classNames } from "@/app/utils/appearance";
import Container from "@/app/components/Container";

function RegisterProduct() {
  const { theme } = useTheme();

  return (
    <div
      className={classNames(
        "flex flex-col gap-10 items-center justify-center h-full pt-24 md:pt-20 md:overflow-hidden",
        theme.secondary
      )}
    >
      <Header />
      <Container classes={{ container: "text-center py-20" }}>
        <h2 className="font-bold text-4xl mb-4">About Us</h2>
        <p className="text-lg font-medium text-darkGray/80">Register Product / Information coming soon.</p>
      </Container>
      <Navbar />
    </div>
  );
}

export default RegisterProduct;
