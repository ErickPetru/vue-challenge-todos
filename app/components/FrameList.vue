<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
    <section v-for="frame of frames" :key="frame.id">
      <div class="px-4 py-3 rounded shadow-md bg-secondary">
        <header class="flex mb-2">
          <EditableLabel
            :value="frame.title"
            @confirmed="updateFrameTitle(frame.id, ...arguments)"
          />

          <a
            href="#excluir"
            class="flex flex-grow-0 ml-2 text-font-primary hover:text-primary-darker focus:text-primary-darker"
            @click.prevent="removeFrame(frame.id)"
          >
            <SvgDelete class="w-6 fill-current" />
          </a>
        </header>

        <TodoList :frame-id="frame.id" :todos="frame.todos" />
      </div>
    </section>

    <div>
      <div class="px-4 py-3 rounded shadow bg-secondary-lighter">
        <EditableLabel @confirmed="addFrame(...arguments)">
          <span v-if="frames.length">+ Adicionar outro quadro</span>
          <span v-else>+ Adicionar um quadro</span>
        </EditableLabel>
      </div>
    </div>
  </div>
</template>

<script>
import SvgDelete from '~/assets/img/delete.svg?inline'

export default {
  name: 'FrameList',
  components: {
    SvgDelete,
  },
  data: () => ({
    editing: false,
  }),
  computed: {
    frames() {
      return this.$store.state.frames.slice().sort((a, b) => a.order - b.order)
    },
  },
  methods: {
    addFrame(title) {
      const payload = { title, order: this.frames.length + 1 }
      this.$store.dispatch('addFrame', payload)
    },

    updateFrameTitle(id, title) {
      const index = this.frames.findIndex((f) => f.id === id)
      const payload = { id, title, order: this.frames[index].order }
      this.$store.dispatch('updateFrame', payload)
    },

    removeFrame(id) {
      if (
        confirm(
          'Deseja excluir permanentemente este quadro e todas as suas tarefas?'
        )
      ) {
        this.$store.dispatch('removeFrame', id)
      }
    },
  },
}
</script>
