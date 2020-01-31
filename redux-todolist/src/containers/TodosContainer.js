import React from 'react';
import { connect } from 'react-redux';
import {
  add,
  toggle,
  remove,
  toggleAll,
  removeCompleted
} from '../modules/todos';
import Todos from '../components/Todos';

const TodosContainer = ({
  todos,
  add,
  toggle,
  remove,
  toggleAll,
  removeCompleted
}) => {
  return (
    <Todos
      _todos={todos}
      onAdd={add}
      onToggle={toggle}
      onRemove={remove}
      onToggleAll={toggleAll}
      onRemoveCompleted={removeCompleted}
    />
  );
};

export default connect(({ todos }) => todos, {
  add,
  toggle,
  remove,
  toggleAll,
  removeCompleted
})(TodosContainer);
