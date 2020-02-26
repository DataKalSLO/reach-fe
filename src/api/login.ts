import { get, post, put, del } from './base';
import { User } from '../redux/login/types';

export async function login(user: User) {
  console.log(user);
  const response = await post('/user', user);
  return await response.json();
}

export async function logout() {
  await del('/user');
}
