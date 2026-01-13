/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./index.tsx",
    "./App.tsx",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        'dark-blue': {
          '50': '#f3f0ff',
          '100': '#ebe4ff',
          '200': '#d8ccff',
          '300': '#bca4ff',
          '400': '#9e70ff',
          '500': '#8237ff',
          '600': '#780fff',
          '700': '#6b00ff',
          '800': '#5900da',
          '900': '#5000bf',
          '950': '#2b007a',
        }
      }
    }
  },
  plugins: [],
}
