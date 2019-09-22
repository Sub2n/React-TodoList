const React = require('react');
const ReactDom = require('react-dom');
const { hot } = require('react-hot-loader/root');

const TodoList = require('./TodoList');
const Hot = hot(TodoList);

ReactDom.render(<Hot />, document.querySelector('#root'));
