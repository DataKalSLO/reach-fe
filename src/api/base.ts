import { Dispatch } from 'redux';

const baseURL = 'http://localhost:5000/';

// TEMPORARY: will access ES index from backend in future, for now accessing ES directly from client
const searchURL = process.env.REACT_APP_SEARCH_URL;

async function tryFetch(url: string, request: RequestInit) {
  const response = await fetch(url, request);
  const responseText = await response.text();
  const body = responseText === '' ? {} : JSON.parse(responseText);
  if (response.ok) {
    return body || {};
  } else if (response.status === 400) {
    throw errorTranslate(body.tag, navigator.language);
  } else {
    throw response.status;
  }
}

export function wrapWithCatch(fn: Function, errorFn: Function, cb?: Function) {
  return function(dispatch: Dispatch) {
    fn(dispatch)
      .then(() => {
        if (cb) cb();
      })
      .catch(errorFn);
  };
}

function buildRequestConfig(token?: string) {
  const headers = new Headers();
  headers.set('Content-Type', 'application/JSON');
  if (token) headers.set('Authorization', `Bearer ${token}`);

  return {
    headers: headers
  };
}

export function post(endpoint: string, body: object, token?: string) {
  const config = buildRequestConfig(token);
  return tryFetch(baseURL + endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
    ...config
  });
}

// TEMPORARY: will access ES index from backend in future, for now accessing ES directly from client
export function esPost(endpoint: string, body: object) {
  return tryFetch(searchURL + endpoint, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
}

export function put(endpoint: string, body: object, token?: string) {
  const config = buildRequestConfig(token);
  return tryFetch(baseURL + endpoint, {
    method: 'PUT',
    body: JSON.stringify(body),
    ...config
  });
}

export function get(endpoint: string, token?: string) {
  const config = buildRequestConfig(token);
  return tryFetch(baseURL + endpoint, {
    method: 'GET',
    ...config
  });
}

export function del(endpoint: string, token?: string) {
  const config = buildRequestConfig(token);
  return tryFetch(baseURL + endpoint, {
    method: 'DELETE',
    ...config
  });
}

type getParamObjType = { [key: string]: string | number };

export function constructGetParameters(params: getParamObjType) {
  return Object.keys(params).reduce((accumulator, current, idx) => {
    return (
      accumulator +
      (idx === 0 ? '&' : '?') +
      (params[current] ? `${current}=${params[current]}` : '')
    );
  }, '');
}

export function errorTranslate(errTag: string, lang: string) {
  if (!(lang in errMap)) lang = 'en'; // use English if unsupported language
  return errMap[lang][errTag] || 'Unknown Error!';
}

type errMapType = { [key: string]: { [key: string]: string } };

const errMap: errMapType = {
  en: {
    missingField: 'Field missing from request: ',
    badValue: 'Field has bad value: ',
    notFound: 'Entity not present in DB',
    badLogin: 'Email/password combination invalid',
    dupEmail: 'Email duplicates an existing email',
    forbiddenRole: 'Role specified is not permitted.',
    noOldPwd: 'Change of password requires an old password',
    oldPwdMismatch: 'Old password that was provided is incorrect.',
    forbiddenField: 'Field in body not allowed.',
    queryFailed: 'Query failed (server problem).',
    notOwner: 'Authenticated user is not owner of content item.'
  }
};
