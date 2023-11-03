/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{/js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-color': '#417F56',
        'section1-color': '#698A50',
        'section2-color': '#849A85',
        'section3-color': '#848D9A',
        'section4-color': '#9A8498',
        'section5-color': '#B97F7F',
        'footer-color': '#454545',
      },
      backgroundImage: {
        'mid-bg-image': "url('/img/Cafeteria.jpg')"
      }
    },
  },
  plugins: [],
}