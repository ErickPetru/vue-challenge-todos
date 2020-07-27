<template>
  <div class="pt-10 pb-12">
    <draggable
      v-model="frames"
      tag="div"
      group="frames"
      v-bind="dragOptions"
      class="flex gap-3 list-group"
      @start="dragging = true"
      @end="dragging = false"
    >
      <transition-group
        type="transition"
        :name="!dragging ? 'flip-list' : null"
        class="flex gap-3"
      >
        <section
          v-for="frame of frames"
          :key="frame.id"
          :class="loading ? 'cursor-not-allowed' : 'cursor-move'"
        >
          <div class="px-4 py-3 rounded shadow-md bg-secondary list-group-item">
            <header class="flex mb-2">
              <EditableLabel
                :value="frame.title"
                :disabled="loading"
                @confirmed="updateFrameTitle(frame.id, ...arguments)"
              />

              <a
                href="#excluir"
                class="flex flex-grow-0 ml-2 text-font-primary hover:text-primary-darker focus:text-primary-darker"
                :disabled="loading"
                @click.prevent="removeFrame(frame)"
              >
                <SvgDelete class="w-6 fill-current" />
              </a>
            </header>

            <TodoList :disabled="loading" :frame-id="frame.id" />
          </div>
        </section>
      </transition-group>

      <template v-slot:footer>
        <div>
          <div
            class="w-64 whitespace-no-wrap rounded shadow bg-secondary-lighter"
            :class="loading ? 'cursor-not-allowed' : 'cursor-pointer'"
          >
            <EditableLabel
              :disabled="loading"
              @confirmed="addFrame(...arguments)"
            >
              <span v-if="frames.length">+ Adicionar outro quadro</span>
              <span v-else>+ Adicionar o primeiro quadro</span>
            </EditableLabel>
          </div>
        </div>
      </template>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import SvgDelete from '~/assets/img/delete.svg?inline'

export default {
  name: 'FrameList',
  components: {
    draggable,
    SvgDelete,
  },
  data: () => ({
    loading: true,
    dragging: false,
  }),
  computed: {
    dragOptions() {
      return { disabled: this.loading }
    },

    frames: {
      get() {
        const dateParse = this.$options.filters.dateParse
        const frames = this.$store.state.frames

        if (!frames || !frames.length) return []

        return frames
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
        for (const frame of changed) {
          const order = i++

          if (frame.order !== order) {
            const payload = {
              id: frame.id,
              title: frame.title,
              order,
            }

            this.$store.commit('updateFrame', payload)
            updatable.push(payload)
          }
        }

        for (const payload of updatable) {
          await this.$store.dispatch('updateFrame', payload)
        }

        this.$root.$loading.finish()
      },
    },
  },
  mounted() {
    this.loading = false
  },
  methods: {
    async addFrame(title) {
      this.loading = true
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
      this.loading = false
    },

    async updateFrameTitle(id, title) {
      this.loading = true
      this.$root.$loading.start()
      const index = this.frames.findIndex((f) => f.id === id)
      const payload = { id, title, order: this.frames[index].order }
      await this.$store.dispatch('updateFrame', payload)
      this.$root.$loading.finish()
      this.loading = false
    },

    async removeFrame(frame) {
      this.loading = true
      this.$root.$loading.start()
      await this.$store.dispatch('removeFrame', frame)
      this.$root.$loading.finish()
      this.loading = false
    },
  },
}
</script>
