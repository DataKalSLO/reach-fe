import {
  User,
  LoginData,
  UserActionTypes,
  LOGIN,
  LOGOUT,
  UPDATE_SETTINGS,
  RegisterData,
  UserSettings
} from './types';
import {
  login,
  postPerson,
  deletePerson,
  putPersonSettings
} from '../../api/login';
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

export function deleteUser(email: string, token: string) {
  return async (dispatch: Dispatch) => {
    await deletePerson(email, token);
    dispatch(logoutAction());
  };
}

export function updateUserSettingsAction(
  settings: UserSettings
): UserActionTypes {
  return {
    type: UPDATE_SETTINGS,
    payload: settings
  };
}

export function updateUserSettings(email: string, settings: UserSettings) {
  return async (dispatch: Dispatch) => {
    await putPersonSettings(email, settings);
    dispatch(updateUserSettingsAction(settings));
  };
}
