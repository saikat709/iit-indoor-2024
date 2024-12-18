/** @type {import('tailwindcss').Config} */

import daisyui from 'daisyui'

module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [ daisyui ],
}

