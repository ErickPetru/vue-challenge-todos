<template>
  <div
    id="app"
    class="flex flex-col justify-between antialiased font-base bg-body text-font-primary"
    :class="theme"
  >
    <Header />

    <div class="flex flex-col justify-center flex-grow">
      <Nuxt />
    </div>

    <Footer @theme-changed="themeChanged" />
  </div>
</template>

<script>
export default {
  name: 'LayoutDefault',
  data: () => ({
    theme: '',
  }),
  methods: {
    themeChanged(name = '') {
      this.theme = name ? `theme-${name}` : ''
    },
  },
}
</script>
