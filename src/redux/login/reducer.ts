import { LOGIN, LOGOUT, UserActionTypes, User } from './types';

const initialState: User = {
  email: '',
  token: '',
  name: '',
  role: ''
};
export function userReducer(
  state = initialState,
  action: UserActionTypes
): User {
  switch (action.type) {
    case LOGIN:
      return action.payload;
    case LOGOUT:
      return { email: '', token: '', name: '', role: '' };
    default:
      return state;
  }
}
