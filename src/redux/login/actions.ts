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
import { login, postPerson } from '../../api/login';
import { cognitoUserToLocalUser } from '../../common/util/accountTools';
import { Auth } from 'aws-amplify';
import { Dispatch } from 'redux';

export function loginAction(user: User): UserActionTypes {
  return {
    type: LOGIN,
    payload: user
  };
}

//https://docs.amplify.aws/lib/auth/emailpassword/q/platform/js
export function loginUser(loginData: LoginData) {
  return async (dispatch: Dispatch) => {
    const cognitoUser = await Auth.signIn(loginData.email, loginData.password);
    const user = cognitoUserToLocalUser(cognitoUser);
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

export function logoutUser(loginData: LoginData) {
  return async (dispatch: Dispatch) => {
    await Auth.signOut();
    dispatch(logoutAction());
  };
}

export function deleteUser() {
  return async (dispatch: Dispatch) => {
    const currUser = await Auth.currentAuthenticatedUser();
    currUser.deleteUser();
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

export function updateUserSettings(settings: UserSettings) {
  return async (dispatch: Dispatch) => {
    console.log(settings);
    const currUser = await Auth.currentAuthenticatedUser();
    Auth.updateUserAttributes(currUser, settings);
    dispatch(updateUserSettingsAction(settings));
  };
}

export function updateUserSettingsAndPassword(
  settings: UserSettings,
  oldPass: string,
  newPass: string
) {
  return async (dispatch: Dispatch) => {
    const currUser = await Auth.currentAuthenticatedUser();
    Auth.changePassword(currUser, oldPass, newPass);
    Auth.updateUserAttributes(currUser, settings);
    dispatch(updateUserSettingsAction(settings));
  };
}
