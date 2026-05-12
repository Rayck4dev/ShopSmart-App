import { type Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        highlight: "#FACC15",
        action: "#FB923C",
        success: "#84CC16",
        nav: "#06B6D4",
        text: "#374151",
        background: "#F6F1EE",
      },
      fontFamily: {
        sans: ["Montserrat_400Regular"],
        medium: ["Montserrat_500Medium"],
        semibold: ["Montserrat_600SemiBold"],
        bold: ["Montserrat_700Bold"],
        extrabold: ["Montserrat_800ExtraBold"],
        black: ["Montserrat_900Black"],
      },
    },
  },
  plugins: [],
};

export default config;
