import { put, takeLatest } from 'redux-saga/effects';
import { UPDATE_PROFILE_REQUEST, UPDATE_PROFILE } from '../types';

function* updateProfile({ payload }) {
  localStorage.setItem('profile', JSON.stringify(payload));
  yield put({ type: UPDATE_PROFILE, payload });
}

export default function* profileSaga() {
  yield takeLatest(UPDATE_PROFILE_REQUEST, updateProfile);
}
