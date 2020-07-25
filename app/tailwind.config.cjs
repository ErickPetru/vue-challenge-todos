// Doc: https://tailwindcss.com/docs/configuration
module.exports = {
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
      outline: '0 0 0 2px var(--color-secondary-default)',
      none: 'none',
    },

    colors: {
      body: 'var(--color-body)',
      font: {
        primary: 'var(--color-font-primary)',
        secondary: 'var(--color-font-secondary)',
        'inverse-primary': 'var(--color-font-inverse-primary)',
        'inverse-secondary': 'var(--color-font-inverse-secondary)',
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
