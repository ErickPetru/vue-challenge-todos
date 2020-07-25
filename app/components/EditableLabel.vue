<template>
  <div class="flex items-center flex-grow w-full">
    <input
      v-if="editing"
      ref="titleInput"
      v-model="internalValue"
      v-click-outside="cancelEditing"
      class="h-8"
      @keyup.esc="cancelEditing"
      @keypress.enter="editing = false"
      @blur="finishEditing"
    />

    <a
      v-else
      :href="value ? '#editar' : '#adicionar'"
      class="flex items-center w-full h-8 text-font-primary hover:text-primary-darker"
      @click.stop.prevent="startEditing"
      @focus="startEditing"
    >
      <span v-if="value">{{ value }}</span>
      <slot v-else />
    </a>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside'

export default {
  name: 'FrameListItem',
  directives: {
    ClickOutside,
  },
  props: {
    value: {
      type: String,
      default: null,
    },
  },
  data: () => ({
    editing: false,
    internalValue: '',
  }),
  mounted() {
    this.internalValue = this.value
  },
  methods: {
    startEditing() {
      this.editing = true
      this.$emit('started')

      this.$nextTick(() => {
        this.$refs.titleInput.focus()
        this.$refs.titleInput.select()
      })
    },

    cancelEditing() {
      this.editing = false
      this.internalValue = this.value
    },

    finishEditing() {
      this.editing = false

      if (this.internalValue === this.value) {
        this.$emit('canceled')
      } else {
        this.$emit('confirmed', this.internalValue)
      }
    },
  },
}
</script>

<style scoped>
input:not([type]),
input[type='text'] {
  @apply outline-none;
  @apply py-1;
  @apply px-2;
  @apply w-full;
  @apply border-primary-darker;
  @apply border;
  @apply bg-font-inverse-secondary;
}
</style>
