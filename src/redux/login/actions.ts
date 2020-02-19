import { User, UserActionTypes, LOGIN, LOGOUT } from './types';
import { login, logout } from '../../api/login';
import { Dispatch } from 'redux';

export function loginAction(user: User): UserActionTypes {
  return {
    type: LOGIN,
    payload: user
  };
}

export function loginUser(user: User) {
  return async (dispatch: Dispatch) => {
    await login(user);
    dispatch(loginAction(user));
  };
}

export function logoutAction(): UserActionTypes {
  return { type: LOGOUT };
}

export function logoutUser(user: User) {
  return async (dispatch: Dispatch) => {
    await logout();
    dispatch(logoutAction());
  };
}
