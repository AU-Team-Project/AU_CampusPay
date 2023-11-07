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
        'black-color': '#555555',
        'main-color': '#F8EFEA'
      },
      backgroundImage: {
        'mid-bg-image': "url('/img/Cafeteria.jpg')"
      },
      spacing: {
        '155': '155px',
        '175': '175px',
      },
      transitionDuration: {
        '1200': '1200ms',
        '1500': '1500ms',
        '3000': '3000ms'
      }
    },
  },
  plugins: [],
}