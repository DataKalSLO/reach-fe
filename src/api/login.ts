import { post } from './base';
import { LoginData, RegisterData } from '../redux/login/types';

// compare returned value to hash
export async function login(loginData: LoginData) {
  return await post('token', loginData);
}

export async function postPerson(registerData: RegisterData) {
  return await post('person', registerData);
}
