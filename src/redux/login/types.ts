export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: string;
  occupation: string;
  notificationsEnabled: boolean;
}

export interface User {
  email: string;
  token: string;
  name: string;
  role: string;
}

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

interface LoginUserAction {
  type: typeof LOGIN;
  payload: User;
}

interface LogoutUserAction {
  type: typeof LOGOUT;
}

export type UserActionTypes = LoginUserAction | LogoutUserAction;
