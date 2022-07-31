export const actions = {

  setTodos(state,action) {
    return state = action.payload;
  },

  addTodo(state,action) {
    state.push(action.payload);
    return state;
  },

  editTodo(state,action) {
    const index = state.findIndex(item => item.id === action.payload.id);
    state[index] = {
      id: action.payload.id,
      title: action.payload.title,
      description: action.payload.description,
      color: action.payload.color
    }
    return state;
  },

  deleteTodo(state,action) {
    return state = state.filter(({id}) => {
      return id !== action.payload;
    })
  },

  deleteAllTodos(state,action) {
    return state = [];
  }
}

export const actionTypes = {
  SET_TODOS: 'todos/setTodos',
  ADD_TODO: 'todos/addTodo',
  EDIT_TODO: 'todos/editTodo',
  DELETE_TODO: 'todos/deleteTodo',
  DELETE_ALL_TODO: 'todos/deleteAllTodos',
}
