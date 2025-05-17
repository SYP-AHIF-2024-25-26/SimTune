/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,css}",
  ],
  theme: {
    extend: {
      keyframes: {
        flyIn: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-50px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(50px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        }
      },
      animation: {
        flyIn: 'flyIn 0.8s ease-out forwards',
        slideInLeft: 'slideInLeft 0.8s ease-out forwards',
        slideInRight: 'slideInRight 0.8s ease-out forwards',
      },
      colors: {
        costumGray: '#D9D9D9',
        costumBlue: '#6496FF',
        costumLightGreen: 'rgba(130, 230, 170, 0.25)',
        costumDarkGreen: '#064e3b',
        costumAnfangenBtn: '#7ccf98',
        costumAnfangenBtnHover: '#69ba82',
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

