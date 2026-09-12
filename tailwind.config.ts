import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FAF8F3",
        card: "#FFFFFF",
        ink: {
          DEFAULT: "#17201B",
          soft: "#3F4A44",
          mute: "#646E68",
        },
        line: {
          DEFAULT: "#E3DED3",
          strong: "#C9C2B3",
        },
        moss: {
          50: "#EEF4EF",
          100: "#D9E6DC",
          200: "#B3CDB9",
          500: "#2F6B4F",
          600: "#245A41",
          700: "#1C4834",
          800: "#143627",
          900: "#0E271C",
        },
        clay: {
          100: "#F6E9DD",
          500: "#B8673A",
          700: "#8E4A25",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        prose: "68ch",
        site: "72rem",
      },
    },
  },
  plugins: [],
};

export default config;
