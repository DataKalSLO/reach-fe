import { CognitoUser } from 'amazon-cognito-identity-js';

export interface LoginData {
  email: string;
  password: string;
}

export interface PasswordResetData {
  email: string;
}

export interface PasswordEditData {
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: number;
  occupation: string;
  notificationsEnabled: boolean;
  isThirdParty: boolean;
}

export interface User {
  email: string;
  name: string;
  role: number;
  'custom:occupation': string;
  'custom:emailNotif': boolean;
}

export interface PasswordChange {
  currentPassword: string;
  newPassword: string;
}

export interface UserSettings {
  name: string;
  'custom:occupation': string;
  'custom:emailNotif': boolean;
}

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';

//https://aws-amplify.github.io/amplify-js/api/classes/authclass.html#signin
interface LoginUserAction {
  type: typeof LOGIN;
  payload: User;
}

interface LogoutUserAction {
  type: typeof LOGOUT;
}

interface UpdateUserSettingsAction {
  type: typeof UPDATE_SETTINGS;
  payload: UserSettings;
}

export type UserActionTypes =
  | LoginUserAction
  | LogoutUserAction
  | UpdateUserSettingsAction;
