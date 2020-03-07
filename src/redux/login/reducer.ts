import { LOGIN, LOGOUT, UserActionTypes, User } from './types';

const initialState: User = {
  email: '',
  token: ''
};
export function userReducer(
  state = initialState,
  action: UserActionTypes
): User {
  switch (action.type) {
    case LOGIN:
      return action.payload;
    case LOGOUT:
      return { email: '', token: '' };
    default:
      return state;
  }
}
