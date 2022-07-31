import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { todoActions } from '../../store';
import { TODOS, ADD_TODO, CLEAR } from "../../constants";

import Modal from "../Modal";
import TodoItem from "../TodoItem";

import classes from './TodoList.module.css'

const TodoList = () => {
  const [openModal, setOpenModal] = useState(false);
  const todos = useSelector(state => state.todosReducer);
  const dispatch = useDispatch();
  const { deleteAllTodos } = todoActions;

  const modalToggler = () => {
    setOpenModal(state => !state);
  };
  
  const clearAll = () => {
    const todosIds = todos.reduce((acc,next) => {
      acc.push(next.id)
      return acc;
    },[]);
    
    dispatch(deleteAllTodos(todosIds))
  }

  return (
    <main className={classes.main}>
      <h1 className={classes.heading}>{TODOS}</h1>
      <button className={classes.buttonAdd} onClick={modalToggler}>{ADD_TODO}</button>
      {todos.length > 0 && <button className={classes.buttonClear} onClick={clearAll}>{CLEAR}</button>}
      <ul className={classes.todoList}>
        {todos.map(({id,title,description,color}) => (
          <TodoItem key={id} id={id} title={title} description={description} color={color} />
        ))}
      </ul>
      {openModal && (
        <Modal
          add={true}
          modalToggler={modalToggler}
        />
      )}
    </main>
  )
}

export default TodoList;
