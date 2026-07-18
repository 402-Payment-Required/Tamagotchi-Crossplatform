/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        cream: '#FDF8F0',
        canvas: '#EDE4D6',
        line: '#E7DDCC',
        ink: '#2E2A26',
        'ink-soft': '#8A7F6E',
        'ink-softer': '#A79B88',
        brand: {
          DEFAULT: '#3DBE5C',
          dark: '#2E8B45',
          light: '#EDFBF0',
          lighter: '#CFF0D8',
        },
        peach: {
          DEFAULT: '#F58A00',
          light: '#FFA827',
          tint: '#FFF1DE',
          tint2: '#FFE4C4',
          text: '#5A4A2E',
          deep: '#E67E00',
        },
        locked: {
          bg: '#F3EEE4',
          icon: '#E6DFD2',
          text: '#7C7263',
          text2: '#B0A592',
        },
        navmuted: '#B4A994',
      },
      borderRadius: {
        device: '46px',
      },
    },
  },
  plugins: [],
};
