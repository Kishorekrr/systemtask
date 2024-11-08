import { LOGIN_REQUEST, LOGOUT } from "../types";

export const login = (username, password, navigate, setErrors) => ({
  type: LOGIN_REQUEST,
  payload: { username, password, navigate, setErrors },
});

export const logout = () => ({
  type: LOGOUT,
});
