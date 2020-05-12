import { LOGIN, LOGOUT, UserActionTypes, User } from './types';
import { UNDEFINED_USER, EMPTY_TOKEN } from '../../nav/constants';

const initialState: User = {
  email: '',
  token: EMPTY_TOKEN,
  name: '',
  role: UNDEFINED_USER,
  occupation: ''
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
        role: UNDEFINED_USER
      };
    default:
      return state;
  }
}
