import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import authReducer from './reducers/authReducers';
import profileReducer from './reducers/profileReducers';
import todoReducer from './reducers/todoReducers';
import rootSaga from './sagas'; 

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  todos: todoReducer,
});

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
