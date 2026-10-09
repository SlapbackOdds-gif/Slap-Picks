import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0A0E14",
        panel: "#111826",
        line: "#1F2A3C",
        edge: "#00FF85",
        edgedim: "#0FBF6B",
        volt: "#4C8DFF",
        warn: "#FF4D6D",
        mist: "#8592A6",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 24px rgba(0,255,133,0.25)",
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(180deg, rgba(0,255,133,0.06) 0%, rgba(10,14,20,0) 60%)",
      },
    },
  },
  plugins: [],
};
export default config;
