import {
  User,
  LoginData,
  UserActionTypes,
  LOGIN,
  LOGOUT,
  RegisterData
} from './types';
import { login, postPerson } from '../../api/login';
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

export function register(registerData: RegisterData) {
  return async (dispatch: Dispatch) => {
    await postPerson(registerData);
    const user = await login({
      email: registerData.email,
      password: registerData.password
    });
    dispatch(loginAction(user));
  };
}

export function logoutAction(): UserActionTypes {
  return { type: LOGOUT };
}
