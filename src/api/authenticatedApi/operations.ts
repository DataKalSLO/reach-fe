import { store, history } from '../../redux/store';
import { EMPTY_TOKEN } from '../../nav/constants';
import { get, del, put, post } from '../base';
import { LOGIN } from '../../nav/constants';
import {
  UnauthorizedAOperationError,
  CONFIRM_REDIRECT_TO_LOGIN_PROMPT
} from './constants';

export function authenticatedGet(endpoint: string): Promise<object> {
  return performActionWithToken(token => get(endpoint, token));
}

export function authenticatedDel(endpoint: string): Promise<object> {
  return performActionWithToken(token => del(endpoint, token));
}

export function authenticatedPut(
  endpoint: string,
  body: object
): Promise<object> {
  return performActionWithToken(token => put(endpoint, body, token));
}

export function authenticatedPost(
  endpoint: string,
  body: object
): Promise<object> {
  return performActionWithToken(token => post(endpoint, body, token));
}

export function performActionWithToken<T>(action: (token: string) => T): T {
  const token = store.getState().user.token;
  if (token === EMPTY_TOKEN) {
    if (window.confirm(CONFIRM_REDIRECT_TO_LOGIN_PROMPT)) {
      history.push(LOGIN);
    }
    throw UnauthorizedAOperationError;
  } else {
    return action(token);
  }
}
