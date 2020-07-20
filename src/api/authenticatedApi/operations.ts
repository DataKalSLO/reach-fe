import { store, history } from '../../redux/store';
import { EMPTY_TOKEN } from '../../nav/constants';
import { get, del, put, post, postForm } from '../base';
import { LOGIN } from '../../nav/constants';
import {
  UnauthorizedAOperationError,
  CONFIRM_REDIRECT_TO_LOGIN_PROMPT
} from './constants';
import { Auth } from 'aws-amplify';

export function authenticatedGet(endpoint: string): Promise<object> {
  return performActionWithToken(token => get(endpoint, token));
}

export function optionalAuthenticatedGet(endpoint: string): Promise<object> {
  return performActionWithToken(
    token => get(endpoint, token),
    () => get(endpoint)
  );
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

export function authenticatedPostForm(
  endpoint: string,
  body: FormData
): Promise<object> {
  return performActionWithToken(token => postForm(endpoint, body, token));
}

async function performActionWithToken<T>(
  action: (token: string) => T,
  noTokenAction?: () => T
): Promise<T> {
  //Changed from token to email since token no longer exists
  const token = (await Auth.currentSession()).getIdToken().getJwtToken();
  if (token === EMPTY_TOKEN) {
    if (window.confirm(CONFIRM_REDIRECT_TO_LOGIN_PROMPT)) {
      history.push(LOGIN);
    } else if (noTokenAction) {
      return noTokenAction();
    }
    throw UnauthorizedAOperationError;
  } else {
    return action(token);
  }
}
