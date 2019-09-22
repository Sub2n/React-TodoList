const React = require('react');
const { Component, createRef } = React;
// const Todo = require('./Todo');

/*
  todos = [
    { id: 1, content: 'HTML', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 3, content: 'Javascript', completed: false },
  ];
*/

class TodoList extends Component {
  state = {
    state: 'all',
    todos: [],
  };

  inputRef = createRef();

  componentDidMount() {
    this.inputRef.current.focus();
  }

  generateId = () => {
    const { todos } = this.state;
    return todos.length ? Math.max(...todos.map(({ id }) => id)) + 1 : 1;
  };

  addTodo = e => {
    const { todos } = this.state;
    const content = this.inputRef.current.value.trim();

    if (!content || e.keyCode !== 13) return;

    this.setState({
      todos: [{ id: this.generateId(), content, completed: false }, ...todos],
    });

    this.inputRef.current.value = '';
    this.inputRef.current.focus();
  };

  toggleTodo = id => {
    const { todos } = this.state;

    this.setState({
      todos: todos.map(todo =>
        id === todo.id ? { ...todo, completed: !todo.completed } : todo
      ),
    });
  };

  unCompletedTodos = () => {
    const { todos } = this.state;

    return todos.filter(({ completed }) => completed === false).length;
  };

  activeNav = active => {
    this.setState({
      state: active,
    });
  };

  filterTodos = () => {
    const { state, todos } = this.state;
    let filterd = [];

    if (state === 'all') {
      filterd = todos;
    } else {
      filterd = todos.filter(({ completed }) =>
        state === 'active' ? completed === false : completed === true
      );
    }

    return filterd.map(todo => (
      <li key={todo.id} className="todo-item">
        <input
          className="custom-checkbox"
          id={todo.id}
          type="checkbox"
          onChange={() => this.toggleTodo(todo.id)}
          checked={todo.completed}
        />
        <label
          onClick={() => this.toggleTodo(todo.id)}
          htmlFor={`ck-${todo.id}`}
        >
          {todo.content}
        </label>
        <i className="remove-todo far fa-times-circle"></i>
      </li>
    ));
  };

  render() {
    const { state, todos } = this.state;
    return (
      <>
        <div className="container">
          <h1 className="title">Todos</h1>
          <div className="ver">1.0</div>

          <input
            onKeyUp={this.addTodo}
            ref={this.inputRef}
            className="input-todo"
            placeholder="What needs to be done?"
            autoFocus
          />
          <ul className="nav">
            <li
              id="all"
              onClick={() => this.activeNav('all')}
              className={state === 'all' ? 'active' : null}
            >
              All
            </li>
            <li
              id="active"
              onClick={() => this.activeNav('active')}
              className={state === 'active' ? 'active' : null}
            >
              Active
            </li>
            <li
              id="completed"
              onClick={() => this.activeNav('completed')}
              className={state === 'active' ? 'completed' : null}
            >
              Completed
            </li>
          </ul>

          <ul className="todos">{this.filterTodos()}</ul>

          <div className="footer">
            <div className="complete-all">
              <input
                className="custom-checkbox"
                type="checkbox"
                id="ck-complete-all"
              />
              <label htmlFor="ck-complete-all">Mark all as complete</label>
            </div>
            <div className="clear-completed">
              <button className="btn">
                Clear completed (<span className="completed-todos">0</span>)
              </button>
              <strong className="active-todos">
                {this.unCompletedTodos()}
              </strong>{' '}
              items left
            </div>
          </div>
        </div>
      </>
    );
  }
}

module.exports = TodoList;
