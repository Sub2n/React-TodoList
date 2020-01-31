const ADD = 'todos/ADD';
const TOGGLE = 'todos/TOGGLE';
const REMOVE = 'todos/REMOVE';
const TOGGLEALL = 'todos/TOGGLEALL';
const REMOVECOMPLETED = 'todos/REMOVECOMPLETED';

let id = 4;
export const add = text => ({
  type: ADD,
  todo: { id: id++, text, completed: false }
});
export const toggle = id => ({ type: TOGGLE, id });
export const remove = id => ({ type: REMOVE, id });
export const toggleAll = completed => ({ type: TOGGLEALL, completed });
export const removeCompleted = () => ({ type: REMOVECOMPLETED });

const initialState = {
  todos: [
    { id: 1, text: 'React', completed: true },
    { id: 2, text: 'Redux Middleware', completed: false },
    { id: 3, text: 'Writing', completed: false }
  ]
};

function todos(state = initialState, action) {
  switch (action.type) {
    case ADD:
      return {
        todos: [...state.todos, action.todo]
      };
    case TOGGLE:
      return {
        todos: state.todos.map(todo =>
          action.id === todo.id ? { ...todo, completed: !todo.completed } : todo
        )
      };
    case REMOVE:
      return {
        todos: state.todos.filter(({ id }) => id !== action.id)
      };
    case TOGGLEALL:
      return {
        todos: state.todos.map(todo => ({
          ...todo,
          completed: action.completed
        }))
      };
    case REMOVECOMPLETED:
      return {
        todos: state.todos.filter(({ completed }) => !completed)
      };
    default:
      return state;
  }
}

export default todos;
