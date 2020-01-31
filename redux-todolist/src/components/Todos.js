import React, { useRef, useState, useMemo, useEffect } from 'react';

const Todos = ({
  _todos,
  onAdd,
  onToggle,
  onRemove,
  onToggleAll,
  onRemoveCompleted
}) => {
  const tabs = ['All', 'Active', 'Completed'];
  const $toggleAll = useRef(null);
  const $input = useRef(null);
  const [text, setText] = useState('');
  const [activeTab, setActiveTab] = useState('All');
  const [todos, setTodos] = useState(_todos);

  const completedNum = useMemo(
    () => todos.filter(({ completed }) => completed).length,
    [todos]
  );
  const uncompletedNum = useMemo(
    () => todos.filter(({ completed }) => !completed).length,
    [todos]
  );

  useEffect(() => {
    if (activeTab === 'All') setTodos(_todos);
    else {
      setTodos(
        _todos.filter(todo =>
          activeTab === 'Completed' ? todo.completed : !todo.completed
        )
      );
    }
  }, [_todos, activeTab]);

  return (
    <div className="container">
      <h1 className="title">Todos</h1>
      <div className="ver">1.0</div>

      <form
        onSubmit={e => {
          e.preventDefault();
          if (!text) return;
          onAdd(text);
          setText('');
        }}>
        <input
          className="input-todo"
          ref={$input}
          value={text}
          onChange={() => setText($input.current.value)}
          placeholder="What needs to be done?"
          autoFocus
        />
      </form>

      <ul className="nav">
        {tabs.map(tab => (
          <li
            key={tab}
            onClick={() => setActiveTab(tab)}
            id={tab.toLowerCase()}
            className={tab === activeTab ? 'active' : null}>
            {tab}
          </li>
        ))}
      </ul>

      <ul className="todos">
        {todos.map(({ id, text, completed }) => (
          <li key={id} id={id} className="todo-item">
            <input
              className="custom-checkbox"
              type="checkbox"
              id={`ck-${id}`}
              onChange={() => onToggle(id)}
              checked={completed}
            />
            <label htmlFor={`ck-${id}`}>{text}</label>
            <i
              className="remove-todo far fa-times-circle"
              onClick={() => onRemove(id)}></i>
          </li>
        ))}
      </ul>
      <div className="footer">
        <div className="complete-all">
          <input
            className="custom-checkbox"
            type="checkbox"
            ref={$toggleAll}
            onChange={() => {
              onToggleAll($toggleAll.current.checked);
            }}
            id="ck-complete-all"
          />
          <label htmlFor="ck-complete-all">Mark all as complete</label>
        </div>
        <div className="clear-completed">
          <button className="btn" onClick={onRemoveCompleted}>
            Clear completed (
            <span className="completed-todos">{completedNum}</span>)
          </button>
          <strong className="active-todos">{uncompletedNum}</strong> items left
        </div>
      </div>
    </div>
  );
};

export default Todos;
