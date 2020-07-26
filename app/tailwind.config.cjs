// Doc: https://tailwindcss.com/docs/configuration
module.exports = {
  plugins: [require('@tailwindcss/custom-forms')],

  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js',
      './app.html',
    ],
  },

  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },

    container: {
      center: true,
      padding: {
        default: '1rem',
        md: '2rem',
      },
    },

    fontFamily: {
      base: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
    },

    boxShadow: {
      default: '0 1px 3px 0 rgba(0, 0, 0, .1), 0 1px 2px 0 rgba(0, 0, 0, .06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, .1), 0 2px 4px -1px rgba(0, 0, 0, .06)',
      lg:
        '0 10px 15px -3px rgba(0, 0, 0, .1), 0 4px 6px -2px rgba(0, 0, 0, .05)',
      xl:
        '0 20px 25px -5px rgba(0, 0, 0, .1), 0 10px 10px -5px rgba(0, 0, 0, .04)',
      outline: '0 0 0 2px var(--color-secondary-default)',
      none: 'none',
    },

    colors: {
      transparent: 'transparent',
      black: '#000',
      white: '#fff',
      body: 'var(--color-body)',
      font: {
        primary: 'var(--color-font-primary)',
        secondary: 'var(--color-font-secondary)',
        tertiary: 'var(--color-font-tertiary)',
        'inverse-primary': 'var(--color-font-inverse-primary)',
        'inverse-secondary': 'var(--color-font-inverse-secondary)',
        'inverse-tertiary': 'var(--color-font-inverse-tertiary)',
      },
      primary: {
        lighter: 'var(--color-primary-lighter)',
        light: 'var(--color-primary-light)',
        default: 'var(--color-primary-default)',
        dark: 'var(--color-primary-dark)',
        darker: 'var(--color-primary-darker)',
      },
      secondary: {
        lighter: 'var(--color-secondary-lighter)',
        light: 'var(--color-secondary-light)',
        default: 'var(--color-secondary-default)',
        dark: 'var(--color-secondary-dark)',
        darker: 'var(--color-secondary-darker)',
      },
    },
  },
}
