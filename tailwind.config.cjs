/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        reader: {
          'background': '#fcd0b1',
          'text': '#33302e',
        }
      }

    },
  },
  plugins: [
    require( 'tailwindcss' ),
    require( 'autoprefixer' )
  ],
}
