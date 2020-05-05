import { post, del } from './base';
import { LoginData, RegisterData } from '../redux/login/types';

export async function login(loginData: LoginData) {
  return await post('token', loginData);
}

export async function postPerson(registerData: RegisterData) {
  return await post('person', registerData);
}

export async function deletePerson(email: string, token: string) {
  return await del(`person/${email}`, token);
}
