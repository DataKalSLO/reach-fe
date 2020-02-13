export interface User {
  email: string;
}

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

interface LoginUserAction {
  type: typeof LOGIN;
  payload: User;
}

interface LogoutUserAction {
  type: typeof LOGOUT;
  payload: User;
}

export type UserActionTypes = LoginUserAction | LogoutUserAction;
