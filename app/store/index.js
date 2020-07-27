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
    const oldFrame = state.frames[index]
    if (!oldFrame) return

    if (frame.title !== undefined) {
      oldFrame.title = frame.title
    }

    if (frame.order !== undefined) {
      oldFrame.order = frame.order
    }

    if (frame.todos !== undefined) {
      oldFrame.todos = frame.todos
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
    const frame = state.frames[frameIndex]
    if (!frame) return

    const todoIndex = frame.todos.findIndex((t) => t.id === todo.id)
    const oldTodo = frame.todos[todoIndex]
    if (!oldTodo) return

    if (todo.frame_id !== undefined) {
      oldTodo.frame_id = todo.frame_id
    }

    if (todo.title !== undefined) {
      oldTodo.title = todo.title
    }

    if (todo.description !== undefined) {
      oldTodo.description = todo.description
    }

    if (todo.open !== undefined) {
      oldTodo.open = todo.open
    }

    if (todo.order !== undefined) {
      oldTodo.order = todo.order
    }

    if (todo.created_at !== undefined) {
      oldTodo.created_at = todo.created_at
    }

    if (frameId !== todo.frame_id) {
      const newFrameIndex = state.frames.findIndex(
        (f) => f.id === todo.frame_id
      )
      const newFrame = state.frames[newFrameIndex]
      if (!newFrame) return

      newFrame.todos.push(todo)
      frame.todos.splice(todoIndex, 1)
    }
  },

  removeTodo(state, todo) {
    const frameIndex = state.frames.findIndex((f) => f.id === todo.frame_id)
    const frame = state.frames[frameIndex]
    if (!frame) return

    const todoIndex = frame.todos.findIndex((t) => t.id === todo.id)
    frame.todos.splice(todoIndex, 1)
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

  async updateFrame({ commit }, { mustCommit, frame }) {
    const { data } = await this.$http.$put('frame', {
      id: frame.id,
      title: frame.title,
      order: frame.order,
      todos: frame.todos,
    })

    if (mustCommit !== false) {
      await commit('updateFrame', data)
    }

    return data
  },

  async removeFrame({ commit, dispatch, state }, frame) {
    await this.$http.$delete(`frame/${frame.id}`)

    const nextSiblings = state.frames.filter((f) => f.order > frame.order)

    for (const sibling of nextSiblings) {
      await dispatch('updateFrame', {
        frame: {
          id: sibling.id,
          title: sibling.title,
          order: sibling.order - 1,
          todos: sibling.todos,
        },
      })
    }

    await commit('removeFrame', frame)
  },

  async addTodo({ commit }, todo) {
    const { data } = await this.$http.$post('todo', todo)
    await commit('addTodo', data)
    return data
  },

  async updateTodo({ commit }, { frameId, mustCommit, todo }) {
    const { data } = await this.$http.$put('todo', todo)

    if (mustCommit !== false) {
      await commit('updateTodo', { frameId, todo: data })
    }

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
          frame_id: todo.frame_id,
          id: sibling.id,
          title: sibling.title,
          description: sibling.description,
          open: sibling.open,
          created_at: sibling.created_at,
          order: sibling.order - 1,
        },
      })
    }

    await commit('removeTodo', todo)
  },
}
