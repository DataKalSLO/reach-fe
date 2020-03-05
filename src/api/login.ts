import { post } from './base';
import { LoginData } from '../redux/login/types';

export async function login(loginData: LoginData) {
  return await post('token', loginData);
}
