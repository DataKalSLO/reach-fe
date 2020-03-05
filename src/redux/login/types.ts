export interface LoginData {
  email: string;
  password: string;
}

<<<<<<< HEAD
export interface RegisterData {
  email: string;
  password: string;
  name: string;
  role: string;
}

=======
>>>>>>> 1d6010db89f03a60e07f45b04ccc018bd8ab1836
export interface User {
  email: string;
  token: string;
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