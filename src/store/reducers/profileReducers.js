import { UPDATE_PROFILE } from '../types';

const initialState = JSON.parse(localStorage.getItem('profile')) || {
  email: '',
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PROFILE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default profileReducer;
