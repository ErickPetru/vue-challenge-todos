<template>
  <nuxt-link to="/" class="inline-flex items-center p-1 m-auto">
    <SvgLogo :alt="title" class="w-12 h-12" />
    <h1 class="ml-3 text-3xl text-bold">{{ title }}</h1>
  </nuxt-link>
</template>

<script>
import SvgLogo from '~/assets/img/logo.svg?inline'

export default {
  name: 'Logo',
  components: { SvgLogo },
  props: {
    title: {
      type: String,
      default: 'To-Do List',
    },
  },
}
</script>
