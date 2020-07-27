<template>
  <div
    id="app"
    class="flex flex-col justify-between antialiased font-base bg-body text-font-primary"
    :class="theme"
  >
    <Header
      class="duration-150 ease-in-out transition-filter"
      :class="{ blur: !isHome }"
    />

    <div
      class="z-10 flex flex-col justify-start flex-grow overflow-x-auto duration-150 ease-in-out transition-filter"
      :class="{ blur: !isHome }"
    >
      <div class="px-6 mx-auto">
        <FrameList />
      </div>
    </div>

    <Nuxt class="z-20" />

    <Footer
      class="duration-150 ease-in-out transition-filter"
      :class="{ blur: !isHome }"
      @theme-changed="themeChanged"
    />
  </div>
</template>

<script>
export default {
  name: 'LayoutDefault',
  data: () => ({
    theme: '',
  }),
  computed: {
    isHome() {
      return !this.$route.params || !Object.keys(this.$route.params).length
    },
  },
  methods: {
    themeChanged(name = '') {
      this.theme = name ? `theme-${name}` : ''
    },
  },
}
</script>
