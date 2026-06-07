/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#F8F8F6',
        charcoal: '#1E1E1E',
        warmgray: '#7A7A7A',
        gold: {
          DEFAULT: '#D4B483',
          hover: '#C9A26B',
          light: '#E2CDAE',
        },
        card: '#FFFFFF',
        bordercolor: '#EAEAEA',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Outfit', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: 0.15 },
          '50%': { opacity: 0.35 },
        }
      }
    },
  },
  plugins: [],
}
