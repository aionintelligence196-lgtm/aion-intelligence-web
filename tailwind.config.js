/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // <--- This enables the custom light/dark mode switch
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        themegreen: '#25db79',
      },

      fontFamily: {
        poppins: ['Poppins', 'sans-serif'], // Add Poppins font
      },
    },
  },
  plugins: [],
}