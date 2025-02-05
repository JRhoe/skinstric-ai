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
        background: "var(--background)",
        foreground: "var(--foreground)",
        "main": {
          black: "#1A1B1C"
        }
      },
      fontFamily: {
        roobertReg: ["var(--RoobertRegular)"],
        roobertSemiBold: ["var(--RoobertSemiBold)"],
      }
    },
  },
  plugins: [],
} satisfies Config;
