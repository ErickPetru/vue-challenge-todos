<template>
  <nuxt-link to="/" class="block p-1 outline-none focus:shadow-outline">
    <img src="~/assets/img/logo.svg" :alt="alt" class="block m-auto" />
  </nuxt-link>
</template>

<script>
export default {
  name: 'Logo',
  props: {
    alt: {
      type: String,
      default: 'Hello World!',
    },
  },
}
</script>
