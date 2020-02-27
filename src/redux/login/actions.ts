import { User, LoginData, UserActionTypes, LOGIN, LOGOUT } from './types';
import { login } from '../../api/login';
import { Dispatch } from 'redux';

export function loginAction(user: User): UserActionTypes {
  return {
    type: LOGIN,
    payload: user
  };
}

export function loginUser(loginData: LoginData) {
  return async (dispatch: Dispatch) => {
    const user = await login(loginData);
    dispatch(loginAction(user));
  };
}

export function logoutAction(): UserActionTypes {
  return { type: LOGOUT };
}