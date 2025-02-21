import React from "react";
import { useTheme } from "./ThemeProvider";

function Spinner() {
  const { theme } = useTheme();

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
      <div
        style={{
          borderColor: `white ${theme.colorCode}`,
        }}
        className="border-4 rounded-full w-30 h-30 animate-spin"
      >
        <svg className="size-10 animate-spin" viewBox="0 0 24 24"></svg>
      </div>
    </div>
  );
}

export default Spinner;
