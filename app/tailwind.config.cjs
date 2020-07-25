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
  },
}
