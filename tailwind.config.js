/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{/js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'blue-custom': '#1A6FB3',
        'blue-custom-deep': '#124FB6',
        'blue-custom-hover': '#103F8D'
      },
    },
  },
  plugins: [],
}