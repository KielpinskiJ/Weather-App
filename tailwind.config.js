/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Raleway', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'main': '#1E213A',
        'secondary': '#100E1D',
        'text-main': '#E7E7EB',
        'text-secondary': '#A09FB1',
        'text-search': '#616475',
        'custom-yellow': '#FFEC65',
        'custom-gray': '#6E707A',
        'custom-blue': '#3C47E9',
      },
      height: {
        '10v': '10vh',
        '20v': '20vh',
        '30v': '30vh',
        '40v': '40vh',
        '50v': '50vh',
        '60v': '60vh',
        '70v': '70vh',
        '80v': '80vh',
        '90v': '90vh',
        '100v': '100vh',
      },
      width: {
        '10v': '10vw',
        '20v': '20vw',
        '30v': '30vw',
        '40v': '40vw',
        '50v': '50vw',
        '60v': '60vw',
        '70v': '70vw',
        '80v': '80vw',
        '90v': '90vw',
        '100v': '100vw',
      },
    },
    screens: {
      'xs': '360px',
      // => @media (min-width: 360px) { ... }

      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'hd': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }

      'fullhd': '1920px',
      // => @media (min-width: 1920px) { ... }

      '2k': '2560px',
      // => @media (min-width: 2560px) { ... }

      '4k': '3840px',
      // => @media (min-width: 3840px) { ... }
    },
    minHeight: {
      '1/2': '50%',
      '100': '100px',
      '150': '150px',
      '200': '200px',
    }
  },
  plugins: [],
}

