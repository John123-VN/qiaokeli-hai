/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./apps/web/public/index.html",
    "./apps/web/src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        chocolate: {
          900: '#120a07', // Darkest chocolate (app background)
          850: '#160d09', // Deep brown (timeline area)
          800: '#1a0f0a', // Medium dark (sidebar panels)
          700: '#1e120c', // Dark warm (headers/buttons)
          600: '#2d1b12', // Warm accent borders
          500: '#382318', // Hover state highlights
          400: '#4a2e20', // Dull brown structural borders
          accent: '#d4a373', // Rich milk chocolate/gold (interactive elements)
          text: '#fdf0ed'   // Warm off-white
        }
      }
    }
  },
  plugins: [],
}
