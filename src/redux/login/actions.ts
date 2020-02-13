import { User, UserActionTypes, LOGIN, LOGOUT } from './types';

export function login(user: User): UserActionTypes {
  return {
    type: LOGIN,
    payload: user
  };
}

export function logout(user: User): UserActionTypes {
  return {
    type: LOGOUT,
    payload: user
  };
}
