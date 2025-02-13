import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: "#FBB14B",
        darkGray: "#34495e",
      },
      keyframes: {
        "fade-in-left": {
          from: {transform: "translateX(-100%)", opacity: "0"},
          to: {transform: "translateX(0%)", opacity: "100%"}
        },
      },
      animation: { 
        "fade-in-left": "fade-in-left 0.2s ease-in-out forwards",
      },
    },
  },
  plugins: [],
} satisfies Config;
