export const state = () => ({
  frames: [],
})

export const mutations = {
  nuxtServerInit(state, frames) {
    state.frames = frames
  },

  addFrame(state, frame) {
    if (!frame.todos) {
      frame.todos = []
    }
    state.frames.push(frame)
  },

  updateFrame(state, frame) {
    const index = state.frames.findIndex((f) => f.id === frame.id)

    if (frame.title !== undefined) {
      state.frames[index].title = frame.title
    }

    if (frame.order !== undefined) {
      state.frames[index].order = frame.order
    }
  },

  removeFrame(state, frame) {
    const index = state.frames.findIndex((f) => f.id === frame.id)
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

    if (todo.frame_id !== undefined) {
      state.frames[frameIndex].todos[todoIndex].frame_id = todo.frame_id
    }

    if (todo.title !== undefined) {
      state.frames[frameIndex].todos[todoIndex].title = todo.title
    }

    if (todo.description !== undefined) {
      state.frames[frameIndex].todos[todoIndex].description = todo.description
    }

    if (todo.open !== undefined) {
      state.frames[frameIndex].todos[todoIndex].open = todo.open
    }

    if (todo.order !== undefined) {
      state.frames[frameIndex].todos[todoIndex].order = todo.order
    }

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
    return data
  },

  async updateFrame({ commit }, frame) {
    const { data } = await this.$http.$put('frame', frame)
    await commit('updateFrame', data)
    return data
  },

  async removeFrame({ commit, dispatch, state }, frame) {
    await this.$http.$delete(`frame/${frame.id}`)

    const nextSiblings = state.frames.filter((f) => f.order > frame.order)

    for (const sibling of nextSiblings) {
      await dispatch('updateFrame', {
        id: sibling.id,
        title: sibling.title,
        order: sibling.order - 1,
      })
    }

    await commit('removeFrame', frame)
  },

  async addTodo({ commit }, todo) {
    const { data } = await this.$http.$post('todo', todo)
    await commit('addTodo', data)
    return data
  },

  async updateTodo({ commit }, { frameId, todo }) {
    const { data } = await this.$http.$put('todo', todo)
    await commit('updateTodo', { frameId, todo: data })
    return data
  },

  async removeTodo({ commit, dispatch, state }, todo) {
    await this.$http.$delete(`todo/${todo.id}`)

    const frameIndex = state.frames.findIndex((f) => f.id === todo.frame_id)
    const nextSiblings = state.frames[frameIndex].todos.filter(
      (t) => t.order > todo.order
    )

    for (const sibling of nextSiblings) {
      await dispatch('updateTodo', {
        frameId: todo.frame_id,
        todo: {
          id: sibling.id,
          order: sibling.order - 1,
        },
      })
    }

    await commit('removeTodo', todo)
  },
}
