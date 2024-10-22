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
      boxShadow: {
        'even': '0 0 10px 1px rgba(0, 0, 0, 0.5)',
      },
    },
  },
  plugins: [],
}

