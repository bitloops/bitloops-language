/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { FaTrash } from 'react-icons/fa';

import logo from '../assets/bitloops_175x40_transparent.png';
import { Todo } from '../bitloops/proto/todo_pb';

// const ViewStates = {
//   ALL: 'All',
//   ACTIVE: 'Active',
//   COMPLETED: 'Completed',
// };

interface TodoProps {
  editable: string,
  newValue: string,
  setNewValue: React.Dispatch<React.SetStateAction<string>>,
  setEditable: React.Dispatch<React.SetStateAction<string>>,
  data: Todo.AsObject[] | [],
  addItem: (e: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLInputElement>) => void,
  updateLocalItem: (d: any) => void,
  modifyTitle: (e: any) => void,
  removeItem: (id: string) => void,
  handleCheckbox: (d: any) => void,
}

function TodoPanel(props: TodoProps): JSX.Element {
  const {
    newValue,
    setNewValue,
    addItem,
    updateLocalItem,
    modifyTitle,
    removeItem,
    editable,
    setEditable,
    handleCheckbox,
    data,
  } = props;

  return (
    <div className="todo-list">
      <div className="heading">
        <h1 className="title"><img
          src={logo}
          alt="Bitloops"
          width={175}
          height={40}
        /><br />To Do
        </h1>
      </div>
      <input
        type="text"
        value={newValue}
        className="todo-list-input"
        onChange={(e) => { setNewValue(e.target.value); }}
        onKeyPress={(e) => {
          if (e.key === 'Enter') addItem(e);
        }}
      />
      <button onClick={addItem} type="button">Add</button>

      <div className="items">
        <ul>
          {data && data.map((todo) => {
            const { id, title, completed } = todo;
            return (
            <li key={id}>
              <input className="checkbox" id={id} type="checkbox" checked={completed} onChange={handleCheckbox} />
              {editable === id ? (
                <input
                  type="title"
                  value={title}
                  id={id}
                  className="todo-list-input"
                  onChange={updateLocalItem}
                  onKeyPress={(event) => event.key === 'Enter' && modifyTitle(event)}
                  onBlur={modifyTitle}
                />
              ) : (
                <p
                  id={id}
                  onClick={(e: React.MouseEvent<HTMLElement>) => {
                    const target = e.target as HTMLParagraphElement;
                    setEditable(target.id);
                  }}
                >{title}
                </p>
              )}
              <div className="actions">
                <FaTrash
                  onClick={() => {
                    removeItem(id);
                  }}
                />
              </div>
            </li>
          );})}
        </ul>
      </div>
    </div>
  );
}

export default TodoPanel;
