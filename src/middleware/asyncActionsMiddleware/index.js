import requestApi from "../../helpers/requestApi";
import { actionTypes } from "../../store/actions";

const asyncActionsMiddleware = store => next => action => {
  const { type, payload } = action;
  const { ADD_TODO, EDIT_TODO, DELETE_TODO, DELETE_ALL_TODO } = actionTypes
  switch (type) {
    case ADD_TODO:
      requestApi.post(payload)
        .then(response => response.json())
        .then(data => {
          const newAction = data;
          return next(newAction);
        })
        .catch(err => console.error(err))
      break;

    case EDIT_TODO:
      const { id, ...rest } = payload;
      requestApi.patch(id,rest)
        .then(response => {
          console.log(response);
        })
        .catch(error => console.error(error))
      break;

    case DELETE_TODO:
      requestApi.delete(payload)
        .then(response => {
          console.log(response);
        })
        .catch(error => console.error(error))
      break;

    case DELETE_ALL_TODO:
      payload?.forEach((id) => {
        requestApi.delete(id)
        .then(response => {
          console.log(response);
        })
        .catch(error => console.error(error))
      })
      break;  

    default:
      return next(action)
  }
  return next(action)
}

export default asyncActionsMiddleware;
