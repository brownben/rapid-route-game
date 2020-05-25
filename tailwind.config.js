module.exports = {
  purge: ['./src/**/*.vue'],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },

    fontFamily: {
      main: [
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Oxygen',
        'Ubuntu',
        'Cantarell',
        'Fira Sans',
        'Droid Sans',
        'Helvetica Neue',
        'sans-serif',
      ],
    },

    borderRadius: {
      none: '0',
      sm: '.125rem',
      md: '.25rem',
      lg: '.5rem',
      xl: '1rem',
    },
  },
  variants: {},
  plugins: [],
}
