import { put, takeLatest, call } from 'redux-saga/effects';
import { FETCH_TODOS_REQUEST, FETCH_TODOS_SUCCESS, FETCH_TODOS_FAILURE, ADD_TODO_REQUEST, ADD_TODO, SET_TODOS } from '../types';

const fetchTodosFromAPI = async () => {
  const response = await fetch('https://dummyjson.com/todos');
  if (!response.ok) throw new Error('Failed to fetch todos');
  const data = await response.json();
  return data.todos;
};

function* fetchTodosSaga() {
  try {
    const todos = yield call(fetchTodosFromAPI); 
    localStorage.setItem('todos', JSON.stringify(todos));  
    yield put({ type: FETCH_TODOS_SUCCESS, payload: todos }); 
  } catch (error) {
    yield put({ type: FETCH_TODOS_FAILURE, payload: error.message }); 
  }
}

function* addTodoSaga({ payload }) {
  const newTodo = {
    id: Date.now(),
    text: payload,
    completed: false,
  };

  const currentTodos = JSON.parse(localStorage.getItem('todos')) || [];
  const updatedTodos = [...currentTodos, newTodo];
  localStorage.setItem('todos', JSON.stringify(updatedTodos));

  yield put({ type: ADD_TODO, payload: newTodo });
}

export default function* todoSaga() {
  yield takeLatest(FETCH_TODOS_REQUEST, fetchTodosSaga);
  yield takeLatest(ADD_TODO_REQUEST, addTodoSaga);
}
