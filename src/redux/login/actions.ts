import {
  User,
  LoginData,
  UserActionTypes,
  LOGIN,
  LOGOUT,
  RegisterData
} from './types';
import { login, postPerson, deletePerson } from '../../api/login';
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
    dispatch(logoutAction());
    await postPerson(registerData); // what is registerData returns error message?
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

export function deleteUser(email: string, token: string) {
  return async (dispatch: Dispatch) => {
    await deletePerson(email, token); // want something to return here to indicate error?
    dispatch(logoutAction());
  };
}
