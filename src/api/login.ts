import { post, put, del } from './base';
import {
  LoginData,
  RegisterData,
  PasswordResetData,
  UserSettings,
  PasswordEditData
} from '../redux/login/types';

export async function login(loginData: LoginData) {
  return await post('token', loginData);
}

export async function postPerson(registerData: RegisterData) {
  return await post('person', registerData);
}

export async function deletePerson(email: string, token: string) {
  return await del(`person/${email}`, token);
}

export async function putPersonSettings(
  email: string,
  settingsData: UserSettings
) {
  return await put(`person/${email}`, settingsData);
}

export async function postPassword(passwordResetData: PasswordResetData) {
  return await post('password', passwordResetData);
}

export async function putPassword(passwordEditData: PasswordEditData) {
  return await put('password', passwordEditData);
}
