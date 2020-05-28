export interface LoginData {
  email: string;
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
  token: string;
  name: string;
  role: number;
  occupation: string;
  notificationsEnabled: boolean;
  isThirdParty: boolean;
}

export interface UserSettings {
  name: string;
  occupation: string;
  notificationsEnabled: boolean;
}

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';

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
