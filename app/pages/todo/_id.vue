<template>
  <div
    class="fixed top-0 left-0 flex items-center justify-center w-full h-full modal"
  >
    <div
      class="absolute w-full h-full bg-black opacity-75 modal-overlay"
      @click="close"
    />

    <div
      class="z-50 w-11/12 mx-auto overflow-y-auto rounded shadow-xl bg-body modal-container md:max-w-md"
    >
      <nuxt-link
        to="/"
        class="absolute top-0 right-0 z-50 flex flex-col items-center p-1 mt-3 mr-3 text-sm text-font-secondary modal-close hover:text-primary-lighter focus:text-primary-lighter"
      >
        <SvgClose class="fill-current" />
        <span class="text-sm">(Esc)</span>
      </nuxt-link>

      <div class="p-6 text-left modal-content">
        <div
          v-if="$fetchState.pending || loading"
          class="flex items-center justify-center p-4"
        >
          <SvgLoading class="text-primary-dark" />
        </div>

        <div v-else-if="todo && !$fetchState.error">
          <div class="flex items-start justify-between pb-3">
            <div class="w-full my-2 mr-2 text-2xl font-bold">
              <EditableLabel
                :value="todo.title"
                @keydown.enter="console.log('enter')"
                @confirmed="updateTodoTitle"
              />
            </div>
            <nuxt-link
              to="/"
              class="z-50 flex-grow-0 my-2 cursor-pointer text-font-primary modal-close"
            >
              <SvgClose class="fill-current" />
            </nuxt-link>
          </div>

          <p
            v-if="todo.created_at"
            class="flex my-2 text-sm text-font-secondary"
          >
            <SvgClock class="flex-grow-0 w-4 fill-current" />
            <span>{{
              todo.created_at
                | dateParse('YYYY-MM-DD HH:mm:ss')
                | dateFormat('DD MMMM, YYYY')
            }}</span>
          </p>

          <div class="mt-1">
            <textarea
              v-model="todo.description"
              placeholder="Adicione uma descrição mais detalhada..."
              @keydown.enter="updated = true"
              @change="updated = true"
            />
          </div>

          <div class="mt-1">
            <label class="inline-flex items-center h-full cursor-pointer">
              <input
                v-model="done"
                type="checkbox"
                class="w-5 h-5 bg-font-inverse-secondary text-primary-darker form-checkbox"
              /><span
                class="ml-2 transition duration-300 ease-in-out text-font-primary"
                >Marcar tarefa como <b>concluída</b></span
              >
            </label>
          </div>

          <div class="flex justify-end gap-2 pt-6">
            <button class="primary" @click="updateTodo">
              <SvgSave class="fill-current" />
              <span>Salvar</span>
            </button>

            <button @click="removeTodo">
              <SvgDelete class="fill-current" />
              <span>Excluir</span>
            </button>

            <button @click="close">
              <SvgClose class="fill-current" />
              <span>Cancelar</span>
            </button>
          </div>
        </div>

        <div v-else>
          <div class="flex items-start justify-between pb-3">
            <p class="w-full my-2 mr-2 text-2xl font-bold">
              Tarefa não localizada!
            </p>
            <nuxt-link
              to="/"
              class="z-50 flex-grow-0 my-2 cursor-pointer text-font-primary modal-close"
            >
              <SvgClose class="fill-current" />
            </nuxt-link>
          </div>

          <p>
            Não foi possível localizar a tarefa desejada. Confira o endereço
            utilizado ou retorne à
            <nuxt-link to="/">
              tela principal
            </nuxt-link>
            para criar uma nova tarefa ou selecionar outra tarefa existente.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SvgClock from '~/assets/img/clock.svg?inline'
import SvgClose from '~/assets/img/close.svg?inline'
import SvgDelete from '~/assets/img/delete.svg?inline'
import SvgLoading from '~/assets/img/loading.svg?inline'
import SvgSave from '~/assets/img/save.svg?inline'

export default {
  name: 'TodoItem',
  components: {
    SvgClock,
    SvgClose,
    SvgDelete,
    SvgLoading,
    SvgSave,
  },
  async fetch() {
    const result = await this.$http.$get(`todo/${this.$route.params.id}`)
    if (result.data) {
      this.todo = result.data
    }
  },
  data: () => ({
    todo: null,
    updated: false,
    loading: false,
  }),
  computed: {
    done: {
      get() {
        return this.todo ? !this.todo.open : false
      },

      set(value) {
        this.todo.open = !value
        this.updated = true
      },
    },
  },
  mounted() {
    if (document) {
      document.addEventListener('keydown', this.keyHandler)
    }
  },
  destroyed() {
    if (document) {
      document.removeEventListener('keydown', this.keyHandler)
    }
  },
  methods: {
    keyHandler(event) {
      if (event.keyCode === 13 && !event.shiftKey) {
        event.preventDefault()
        event.stopPropagation()
        this.updateTodo()
      } else if (event.keyCode === 27) {
        this.close()
      }
    },

    close() {
      this.$router.push('/')
    },

    updateTodoTitle(title) {
      this.todo.title = title
      this.updated = true
    },

    async updateTodo() {
      if (this.updated) {
        this.updated = false

        this.loading = true
        this.$root.$loading.start()
        const payload = {
          frameId: this.todo.frame_id,
          todo: {
            id: this.todo.id,
            frame_id: this.todo.frame_id,
            created_at: this.todo.created_at,
            title: this.todo.title,
            open: this.todo.open,
            order: this.todo.order,
          },
        }

        if (this.todo.description) {
          payload.todo.description = this.todo.description
        }

        await this.$store.dispatch('updateTodo', payload)
        this.$root.$loading.finish()
      }

      this.close()
    },

    async removeTodo() {
      this.loading = true
      this.$root.$loading.start()
      await this.$store.dispatch('removeTodo', this.todo)
      this.$root.$loading.finish()
      this.close()
    },
  },
}
</script>
