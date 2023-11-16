/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{/js,ts,jsx,tsx}'],
  theme: {
    extend: {
      /* 사용자 지정 반응형 */
      screens: {
        xsm: { min: '320px'}
      },
      /* 사용자 지정 색상 */
      colors: {
        'primary-color': '#FF9500',
        'sub-font-color': '#7c7c7c',
        'title-font-color': '#212529',
        'section1-color': '#F5F5F7',
        'section2-color': '#FFEDD5',
        'section3-color': '#fbf9f3',
        'section4-color': '#FFF8E1',
        'section5-color': '#faf9f9',
        'section1-text-color': '#6D788C',
        'section2-text-color': '#C06014',
        'section3-text-color': '#2D3748',
        'section4-text-color': '#FF6F00',
        'section5-text-color': '#1E88E5',
        'footer-color': '#454545',
        'black-color': '#333',
        'main-color': '#F8EFEA'
      },
      /* 사용자 지정 이미지 */
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