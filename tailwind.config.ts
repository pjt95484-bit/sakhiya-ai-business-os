import type { Config } from "tailwindcss";

/**
 * Colours resolve to the CSS custom properties defined in app/globals.css.
 * The `<alpha-value>` placeholder keeps Tailwind's opacity modifiers working
 * (bg-surface/80), so no component ever needs a literal colour.
 */
const token = (name: string) => `rgb(var(${name}) / <alpha-value>)`;

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Named "ground", not "base": a colour named base would collide with
        // Tailwind's built-in text-base font-size utility.
        ground: token("--bg-base-rgb"),
        surface: token("--bg-surface-rgb"),
        raised: token("--bg-raised-rgb"),
        neon: {
          DEFAULT: token("--neon-rgb"),
          dim: token("--neon-dim-rgb"),
        },
        copy: {
          DEFAULT: token("--text-rgb"),
          muted: token("--text-muted-rgb"),
        },
        edge: "rgb(var(--neon-rgb) / 0.18)",
      },
      borderColor: {
        DEFAULT: "rgb(var(--neon-rgb) / 0.18)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgb(var(--neon-rgb) / 0.4), 0 10px 34px -8px rgb(var(--neon-rgb) / 0.5)",
        "glow-soft":
          "0 0 0 1px rgb(var(--neon-rgb) / 0.3), 0 6px 22px -10px rgb(var(--neon-rgb) / 0.35)",
      },
      maxWidth: {
        site: "72.5rem",
        measure: "68ch",
      },
    },
  },
  plugins: [],
};

export default config;
