<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
    <section
      v-for="frame of frames"
      :key="frame.id"
      class="px-4 py-3 rounded shadow bg-secondary"
    >
      <header class="flex">
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

      <TodoList :todos="frame.todos" />
    </section>

    <div>
      <div class="px-4 py-3 rounded shadow bg-secondary-lighter">
        <EditableLabel @confirmed="createFrame(...arguments)">
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
    frames: [
      {
        title: 'My First Frame',
        order: 0,
        todos: [
          {
            title: 'My First Todo',
            description: 'Todo',
            frame_id: '5eea1b18a8629bc62a6cb381',
            created_at: '2020-06-17 10:49:41.052000',
            open: true,
            order: 0,
            id: '5eea1f75af98bcb0e2762605',
          },
        ],
        id: '5eea1b18a8629bc62a6cb381',
      },
    ],
  }),
  methods: {
    updateFrameTitle(id, title) {
      const index = this.frames.findIndex((f) => f.id === id)
      this.frames[index].title = title
    },

    createFrame(title) {
      const frame = {
        id: (+Date.now()).toString(),
        title,
        order: this.frames.length,
        todos: [],
      }

      this.frames.push(frame)
    },

    removeFrame(id) {
      if (
        confirm(
          'Deseja excluir permanentemente este quadro e todas as suas tarefas?'
        )
      ) {
        const index = this.frames.findIndex((f) => f.id === id)
        this.frames.splice(index, 1)
      }
    },
  },
}
</script>
