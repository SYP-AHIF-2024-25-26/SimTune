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
        },
        badgeDrop: {
          '0%':   { opacity: '0', transform: 'translateY(-10px) scale(0.995)' },
          '100%': { opacity: '1', transform: 'translateY(0)      scale(1)' },
        },
        headlineLift: {
          '0%':   { opacity: '0', transform: 'translateY(14px) scale(0.985)' },
          '100%': { opacity: '1', transform: 'translateY(0)    scale(1)' },
        },
        subFadeBlur: {
          '0%':   { opacity: '0', filter: 'blur(6px)',  transform: 'translateY(10px)' },
          '100%': { opacity: '1', filter: 'blur(0px)', transform: 'translateY(0)' },
        },
        dividerGrow: {
          '0%':   { opacity: '0', transform: 'scaleX(0.6)' },
          '100%': { opacity: '1', transform: 'scaleX(1)'   },
        },
        wobbleA: {
          '0%':   { transform: 'translateY(0) translateX(0) rotate(0deg) scale(1)' },
          '20%':  { transform: 'translateY(-4px) translateX(2px) rotate(-0.45deg) scale(0.998)' },
          '40%':  { transform: 'translateY(3px)  translateX(-2px) rotate(0.35deg)  scale(1.002)' },
          '60%':  { transform: 'translateY(-3px) translateX(1.5px) rotate(0.25deg)  scale(1.001)' },
          '80%':  { transform: 'translateY(2px)  translateX(-1px) rotate(-0.35deg) scale(0.999)' },
          '100%': { transform: 'translateY(0) translateX(0) rotate(0deg) scale(1)' },
        },
        wobbleB: {
          '0%':   { transform: 'translateY(0) translateX(0) rotate(0deg) scale(1)' },
          '25%':  { transform: 'translateY(3px)  translateX(-2px) rotate(0.38deg)  scale(1.001)' },
          '50%':  { transform: 'translateY(-4px) translateX(1.5px) rotate(-0.5deg) scale(0.998)' },
          '75%':  { transform: 'translateY(2px)  translateX(2px)  rotate(0.28deg)  scale(1.002)' },
          '100%': { transform: 'translateY(0) translateX(0) rotate(0deg) scale(1)' },
        },
        driftSlow: {
          '0%':   { transform: 'translateX(-1px)' },
          '50%':  { transform: 'translateX(1px)' },
          '100%': { transform: 'translateX(-1px)' },
        },
      },
      animation: {
        flyIn: 'flyIn 0.8s ease-out forwards',
        badgeDrop:    'badgeDrop 520ms ease-out forwards',
        headlineLift: 'headlineLift 560ms cubic-bezier(0.22,1,0.36,1) forwards',
        subFadeBlur:  'subFadeBlur 600ms ease-out forwards',
        dividerGrow:  'dividerGrow 600ms ease-out forwards',
        slideInLeft: 'slideInLeft 0.8s ease-out forwards',
        slideInRight: 'slideInRight 0.8s ease-out forwards',
        wobbleA:  'wobbleA 5.5s ease-in-out infinite',
        wobbleB:  'wobbleB 5.2s ease-in-out infinite',
        driftSlow:'driftSlow 24s linear infinite',
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

