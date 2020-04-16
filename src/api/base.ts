import { Dispatch } from 'redux';

const baseURL = 'http://localhost:5000/';

const esURL =
  'https://search-hourglass-search-test-boatibipr2tvrekti6tuz7pghi.us-east-2.es.amazonaws.com/';

const headers = new Headers();
headers.set('Content-Type', 'application/JSON');

const credentials: RequestCredentials = 'include';

const reqConf = {
  headers: headers,
  credentials: credentials
};

async function tryFetch(url: string, request: RequestInit) {
  const response = await fetch(url, request);
  const body = await response.json();
  if (response.ok) {
    return body;
  } else {
    throw errorTranslate(body.tag, navigator.language);
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

export function post(endpoint: string, body: object) {
  return tryFetch(baseURL + endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
    ...reqConf
  });
}

// TEMPORARY: will access ES index from backend in future, for now accessing ES directly from client
export function esPost(endpoint: string, body: object) {
  return tryFetch(esURL + endpoint, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
}

export function put(endpoint: string, body: object) {
  return tryFetch(baseURL + endpoint, {
    method: 'PUT',
    body: JSON.stringify(body),
    ...reqConf
  });
}

export function get(endpoint: string) {
  return tryFetch(baseURL + endpoint, {
    method: 'GET',
    ...reqConf
  });
}

export function del(endpoint: string) {
  return tryFetch(baseURL + endpoint, {
    method: 'DELETE',
    ...reqConf
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
    queryFailed: 'Query failed (server problem).'
  }
};
