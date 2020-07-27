<template>
  <div class="flex items-center flex-grow w-full">
    <input
      v-if="editing"
      ref="titleInput"
      v-model="internalValue"
      v-click-outside="cancelEditing"
      class="h-8 mx-2 my-2"
      :disabled="disabled"
      @keyup.esc="cancelEditing"
      @keydown.enter="enterPressed"
      @blur="finishEditing"
    />

    <a
      v-else
      :href="value ? '#editar' : '#adicionar'"
      class="flex items-center w-full px-4 py-3 text-font-primary hover:text-primary-darker"
      :disabled="disabled"
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

    disabled: {
      type: Boolean,
      default: false,
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

      if (this.internalValue === this.value || !this.internalValue) {
        this.$emit('canceled')
      } else {
        this.$emit('confirmed', this.internalValue)
        this.internalValue = ''
      }
    },

    enterPressed() {
      this.editing = false
      this.$emit('keydown.enter')
    },
  },
}
</script>
