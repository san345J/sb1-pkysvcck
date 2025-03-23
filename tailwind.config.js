/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#A66CC1',
          50: '#F4EDF7',
          100: '#E9DBEF',
          200: '#D3B7DF',
          300: '#BD93CF',
          400: '#A66CC1',
          500: '#8F45AF',
          600: '#6F3689',
          700: '#4F2763',
          800: '#2F173C',
          900: '#0F0815',
        },
      },
    },
  },
  plugins: [],
};