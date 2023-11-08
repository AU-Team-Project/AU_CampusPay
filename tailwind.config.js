/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{/js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-color': '#417F56',
        'section1-color': '#F5F5F7',
        'section2-color': '#FFEDD5',
        'section3-color': '#F3F4F6',
        'section4-color': '#FFF8E1',
        'section5-color': '#E3F2FD',
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
      },
      boxShadow: {
        'custom': '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}