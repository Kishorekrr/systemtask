import { useNavigate } from "react-router-dom";
import { call, put, takeLatest } from "redux-saga/effects";
import { DASHBOARD_PATH, TODO_PATH } from "../../constants/locaPath";
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from "../types";

function* loginUser({ payload }) {
  const { username, password, navigate, setErrors } = payload;

  if (username === "user123" && password === "password123") {
    const userData = { username, authToken: "fake-jwt-token" };
    localStorage.setItem("userData", JSON.stringify(userData));
    yield put({ type: LOGIN_SUCCESS, payload: userData });
    navigate(TODO_PATH);
  } else {
    setErrors({ form: "Incorrect username or password" });
  }
}

function* logoutUser() {
  localStorage.removeItem("userData");
}

export default function* authSaga() {
  yield takeLatest(LOGIN_REQUEST, loginUser);
  yield takeLatest(LOGOUT, logoutUser);
}
