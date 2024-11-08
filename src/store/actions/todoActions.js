import { ADD_TODO_REQUEST, DELETE_TODO, TOGGLE_TODO, SET_TODOS, FETCH_TODOS_REQUEST, EDIT_TODO, SET_FILTER } from '../types';

export const fetchTodos = () => ({
  type: FETCH_TODOS_REQUEST,
});

export const addTodo = (task) => ({
  type: ADD_TODO_REQUEST,
  payload: task,
});

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: id,
});

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: id,
});

export const editTodo = (id, updatedText) => ({
  type: EDIT_TODO,
  payload: { id, updatedText },
});

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter,
});
