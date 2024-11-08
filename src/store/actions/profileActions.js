
import { UPDATE_PROFILE_REQUEST } from '../types';
export const updateProfile = (profileData) => ({
  type: UPDATE_PROFILE_REQUEST,
  payload: profileData,
});
