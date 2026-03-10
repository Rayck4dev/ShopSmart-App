import { type Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        light: {
          highlight: "#FACC15",
          action: "#FB923C",
          success: "#84CC16",
          nav: "#06B6D4",
          text: "#374151",
        },
        dark: {
          highlight: "#EAB308",
          action: "#EA580C",
          success: "#65A30D",
          nav: "#0E7490",
          text: "#D1D5DB",
        },
      },
    },
  },
  plugins: [],
};

export default config;
