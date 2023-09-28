/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{/js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        sm: { min: "390px", max: "819px" },
        md: { min: "820px", max: "1023px" },
        lg: { min: "1080px" },
      },
      colors: {
        'blue-custom': '#1A6FB3',
        'blue-custom-deep': '#124FB6',
        'blue-custom-hover': '#103F8D'
      },
    },
  },
  plugins: [],
}