<template>
  <div v-if="loading" class="flex items-center justify-center p-4">
    <SvgLoading class="text-primary-dark" />
  </div>

  <draggable
    v-else
    v-model="todos"
    tag="ul"
    group="todos"
    v-bind="dragOptions"
    class="list-group"
    @start="dragging = true"
    @end="dragging = false"
  >
    <transition-group type="transition" :name="!dragging ? 'flip-list' : null">
      <li
        v-for="todo of todos"
        :key="todo.id"
        class="flex mt-1 rounded shadow bg-secondary-lighter"
        :class="{ done: !todo.open }"
      >
        <nuxt-link
          :to="`/todo/${todo.id}`"
          class="flex items-center justify-between w-full h-8 py-5 pl-3 pr-1 cursor-move text-font-primary hover:text-primary-darker"
        >
          <span>{{ todo.title }}</span>
          <SvgEdit class="flex-grow-0 w-6 cursor-pointer fill-current" />
        </nuxt-link>
      </li>
    </transition-group>

    <template v-slot:footer>
      <div class="p-3 mt-1 rounded bg-secondary-light">
        <EditableLabel @confirmed="addTodo(...arguments)">
          <span v-if="todos.length">+ Adicionar outra tarefa</span>
          <span v-else>+ Adicionar uma tarefa</span>
        </EditableLabel>
      </div>
    </template>
  </draggable>
</template>

<script>
import draggable from 'vuedraggable'
import SvgEdit from '~/assets/img/edit.svg?inline'
import SvgLoading from '~/assets/img/loading.svg?inline'

export default {
  name: 'TodoList',
  components: {
    draggable,
    SvgEdit,
    SvgLoading,
  },
  props: {
    frameId: {
      type: String,
      default: null,
    },
  },
  data: () => ({
    loading: true,
    dragging: false,
    dragOptions: {
      animation: 200,
      ghostClass: 'ghost',
    },
  }),
  computed: {
    todos: {
      get() {
        const dateParse = this.$options.filters.dateParse

        const frames = this.$store.state.frames
        const frameIndex = frames.findIndex((f) => f.id === this.frameId)
        const todos = frames[frameIndex].todos || []

        return todos
          .slice()
          .sort(
            (a, b) =>
              a.order - b.order ||
              dateParse(a.created_at, 'YYYY-MM-DD HH:mm:ss') -
                dateParse(b.created_at, 'YYYY-MM-DD HH:mm:ss')
          )
      },

      async set(value) {
        if (!value) return

        this.$root.$loading.start()
        const changed = await JSON.parse(JSON.stringify(value))
        const updatable = []

        let i = 1
        for (const todo of changed) {
          const original = {
            frame_id: todo.frame_id,
            order: todo.order,
          }

          const order = i++

          if (original.frame_id !== this.frameId || original.order !== order) {
            const payload = {
              frameId: original.frame_id,
              todo: {
                id: todo.id,
                frame_id: this.frameId,
                title: todo.title,
                open: todo.open,
                order,
              },
            }

            this.$store.commit('updateTodo', payload)
            updatable.push(payload)
          }
        }

        for (const payload of updatable) {
          await this.$store.dispatch('updateTodo', payload)
        }

        this.$root.$loading.finish()
      },
    },
  },
  mounted() {
    this.loading = false
  },
  methods: {
    async addTodo(title) {
      this.loading = true
      this.$root.$loading.start()

      let i = 1
      for (const todo of this.todos) {
        if (todo.order <= i) {
          i++
        }
      }

      await this.$store.dispatch('addTodo', {
        title,
        frame_id: this.frameId,
        open: true,
        order: i,
      })

      this.$root.$loading.finish()
      this.loading = false
    },
  },
}
</script>

<style scoped>
.done span {
  @apply line-through;
  @apply text-font-tertiary;
}

.ghost {
  @apply opacity-50;
  @apply bg-primary;
}
</style>
