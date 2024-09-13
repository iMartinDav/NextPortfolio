import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'gradient-start': '#7F00FF',
        'gradient-end': '#E100FF',
        'background': '#0B0A21',
        'foreground': '#1A1941',
        'blue-light': '#00BFAE',
        'blue-dark': '#008F8C',
        'purple-light': '#7F00FF',
        'purple-dark': '#4B0082',
      },
      borderRadius: {
        'custom-lg': '1.5rem',
      },
      keyframes: {
        move: {
          '0%': { 'offset-distance': '0%' },
          '100%': { 'offset-distance': '100%' },
        },
      },
      animation: {
        'glow-move': 'move 5s linear infinite',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(function({ addUtilities }) {
      addUtilities({
        '.offset-path-rect': {
          'offset-path': 'rect(0% auto 100% auto)',
        },
        '.glow-bg': {
          'background': 'radial-gradient(#fff, #f1f5f9, transparent)',
        },
      })
    }),
  ],
};

export default config;
