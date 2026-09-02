/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        navy:  '#0f4c7a',
        sblue: '#1b75bb',
        dark1: '#0b2b3d',
        dark2: '#0f3a52',
        gold:  '#cd924e',
        green: '#00a651',
        canvas:'#f4f8fb',
        danger:'#b42318',
      },
    },
  },
  plugins: [],
}
