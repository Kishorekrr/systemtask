import { all } from 'redux-saga/effects';
import authSaga from './authSaga';
import profileSaga from './profileSaga';
import todoSaga from './todoSaga';

export default function* rootSaga() {
  yield all([
    authSaga(),
    profileSaga(),
    todoSaga(),
  ]);
}
