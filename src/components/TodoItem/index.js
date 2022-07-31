import { memo, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { todoActions } from '../../store';
import { EDIT, DELETE } from '../../constants';

import Modal from '../Modal';

import classes from './TodoItem.module.css';

const TodoItem = ({ id, title, description, color }) => {
  const [openModal, setOpenModal] = useState(false);
  const { deleteTodo } = todoActions;
  const dispatch = useDispatch();

  const modalToggler = useCallback(() => {
    setOpenModal(state => !state);
  },[setOpenModal]);

  return (
    <li style={{backgroundColor: color}} className={classes.todoItem}>
      <div>
        <h3 className={classes.heading}>{title}</h3>
        <p>{description}</p>
      </div>
      <div>
      <button className={classes.edit} onClick={modalToggler}>{EDIT}</button>
      {openModal && (
        <Modal
          edit={true}
          id={id}
          title={title}
          description={description}
          color={color}
          modalToggler={modalToggler}
        />
      )}
      <button className={classes.delete} onClick={() => dispatch(deleteTodo(id))}>{DELETE}</button>
      </div>
    </li>
  );
};

export default memo(TodoItem);
