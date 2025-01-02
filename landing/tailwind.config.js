/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"], // Adjust this to match your HTML file paths
  theme: {
    extend: {
      colors: {
        shorttiee_primary: "#1F253F",
        shorttiee_secondary: "#1D3D3A",
        shorttiee_purple: "#3F1F3A",
        shorttiee_yellow: {
          dark: "#B1AD4E",
          light: "#EAE68B",
        },
        shorttiee_green: {
          dark: "#1DBF73",
          light: "#EAFFF5",
        },
        shorttiee_red: {
          dark: "#F0171D",
          light: "#FFEAEB",
        },
        grey_100: "#F7F6F2",
        grey_200: "#EBEBEB",
        grey_300: "#A1A3B0",
        grey_400: "#6B7280",
      },
    },
  },
  plugins: [],
};
