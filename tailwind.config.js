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
        // Light Theme - Orange/Cool Palette (like logo)
        primary: {
          DEFAULT: 'hsl(15, 85%, 55%)', // Warm Orange
          50: 'hsl(15, 85%, 95%)',
          100: 'hsl(15, 85%, 90%)',
          200: 'hsl(15, 85%, 80%)',
          300: 'hsl(15, 85%, 70%)',
          400: 'hsl(15, 85%, 62%)',
          500: 'hsl(15, 85%, 55%)',
          600: 'hsl(15, 85%, 48%)',
          700: 'hsl(15, 85%, 40%)',
          800: 'hsl(15, 85%, 32%)',
          900: 'hsl(15, 85%, 24%)',
        },
        secondary: {
          DEFAULT: 'hsl(200, 75%, 60%)', // Cool Blue
          50: 'hsl(200, 75%, 95%)',
          100: 'hsl(200, 75%, 90%)',
          200: 'hsl(200, 75%, 80%)',
          300: 'hsl(200, 75%, 70%)',
          400: 'hsl(200, 75%, 65%)',
          500: 'hsl(200, 75%, 60%)',
          600: 'hsl(200, 75%, 52%)',
          700: 'hsl(200, 75%, 44%)',
          800: 'hsl(200, 75%, 36%)',
          900: 'hsl(200, 75%, 28%)',
        },
        accent: {
          DEFAULT: 'hsl(280, 65%, 65%)', // Cool Purple
          50: 'hsl(280, 65%, 95%)',
          100: 'hsl(280, 65%, 90%)',
          200: 'hsl(280, 65%, 80%)',
          300: 'hsl(280, 65%, 72%)',
          400: 'hsl(280, 65%, 68%)',
          500: 'hsl(280, 65%, 65%)',
          600: 'hsl(280, 65%, 58%)',
          700: 'hsl(280, 65%, 50%)',
          800: 'hsl(280, 65%, 42%)',
          900: 'hsl(280, 65%, 34%)',
        },
        // Dark Theme - Deep Blues/Purples
        dark: {
          DEFAULT: 'hsl(240, 15%, 8%)',
          50: 'hsl(240, 15%, 95%)',
          100: 'hsl(240, 15%, 85%)',
          200: 'hsl(240, 15%, 75%)',
          300: 'hsl(240, 15%, 65%)',
          400: 'hsl(240, 15%, 55%)',
          500: 'hsl(240, 15%, 45%)',
          600: 'hsl(240, 15%, 35%)',
          700: 'hsl(240, 15%, 25%)',
          800: 'hsl(240, 15%, 15%)',
          900: 'hsl(240, 15%, 8%)',
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
        'glow-primary': '0 0 20px hsl(15, 85%, 55%, 0.3), 0 0 40px hsl(15, 85%, 55%, 0.2)',
        'glow-secondary': '0 0 20px hsl(200, 75%, 60%, 0.3), 0 0 40px hsl(200, 75%, 60%, 0.2)',
        'glow-accent': '0 0 20px hsl(280, 65%, 65%, 0.3), 0 0 40px hsl(280, 65%, 65%, 0.2)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}
