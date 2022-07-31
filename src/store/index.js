import { configureStore, createSlice } from "@reduxjs/toolkit";
import asyncActionsMiddleware from "../middleware/asyncActionsMiddleware";
import { actions } from "./actions";

const todos = createSlice({
  name: 'todos',
  initialState: [],
  reducers: actions,
})

const store = configureStore({
  reducer: {
    todosReducer: todos.reducer
  },
  middleware: [asyncActionsMiddleware]
})

export const todoActions = todos.actions;
export default store;
