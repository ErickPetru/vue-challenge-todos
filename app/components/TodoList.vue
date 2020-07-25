<template>
  <div v-if="todos && todos.length" class="mt-2">
    <div
      v-for="task of todos"
      :key="task.id"
      class="px-3 py-4 rounded shadow bg-secondary-lighter"
    >
      {{ task.title }}
    </div>

    <div class="mt-2">
      <div class="p-3 rounded shadow bg-secondary-light">
        <EditableLabel @confirmed="createTodo(...arguments)">
          <span v-if="todos.length">+ Adicionar outra tarefa</span>
          <span v-else>+ Adicionar uma tarefa</span>
        </EditableLabel>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoList',
  props: {
    todos: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    createTodo(title) {
      this.$emit('created', title)
    },
  },
}
</script>
