/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
  ],
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      colors: {
        'orange-500': '#f07307',
        'blue-600': '#0065b3',
        'blue-500': '#009fe3',
        'blue-800': '#0065b3',
      },
      borderWidth: {
        '3': '3px',
        '10': '10px',
      },
    },
  },
  plugins: [],
}