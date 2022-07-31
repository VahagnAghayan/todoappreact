import requestApi from "../../helpers/requestApi";

const asyncActionsMiddleware = store => next => action => {
  const { type, payload } = action;
  switch (type) {

    case 'todos/addTodo':
      requestApi.post(payload)
        .then(response => response.json())
        .then(data => {
          action.payload = data;
          return next(action);
        })
        .catch(err => console.error(err))
      break;

    case 'todos/editTodo':
      const { id, ...rest } = payload;
      requestApi.patch(id,rest)
        .then(response => {
          console.log(response);
          return next(action);
        })
        .catch(error => console.error(error))
      break;

    case 'todos/deleteTodo':
      requestApi.delete(payload)
        .then(response => {
          console.log(response);
          return next(action);
        })
        .catch(error => console.error(error))
      break;
      
    default:
      return next(action)
  }

}

export default asyncActionsMiddleware;
