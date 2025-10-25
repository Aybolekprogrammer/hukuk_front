/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        '4xl': '1920px',
        '5xl': '2560px',
        '6xl': '3600px',
        '7xl': '5120px',
        '8xl': '7120px',
      },
    },
  },
  plugins: [],
};

export default config;
