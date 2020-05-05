import { LOGIN, LOGOUT, UserActionTypes, User } from './types';

const initialState: User = {
  email: '',
  token: '',
  name: '',
  role: -1,
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
      return { email: '', token: '', name: '', occupation: '', role: -1 };
    default:
      return state;
  }
}
