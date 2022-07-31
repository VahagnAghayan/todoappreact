import { memo, useRef, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';

import { todoActions } from '../../store';
import { TITLE, DESCRIPTION, COLOR, DONE, CLOSE } from '../../constants';

const Modal = ({ id, title, description, color, modalToggler, add, edit }) => {
  const dispatch = useDispatch();
  const { editTodo, addTodo } = todoActions;

  const titleRef = useRef();
  const colorRef = useRef();
  const descriptionRef = useRef();

  const Done = useCallback(
    (id, title, description, color) => {
      if (titleRef.current.value === '' || descriptionRef.current.value === '') {
        alert('Description and Title Fields are required');
        return;
      }
      if (add) {
        dispatch(addTodo({ title, color, description }));
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
      <div>
        <ul>
          <li>
            <label htmlFor="title">{TITLE}</label>
            <input
              ref={titleRef}
              type="text"
              name="title"
              id="title"
              defaultValue={title ? title : null}
            ></input>
          </li>
          <li>
            <label htmlFor="description">{DESCRIPTION}</label>
            <input
              ref={descriptionRef}
              type="text"
              name="description"
              id="description"
              defaultValue={description ? description : null}
            ></input>
          </li>
          <li>
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
            onClick={() =>
              Done(id, titleRef.current.value, descriptionRef.current.value, colorRef.current.value)
            }
          >
            {DONE}
          </button>
          <button onClick={modalToggler}>{CLOSE}</button>
        </div>
      </div>
    ),
    [id, title, color, description, modalToggler, Done],
  );

  return createPortal(portalContent, document.getElementById('modal'));
};

export default memo(Modal);
