/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      backgroundImage: {
        // 'portfolio-bg': "url('/portfolio-bg.png')", // Removed - using DotGrid component
      },
      colors: {
        primary: {
          DEFAULT: '#f3701e',
          50: '#fff4ed',
          100: '#ffe3d0',
          200: '#ffc29b',
          300: '#ff9a5c',
          400: '#fb812f',
          500: '#f3701e',
          600: '#d94f0f',
          700: '#b43910',
          800: '#8f2f14',
          900: '#742a14',
        },
        secondary: {
          DEFAULT: '#4b607f',
          50: '#eef2f7',
          100: '#d9e1ec',
          200: '#b8c7d9',
          300: '#90a6c1',
          400: '#6a84a5',
          500: '#4b607f',
          600: '#40536e',
          700: '#35445a',
          800: '#2d3a4d',
          900: '#283241',
        },
        accent: {
          DEFAULT: '#e8d8c9',
          50: '#fbf7f3',
          100: '#f5ede5',
          200: '#e8d8c9',
          300: '#d8bea7',
          400: '#c69e7d',
          500: '#b7865e',
          600: '#a16f4b',
          700: '#865940',
          800: '#704b39',
          900: '#5d4032',
        },
        dark: {
          DEFAULT: '#181818',
          50: '#f4f4f4',
          100: '#dfdfdf',
          200: '#c0c0c0',
          300: '#999999',
          400: '#747474',
          500: '#5a5a5a',
          600: '#484848',
          700: '#343434',
          800: '#242424',
          900: '#181818',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      animation: {
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'shimmer': 'shimmer 3s infinite',
        'slide-up': 'slide-up 0.6s ease-out',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1', filter: 'brightness(1)' },
          '50%': { opacity: '0.8', filter: 'brightness(1.2)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'slide-up': {
          'from': { opacity: '0', transform: 'translateY(30px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgb(243 112 30 / 0.3), 0 0 40px rgb(243 112 30 / 0.2)',
        'glow-secondary': '0 0 20px rgb(75 96 127 / 0.3), 0 0 40px rgb(75 96 127 / 0.2)',
        'glow-accent': '0 0 20px rgb(232 216 201 / 0.25), 0 0 40px rgb(232 216 201 / 0.15)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}
