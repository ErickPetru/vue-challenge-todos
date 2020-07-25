export default {
  mode: 'universal',
  target: 'server',
  head: {
    titleTemplate: (title) => (title ? `${title} - To-Do List` : 'To-Do List'),
    description: 'Exemplo de lista de tarefas baseada em quadros',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'apple-mobile-web-app-title', content: 'To-Do List' },
      { name: 'application-name', content: 'To-Do List' },
      { name: 'msapplication-TileColor', content: '#54c147' },
      { name: 'theme-color', content: '#46ffb3' },
    ],
    link: [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      { rel: 'manifest', href: '/site.webmanifest' },
      {
        rel: 'mask-icon',
        href: '/safari-pinned-tab.svg',
        color: '#54c147',
      },
    ],
  },
  components: true,
  loading: { color: '#54c147' },
  router: {
    linkExactActiveClass: 'link-exact-active',
    linkActiveClass: 'link-active',
  },
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',

    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',

    // Doc: https://github.com/Developmint/nuxt-webfontloader
    'nuxt-webfontloader',
  ],
  modules: [
    // Doc: https://http.nuxtjs.org/
    '@nuxt/http',

    // Doc: https://pwa.nuxtjs.org/
    '@nuxtjs/pwa',
  ],
  plugins: [],
  http: {
    baseURL: 'http://api.todo.ootz.com.br/',
    headers: {
      apikey:
        'E6D4794A8487E6C7013CF5865161814E72750294CC14F3F0ADE0FB2307297027',
    },
  },
  pwa: {
    meta: {
      lang: 'pt-BR',
      display: 'standalone',
      author: 'Erick Eduardo Petrucelli <erickpetru@gmail.com>',
      name: 'To-Do List',
      description: 'Exemplo de lista de tarefas baseada em quadros',
    },
    icon: false,
    manifest: false,
  },
  webfontloader: {
    custom: {
      families: ['Roboto:n4,n7'],
      urls: [
        'https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap',
      ],
    },
  },
  tailwindcss: {
    configPath: './tailwind.config.cjs',
    cssPath: './assets/css/tailwind.css',
    exposeConfig: false,
  },
  build: {
    parallel: process.env.NODE_ENV === 'development',
  },
}
