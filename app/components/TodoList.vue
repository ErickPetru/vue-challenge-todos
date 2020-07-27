<template>
  <div v-if="loading" class="flex items-center justify-center p-4">
    <SvgLoading class="text-secondary-dark" />
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
          :disabled="loading || disabled"
          class="flex items-center justify-between w-full h-8 py-5 pl-3 pr-1 cursor-move text-font-primary hover:text-primary-darker"
        >
          <span>{{ todo.title }}</span>
          <SvgEdit class="flex-grow-0 w-6 cursor-pointer fill-current" />
        </nuxt-link>
      </li>
    </transition-group>

    <template v-slot:footer>
      <div class="mt-1 whitespace-no-wrap rounded bg-secondary-light">
        <EditableLabel
          :disabled="loading || disabled"
          @confirmed="addTodo(...arguments)"
        >
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

    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    loading: true,
    dragging: false,
  }),
  computed: {
    dragOptions() {
      return { disabled: this.loading || this.disabled, ghostClass: 'ghost' }
    },

    todos: {
      get() {
        const dateParse = this.$options.filters.dateParse

        const frames = this.$store.state.frames
        const frameIndex = frames.findIndex((f) => f.id === this.frameId)
        const frame = frames[frameIndex]

        if (!frame || !frame.todos || !frame.todos.length) return []
        const todos = JSON.parse(JSON.stringify(frame.todos))

        return todos.sort(
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
                created_at: todo.created_at,
                title: todo.title,
                open: todo.open,
                order,
              },
            }

            if (todo.description) {
              payload.todo.description = todo.description
            }

            this.$store.commit('updateTodo', payload)
            updatable.push(payload)
          }
        }

        for (const payload of updatable) {
          payload.mustCommit = false
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

.list-group .ghost {
  @apply opacity-50;
  @apply bg-primary;
}
</style>
