const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [
    './pages/**/*.tsx',
    './components/**/*.tsx'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      cHeadings: ['Montserrat', ...defaultTheme.fontFamily.sans]
    },
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans]
      },
      colors: {
        'accented': '#ff5000'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
