/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        costumGray: '#D9D9D9',
        costumBlue: '#6496FF',
        costumLightGray: '#F0F0F0',
      },
    },
  },
  plugins: [],
}

