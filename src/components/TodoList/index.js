import { memo, useState } from "react";
import { useSelector } from "react-redux";

import { TODOS, ADD_TODO } from "../../constants";

import Modal from "../Modal";
import Loading from "../Loading";
import TodoItem from "../TodoItem";

const TodoList = () => {
  const [openModal, setOpenModal] = useState(false);
  const todos = useSelector(state => state.todosReducer);

  const modalToggler = () => {
    setOpenModal(state => !state);
  };  

  if(todos.length === 0) {
    return <Loading />
  } 

  return (
    <main>
      <h1>{TODOS}</h1>
      <button onClick={modalToggler}>{ADD_TODO}</button>
      <ul>
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

export default memo(TodoList);
