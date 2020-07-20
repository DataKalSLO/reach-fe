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
  username: string;
  password: string;
  attributes: {
    email: string;
    name: string;
    'custom:occupation': string;
    'custom:emailNotif': string;
    'custom:role': number;
  };
}

// Custom attributes need to have 'custom:' in front of them to work correctly.
// https://aws.amazon.com/blogs/mobile/aws-amplify-adds-support-for-custom-attributes-in-amazon-cognito-user-pools/
export interface User {
  email: string;
  name: string;
  token: string;
  'custom:role': number;
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
