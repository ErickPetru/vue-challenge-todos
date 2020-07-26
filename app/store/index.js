export const state = () => ({
  frames: [],
})

export const mutations = {
  nuxtServerInit(state, frames) {
    state.frames = frames
  },

  addFrame(state, frame) {
    state.frames.push(frame)
  },

  updateFrame(state, frame) {
    const index = state.frames.findIndex((f) => f.id === frame.id)
    state.frames[index].title = frame.title
    state.frames[index].order = frame.order
  },

  removeFrame(state, id) {
    const index = state.frames.findIndex((f) => f.id === id)
    state.frames.splice(index, 1)
  },

  addTodo(state, todo) {
    const frameIndex = state.frames.findIndex((f) => f.id === todo.frame_id)
    state.frames[frameIndex].todos.push(todo)
  },

  updateTodo(state, { frameId, todo }) {
    const frameIndex = state.frames.findIndex((f) => f.id === frameId)
    const todoIndex = state.frames[frameIndex].todos.findIndex(
      (t) => t.id === todo.id
    )
    state.frames[frameIndex].todos[todoIndex].title = todo.title
    state.frames[frameIndex].todos[todoIndex].description = todo.description
    state.frames[frameIndex].todos[todoIndex].open = todo.open
    state.frames[frameIndex].todos[todoIndex].order = todo.order

    if (frameId !== todo.frame_id) {
      const newFrameIndex = state.frames.findIndex(
        (f) => f.id === todo.frame_id
      )
      state.frames[newFrameIndex].todos.push(todo)
      state.frames[frameIndex].todos.splice(todoIndex, 1)
    }
  },

  removeTodo(state, todo) {
    const frameIndex = state.frames.findIndex((f) => f.id === todo.frame_id)
    const todoIndex = state.frames[frameIndex].todos.findIndex(
      (t) => t.id === todo.id
    )
    state.frames[frameIndex].todos.splice(todoIndex, 1)
  },
}

export const actions = {
  async nuxtServerInit({ commit }) {
    const { data } = await this.$http.$get('frames')
    await commit('nuxtServerInit', data)
  },

  async addFrame({ commit }, frame) {
    const { data } = await this.$http.$post('frame', frame)
    await commit('addFrame', data)
  },

  async updateFrame({ commit }, frame) {
    const { data } = await this.$http.$put('frame', frame)
    await commit('updateFrame', data)
  },

  async removeFrame({ commit }, id) {
    await this.$http.$delete(`frame/${id}`)
    await commit('removeFrame', id)
  },

  async addTodo({ commit }, todo) {
    const { data } = await this.$http.$post('todo', todo)
    await commit('addTodo', data)
  },

  async updateTodo({ commit }, { frameId, todo }) {
    const { data } = await this.$http.$put('todo', todo)
    await commit('updateTodo', { frameId, todo: data })
  },

  async removeTodo({ commit }, todo) {
    await this.$http.$delete(`todo/${todo.id}`)
    await commit('removeTodo', todo)
  },
}
