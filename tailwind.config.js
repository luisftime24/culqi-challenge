/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'culqi-dark': '#111827',
        'culqi-green-dark': '#27A376',
        'primary-green-300': '#00A19B',
        'culqi-gray-50': '#FAFAFA',
        'culqi-gray-100': '#F8F8F8',
        'culqi-gray-200': '#F1F2F4',
        'culqi-gray-300': '#E9EAEC',
        'culqi-gray-500': '#A0AEC0',
        'culqi-gray-600': '#687588',
        'culqi-gray-900': '#111827',
        'culqi-lightgray': '#F3F3F3',
        'culqi-text-error': '#E03137',
      },
      fontFamily: {
        manrope: ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

