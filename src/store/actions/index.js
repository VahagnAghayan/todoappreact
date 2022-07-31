export const actions = {

  setTodos(state,action) {
    return state = action.payload;
  },

  addTodo(state,action) {
    state.push(action.payload);
    return state;
  },

  editTodo(state,action) {
    return state.map((item) => {
      if(item.id === action.payload.id) {
        return {
          id: action.payload.id,
          title: action.payload.title,
          description: action.payload.description,
          color: action.payload.color
        }
      } else {
        return item;
      }
    })
  },

  deleteTodo(state,action) {
    return state = state.filter(({id}) => {
      return id !== action.payload;
    })
  },
}
