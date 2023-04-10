/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: true
  },
  
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#243763',
        'secundary':'#FF6E31',
        'tertiary':'#FFEBB7',
        'quaternary':'#AD8E70'
      },
      fontFamily: {
        kanit: ['Kanit','sans-serif']
      }
    },
  },
  plugins: [],
}
