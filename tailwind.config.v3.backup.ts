// =========================================
// BACKUP: Original Tailwind v3 Configuration
// This file will be replaced by tailwind-v4.css in Tailwind v4
// All animations have been migrated to app/animations.css
// =========================================

import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx,mdx}',
    './app/**/*.{ts,tsx,mdx}',
    './src/**/*.{ts,tsx,mdx}'
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        'border': 'hsl(var(--border))',
        'input': 'hsl(var(--input))',
        'ring-3': 'hsl(var(--ring))',
        'background': 'hsl(var(--background))',
        'foreground': 'hsl(var(--foreground))',
        'primary': {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        'secondary': {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        'destructive': {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        'muted': {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        'accent': {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        'popover': {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        'card': {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        // ✅ MIGRATED TO animations.css and tailwind-v4.css
        'gradient-start': '#7F00FF',
        'gradient-end': '#E100FF',
        'background-dark': '#0B0A21',
        'foreground-dark': '#1A1941',
        'blue-light': '#00BFAE',
        'blue-dark': '#008F8C',
        'purple-light': '#7F00FF',
        'purple-dark': '#4B0082'
      },
      borderRadius: {
        'lg': 'var(--radius)',
        'md': 'calc(var(--radius) - 2px)',
        'sm': 'calc(var(--radius) - 4px)',
        // ✅ MIGRATED TO tailwind-v4.css
        'custom-lg': '1.5rem'
      },
      // ✅ ALL KEYFRAMES MIGRATED TO animations.css
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'spin-around': {
          '0%': { transform: 'translateZ(0) rotate(0)' },
          '15%, 35%': { transform: 'translateZ(0) rotate(90deg)' },
          '65%, 85%': { transform: 'translateZ(0) rotate(270deg)' },
          '100%': { transform: 'translateZ(0) rotate(360deg)' }
        },
        'slide': {
          to: { transform: 'translate(calc(100cqw - 100%), 0)' }
        },
        'marquee': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(calc(-100% - var(--gap)))' }
        },
        'marquee-vertical': {
          from: { transform: 'translateY(0)' },
          to: { transform: 'translateY(calc(-100% - var(--gap)))' }
        },
        'meteor': {
          '0%': { transform: 'rotate(215deg) translateX(0)', opacity: '1' },
          '70%': { opacity: '1' },
          '100%': {
            transform: 'rotate(215deg) translateX(-500px)',
            opacity: '0'
          }
        },
        'orbit': {
          '0%': {
            transform:
              'rotate(0deg) translateY(calc(var(--radius) * 1px)) rotate(0deg)'
          },
          '100%': {
            transform:
              'rotate(360deg) translateY(calc(var(--radius) * 1px)) rotate(-360deg)'
          }
        },
        'grid': {
          '0%': { transform: 'translateY(-50%)' },
          '100%': { transform: 'translateY(0)' }
        },
        'ripple': {
          '0%, 100%': { transform: 'translate(-50%, -50%) scale(1)' },
          '50%': { transform: 'translate(-50%, -50%) scale(0.9)' }
        },
        'move': {
          '0%': { 'offset-distance': '0%' },
          '100%': { 'offset-distance': '100%' }
        },
        'k': {
          '0%, 33.3%': { '--k': '1' }
        }
      },
      // ✅ ALL ANIMATIONS MIGRATED TO animations.css
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'spin-around': 'spin-around calc(var(--speed) * 2) infinite linear',
        'slide': 'slide var(--speed) ease-in-out infinite alternate',
        'marquee': 'marquee var(--duration) linear infinite',
        'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
        'meteor': 'meteor 5s linear infinite',
        'orbit': 'orbit calc(var(--duration)*1s) linear infinite',
        'grid': 'grid 15s linear infinite',
        'ripple': 'ripple 3400ms ease infinite',
        'glow-move': 'move 5s linear infinite',
        'particles':
          'k calc(var(--m) * 1s) linear calc(var(--m) * var(--t, 0) * 1s) infinite'
      }
    }
  },
  plugins: [
    require('tailwindcss-animate'),
    // ✅ CUSTOM UTILITIES MIGRATED TO animations.css and tailwind-v4.css
    plugin(({ addUtilities }) => {
      addUtilities({
        '.offset-path-rect': {
          'offset-path': 'rect(0% auto 100% auto)'
        },
        '.glow-bg': {
          background: 'radial-gradient(#fff, #f1f5f9, transparent)'
        }
      });
    })
  ]
} satisfies Config;

export default config;
