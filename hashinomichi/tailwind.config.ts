import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#0a0a0b',
        ash: '#1a1a1c',
        gold: {
          DEFAULT: '#c9a84c',
          light: '#e8c97a',
          dark: '#8a6a20',
        },
        pearl: '#d4d4dc',
        ivory: '#f0ede8',
        sakura: '#f2a7b5',
        muted: '#6b6b72',
      },
      fontFamily: {
        jp: ['Noto Serif JP', 'serif'],
        display: ['Cormorant Garamond', 'serif'],
        sc: ['Cormorant SC', 'serif'],
        body: ['Cormorant', 'serif'],
      },
      screens: {
        xs: '420px',
      },
    },
  },
  plugins: [],
}

export default config
