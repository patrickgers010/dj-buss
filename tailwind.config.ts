import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#080810",
        "bg-card": "#10101c",
        "bg-card2": "#14141f",
        neon: "#a855f7",
        "neon-blue": "#3b82f6",
        "neon-pink": "#ec4899",
        "neon-green": "#22d3ee",
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        glow: {
          from: { textShadow: "0 0 10px #a855f7, 0 0 20px #a855f7" },
          to: { textShadow: "0 0 20px #a855f7, 0 0 40px #a855f7, 0 0 60px #3b82f6" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
