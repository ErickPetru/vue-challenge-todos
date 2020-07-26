<template>
  <div>
    <div v-if="todos && todos.length">
      <div
        v-for="todo of todos"
        :key="todo.id"
        class="flex mt-1 rounded shadow bg-secondary-lighter"
        :class="{ done: !todo.open }"
      >
        <nuxt-link
          :to="`/todo/${todo.id}`"
          class="flex items-center justify-between w-full h-8 py-5 pl-3 pr-1 text-font-primary hover:text-primary-darker"
        >
          <span>{{ todo.title }}</span>
          <SvgEdit class="flex-grow-0 w-6 fill-current" />
        </nuxt-link>
      </div>
    </div>

    <div class="mt-1">
      <div class="p-3 rounded bg-secondary-light">
        <EditableLabel @confirmed="addTodo(...arguments)">
          <span v-if="todos.length">+ Adicionar outra tarefa</span>
          <span v-else>+ Adicionar uma tarefa</span>
        </EditableLabel>
      </div>
    </div>
  </div>
</template>

<script>
import SvgEdit from '~/assets/img/edit.svg?inline'

export default {
  name: 'TodoList',
  components: {
    SvgEdit,
  },
  props: {
    frameId: {
      type: String,
      default: null,
    },
    todos: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    orderedTodos() {
      return this.todos.slice().sort((a, b) => a.order - b.order)
    },
  },
  methods: {
    addTodo(title) {
      const payload = {
        title,
        frame_id: this.frameId,
        open: true,
        order: this.todos.length + 1,
      }
      this.$store.dispatch('addTodo', payload)
    },
  },
}
</script>

<style scoped>
.done span {
  @apply line-through;
  @apply text-font-tertiary;
}
</style>
