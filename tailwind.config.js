/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rust: {
          DEFAULT: '#f97316',
          dark: '#ea580c',
        },
        solana: {
          DEFAULT: '#a855f7',
        },
        surface: '#13131a',
        border: '#1e1e2e',
        background: '#0a0a0f',
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        shimmer: 'shimmer 2s infinite',
      },
    },
  },
  plugins: [],
}
