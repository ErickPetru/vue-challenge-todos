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
            @click.prevent="removeFrame(frame)"
          >
            <SvgDelete class="w-6 fill-current" />
          </a>
        </header>

        <TodoList :frame-id="frame.id" />
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
    async addFrame(title) {
      this.$root.$loading.start()

      let i = 1
      for (const frame of this.frames) {
        if (frame.order <= i) {
          i++
        }
      }

      await this.$store.dispatch('addFrame', {
        title,
        order: i,
      })

      this.$root.$loading.finish()
    },

    async updateFrameTitle(id, title) {
      this.$root.$loading.start()
      const index = this.frames.findIndex((f) => f.id === id)
      const payload = { id, title, order: this.frames[index].order }
      await this.$store.dispatch('updateFrame', payload)
      this.$root.$loading.finish()
    },

    async removeFrame(frame) {
      if (
        confirm(
          'Deseja excluir permanentemente este quadro e todas as suas tarefas?'
        )
      ) {
        this.$root.$loading.start()
        await this.$store.dispatch('removeFrame', frame)
        this.$root.$loading.finish()
      }
    },
  },
}
</script>
