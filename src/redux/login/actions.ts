<<<<<<< HEAD
import {
  User,
  LoginData,
  UserActionTypes,
  LOGIN,
  LOGOUT,
  RegisterData
} from './types';
import { login, postPerson } from '../../api/login';
=======
import { User, LoginData, UserActionTypes, LOGIN, LOGOUT } from './types';
import { login } from '../../api/login';
>>>>>>> 1d6010db89f03a60e07f45b04ccc018bd8ab1836
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

<<<<<<< HEAD
export function register(registerData: RegisterData) {
  return async (dispatch: Dispatch) => {
    dispatch(logoutAction());
    await postPerson(registerData);
    const user = await login({
      email: registerData.email,
      password: registerData.password
    });
    dispatch(loginAction(user));
  };
}

=======
>>>>>>> 1d6010db89f03a60e07f45b04ccc018bd8ab1836
export function logoutAction(): UserActionTypes {
  return { type: LOGOUT };
}
