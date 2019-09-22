const React = require('react');
const { PureComponent } = React;

class Todo extends PureComponent {
  render() {
    const todo = this.props.todo;

    return (
      <li className="todo-item">
        <input
          className="custom-checkbox"
          defaultChecked={todo.completed}
          type="checkbox"
        />
        <label htmlFor={`ck-${todo.id}`}>{todo.content}</label>
        <i className="remove-todo far fa-times-circle"></i>
      </li>
    );
  }
}

module.exports = Todo;
