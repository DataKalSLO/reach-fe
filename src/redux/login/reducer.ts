import { LOGIN, LOGOUT, UserActionTypes, User, UPDATE_SETTINGS } from './types';
import { UNDEFINED_USER } from '../../nav/constants';

const initialState: User = {
  email: '',
  token: '',
  name: '',
  role: UNDEFINED_USER,
  occupation: '',
  notificationsEnabled: false
};

export function userReducer(
  state = initialState,
  action: UserActionTypes
): User {
  switch (action.type) {
    case LOGIN:
      return action.payload;
    case LOGOUT:
      return {
        email: '',
        token: '',
        name: '',
        occupation: '',
        role: UNDEFINED_USER,
        notificationsEnabled: false
      };
    case UPDATE_SETTINGS:
      return {
        ...state,
        name: action.payload.name,
        occupation: action.payload.occupation,
        notificationsEnabled: action.payload.notificationsEnabled
      };
    default:
      return state;
  }
}
