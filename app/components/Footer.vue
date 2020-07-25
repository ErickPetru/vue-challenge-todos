<template>
  <footer class="flex-grow-0 mt-16 text-font-primary bg-primary">
    <div class="bg-primary-dark text-center">
      <p class="my-0 py-6 container font-light">
        Alterar tema:
        <a
          :href="!theme ? null : '#padrao'"
          :class="{ active: !theme }"
          @click.prevent="changeTheme()"
          >Padrão</a
        >
        <a
          :href="theme === 'dark' ? null : '#escuro'"
          :class="{ active: theme === 'dark' }"
          @click.prevent="changeTheme('dark')"
          >Escuro</a
        >
        <a
          :href="theme === 'grayscale' ? null : '#cinza'"
          :class="{ active: theme === 'grayscale' }"
          @click.prevent="changeTheme('grayscale')"
          >Cinza</a
        >
      </p>
    </div>

    <div
      class="container my-8 text-center text-sm text-font-secondary font-light"
    >
      <p>
        © 2020 <strong class="font-normal">Erick Eduardo Petrucelli</strong>
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data: () => ({
    theme: '',
  }),
  mounted() {
    if (localStorage && localStorage.getItem('theme')) {
      const name = localStorage.getItem('theme')
      this.theme = name
      this.$emit('theme-changed', name)
    }
  },
  methods: {
    changeTheme(name = '') {
      if (localStorage) {
        if (name) {
          localStorage.setItem('theme', name)
        } else {
          localStorage.removeItem('theme')
        }
      }

      this.theme = name
      this.$emit('theme-changed', name)
    },
  },
}
</script>

<style scoped>
a {
  @apply text-font-primary;
  @apply font-bold;
  @apply p-1;
  @apply mx-1;
}

a.active,
a:hover,
a:focus {
  @apply text-primary-light;
}
</style>
