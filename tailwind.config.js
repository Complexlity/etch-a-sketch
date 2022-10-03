/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html'],
  theme: {
    screens: {
      sm: '480px',
      md: '770px',
      mg: '976px',
      xl: '1440px'
    },
    extend: {
      width: {
        '128': '32rem',
      },
      minWidth: {
        '128': '32rem',
      }
    },
  },
  plugins: [],
}
