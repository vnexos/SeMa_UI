import { heroui } from "@heroui/theme";
import plugin from "tailwindcss";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
        'space-crusaders': ['Space Crusaders'],
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        dark: {
          colors: {
            primary: '#00ff88',
            background: '#00071a',
            foreground: '#f8fafc',
          },
        },
      }
    }),
    plugin(function ({ addUtilities }) {
      addUtilities({
        // ✨ Light theme (subtle/darker glow)
        '.glow-green': {
          filter: `
            invert(40%) sepia(90%) saturate(1500%) hue-rotate(100deg) brightness(90%) contrast(100%)
            drop-shadow(0 0 3px #007a4d)
            drop-shadow(0 0 6px #007a4d)
          `,
        },
        // 🌙 Dark theme (bright neon glow)
        '.dark\\:glow-green': {
          filter: `
            invert(65%) sepia(97%) saturate(3000%) hue-rotate(90deg) brightness(150%) contrast(110%)
            drop-shadow(0 0 6px #00ff88)
            drop-shadow(0 0 12px #00ff88)
            drop-shadow(0 0 24px #00ff88)
            drop-shadow(0 0 48px #00ff88)
          `,
        },
      });
    }),
  ],
}

module.exports = config;