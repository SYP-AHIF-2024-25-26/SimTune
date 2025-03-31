/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,css}",
  ],
  theme: {
    extend: {
      colors: {
        costumGray: '#D9D9D9',
        costumBlue: '#6496FF',
        costumLightBlue: 'rgba(100, 150, 255, 0.25)',
        costumLightGray: '#F0F0F0',
        costumDarkGray: '#747171',
      },
      boxShadow: {
        'even': '0 0 10px 1px rgba(0, 0, 0, 0.5)',
      },
      spacing: {
        '19': '4.75rem',
        '70': '70%',
      },
    },
  },
  plugins: [],
}

