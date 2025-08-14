// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#0a0a0a',
          gold: '#d4af37',
          goldLight: '#f0d98c',
          white: '#ffffff',
          gray: '#9ca3af',
          grayDark: '#1a1a1a',
        },
      },
    },
  },
  plugins: [],
};
