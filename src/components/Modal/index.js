import { memo, useRef, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';

import { todoActions } from '../../store';
import { TITLE, DESCRIPTION, COLOR, DONE, CLOSE } from '../../constants';

import classes from './Modal.module.css';

const Modal = ({ id, title, description, color, modalToggler, add, edit }) => {
  const dispatch = useDispatch();
  const { editTodo, addTodo } = todoActions;

  const titleRef = useRef();
  const colorRef = useRef();
  const descriptionRef = useRef();

  const done = useCallback(
    (id, title, description, color) => {
      if (titleRef.current.value === '' || descriptionRef.current.value === '') {
        alert('Description and Title Fields are required');
        return;
      }
      if (add) {
        dispatch(addTodo({ title, description, color }));
        modalToggler();
      }
      if (edit) {
        dispatch(editTodo({ id, title, color, description }));
        modalToggler();
      }
    },
    [add, edit, addTodo, editTodo, dispatch, modalToggler],
  );

  const portalContent = useMemo(
    () => (
      <div className={classes.modal}>
        <ul className={classes.modalContent}>
          <li className={classes.modalItems}>
            <label htmlFor="title">{TITLE}</label>
            <input
              ref={titleRef}
              type="text"
              name="title"
              id="title"
              defaultValue={title ? title : null}
            ></input>
          </li>
          <li className={classes.modalItems}>
            <label htmlFor="description">{DESCRIPTION}</label>
            <input
              ref={descriptionRef}
              type="text"
              name="description"
              id="description"
              defaultValue={description ? description : null}
            ></input>
          </li>
          <li className={classes.modalItems}>
            <label htmlFor="color">{COLOR}</label>
            <input
              ref={colorRef}
              type="color"
              name="color"
              id="color"
              defaultValue={color ? color : null}
            ></input>
          </li>
        </ul>
        <div>
          <button
            className={classes.done}
            onClick={() =>
              done(id, titleRef.current.value, descriptionRef.current.value, colorRef.current.value)
            }
          >
            {DONE}
          </button>
          <button className={classes.close} onClick={modalToggler}>{CLOSE}</button>
        </div>
      </div>
    ),
    [id, title, color, description, modalToggler, done],
  );

  return createPortal(portalContent, document.getElementById('modal'));
};

export default memo(Modal);
