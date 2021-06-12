const colors = require('tailwindcss/colors')


module.exports = {
  purge: ["./dist/*.html", "./src/**/*.js"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        "ducktalk": ["Lilita One", "cursive"],
      },
      zIndex: {
        '-10': -10,
      },
      colors: {
        orange: colors.orange
      },
      screens: {
        'portrait': {'raw': '(orientation: portrait)'}
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
