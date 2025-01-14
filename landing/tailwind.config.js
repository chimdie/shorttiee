/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html"], // Adjust this to match your HTML file paths
  theme: {
    extend: {
      colors: {
        "shorttiee-primary": "#1F253F",
        "shorttiee-secondary": "#1D3D3A",
        "shorttiee-purple": "#3F1F3A",
        "shorttiee-yellow": {
          dark: "#B1AD4E",
          light: "#EAE68B",
        },
        "shorttiee-green": {
          dark: "#1DBF73",
          light: "#EAFFF5",
        },
        "shorttiee-red": {
          dark: "#F0171D",
          light: "#FFEAEB",
        },
        "grey-100": "#F7F6F2",
        "grey-200": "#EBEBEB",
        "grey-300": "#A1A3B0",
        "grey-400": "#6B7280",
      },
    },
  },
  plugins: [],
};
