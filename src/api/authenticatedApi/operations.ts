import { store, history } from '../../redux/store';
import { EMPTY_TOKEN } from '../../nav/constants';
import { get, del, put, post } from '../base';
import { LOGIN } from '../../nav/constants';
import { UnauthorizedAOperationError } from './constants';

export function authenticatedGet(endpoint: string): Promise<object> {
  return getUserTokenOrRedirect(token => get(endpoint, token));
}

export function authenticatedDel(endpoint: string): Promise<object> {
  return getUserTokenOrRedirect(token => del(endpoint, token));
}

export function authenticatedPut(
  endpoint: string,
  body: object
): Promise<object> {
  return getUserTokenOrRedirect(token => put(endpoint, body, token));
}

export function authenticatedPost(
  endpoint: string,
  body: object
): Promise<object> {
  return getUserTokenOrRedirect(token => post(endpoint, body, token));
}

function getUserTokenOrRedirect<T>(
  route: (token: string) => Promise<T>
): Promise<T> {
  const token = store.getState().user.token; // TODO: Replace with mapStateToProps
  if (token === EMPTY_TOKEN) {
    history.push(LOGIN);
    throw UnauthorizedAOperationError;
  } else {
    return route(token);
  }
}
