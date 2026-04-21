import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          deep: "#1f0a3d",
          gold: "#fbbf24",
        },
      },
    },
  },
  plugins: [],
};

export default config;
