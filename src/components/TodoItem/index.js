import { memo, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { todoActions } from '../../store';
import { EDIT, DELETE } from '../../constants';

import Modal from '../Modal';


const TodoItem = ({ id, title, description, color }) => {
  const [openModal, setOpenModal] = useState(false);
  const { deleteTodo } = todoActions;
  const dispatch = useDispatch();

  const modalToggler = useCallback(() => {
    setOpenModal(state => !state);
  },[setOpenModal]);

  return (
    <li>
      <div style={{}}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
      <button onClick={modalToggler}>{EDIT}</button>
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
      <button onClick={() => dispatch(deleteTodo(id))}>{DELETE}</button>
    </li>
  );
};

export default memo(TodoItem);
