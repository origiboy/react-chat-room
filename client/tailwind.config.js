/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'base': '0px 0px 60px 0px rgba(14, 116, 144, 0.49)',
      }
    }
  },
  plugins: [],
}