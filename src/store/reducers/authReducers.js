import { LOGIN_SUCCESS, LOGOUT } from '../types';
const initialState = {
  isAuthenticated: !!localStorage.getItem('userData'),
  userData: JSON.parse(localStorage.getItem('userData')) || null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        userData: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        userData: null,
      };
    default:
      return state;
  }
};

export default authReducer;
