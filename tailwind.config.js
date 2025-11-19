/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // HSL-based premium color system
        primary: {
          DEFAULT: 'hsl(199, 89%, 48%)',
          50: 'hsl(199, 89%, 95%)',
          100: 'hsl(199, 89%, 85%)',
          200: 'hsl(199, 89%, 75%)',
          300: 'hsl(199, 89%, 65%)',
          400: 'hsl(199, 89%, 55%)',
          500: 'hsl(199, 89%, 48%)',
          600: 'hsl(199, 89%, 40%)',
          700: 'hsl(199, 89%, 32%)',
          800: 'hsl(199, 89%, 24%)',
          900: 'hsl(199, 89%, 16%)',
        },
        secondary: {
          DEFAULT: 'hsl(258, 90%, 66%)',
          50: 'hsl(258, 90%, 95%)',
          100: 'hsl(258, 90%, 85%)',
          200: 'hsl(258, 90%, 75%)',
          300: 'hsl(258, 90%, 70%)',
          400: 'hsl(258, 90%, 68%)',
          500: 'hsl(258, 90%, 66%)',
          600: 'hsl(258, 90%, 58%)',
          700: 'hsl(258, 90%, 48%)',
          800: 'hsl(258, 90%, 38%)',
          900: 'hsl(258, 90%, 28%)',
        },
        accent: {
          DEFAULT: 'hsl(326, 78%, 65%)',
          50: 'hsl(326, 78%, 95%)',
          100: 'hsl(326, 78%, 85%)',
          200: 'hsl(326, 78%, 75%)',
          300: 'hsl(326, 78%, 70%)',
          400: 'hsl(326, 78%, 67%)',
          500: 'hsl(326, 78%, 65%)',
          600: 'hsl(326, 78%, 55%)',
          700: 'hsl(326, 78%, 45%)',
          800: 'hsl(326, 78%, 35%)',
          900: 'hsl(326, 78%, 25%)',
        },
        dark: {
          DEFAULT: 'hsl(240, 10%, 4%)',
          50: 'hsl(240, 10%, 95%)',
          100: 'hsl(240, 10%, 85%)',
          200: 'hsl(240, 10%, 75%)',
          300: 'hsl(240, 10%, 65%)',
          400: 'hsl(240, 10%, 55%)',
          500: 'hsl(240, 10%, 45%)',
          600: 'hsl(240, 10%, 35%)',
          700: 'hsl(240, 10%, 25%)',
          800: 'hsl(240, 10%, 15%)',
          900: 'hsl(240, 10%, 4%)',
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
        'glow-primary': '0 0 20px hsl(199, 89%, 48%, 0.3), 0 0 40px hsl(199, 89%, 48%, 0.2)',
        'glow-secondary': '0 0 20px hsl(258, 90%, 66%, 0.3), 0 0 40px hsl(258, 90%, 66%, 0.2)',
        'glow-accent': '0 0 20px hsl(326, 78%, 65%, 0.3), 0 0 40px hsl(326, 78%, 65%, 0.2)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}