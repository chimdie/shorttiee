import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: "#1F253F",
        secondary: "#1D3D3A",
        purple: "#3F1F3A",
        yellow_dark: "#B1AD4E",
        yellow_light: "#EAE68B",
        grey_100: "#F7F6F2",
        grey_200: "#EBEBEB",
        grey_300: "#A1A3B0",
        grey_400: "#6B7280",
        white: "#FFFFFF",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
