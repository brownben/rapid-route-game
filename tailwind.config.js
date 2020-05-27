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
      heading: ['kanit', 'system-ui', '-apple-system', 'Ubuntu', 'sans-serif'],
    },

    borderRadius: {
      none: '0',
      sm: '.125rem',
      md: '.25rem',
      lg: '.5rem',
      xl: '1rem',
    },

    extend: {
      colors: {
        white: {
          default: 'white',
          translucent: '#fffe',
        },
        dark: {
          '100': '#fafafa',
          '200': '#eaeaea',
          '300': '#999',
          '900': '#121212',
          '800': '#212121',
          '600': '#424242',
          translucent: '#212121ee',
        },
        purple: {
          light: '#d633ff',
          lighter: '#d11aff',
          default: '#CC00FF',
          darker: '#b800e6',
          dark: '#a300cc',
          darkest: '#520066',
        },
      },

      screens: {
        dark: { raw: '(prefers-color-scheme: dark)' },
      },
    },
  },
  variants: {},
  plugins: [],
}
