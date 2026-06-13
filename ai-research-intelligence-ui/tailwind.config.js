/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        dark: {
          bg: '#0f172a', // deep charcoal
          card: 'rgba(15, 23, 42, 0.6)',
          border: 'rgba(255, 255, 255, 0.1)',
          text: '#f8fafc',
          accent: '#818cf8', // neon-like purple
        },
        light: {
          bg: '#f8fafc', // frosted white
          card: 'rgba(255, 255, 255, 0.7)',
          border: 'rgba(0, 0, 0, 0.1)',
          text: '#0f172a',
          accent: '#c084fc', // pastel lavender
        }
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
