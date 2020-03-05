import { get, post, put, del } from './base';
import { LoginData, RegisterData } from '../redux/login/types';

export async function login(loginData: LoginData) {
  return await post('token', loginData);
}

export async function logout() {
  await del('/user');
}

export async function postPerson(registerData: RegisterData) {
  return await post('person', registerData);
}
