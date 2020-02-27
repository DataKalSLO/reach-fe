const baseURL = 'http://localhost:5000/';

const headers = new Headers();
headers.set('Content-Type', 'application/JSON');
headers.append('Access-Control-Allow-Origin', 'http://localhost:3000/');

const credentials: RequestCredentials = 'same-origin';
const mode: RequestMode = 'cors';

const reqConf = {
  headers: headers,
  credentials: credentials,
  mode: mode
};

type Error = { tag: string; details: string[] };

async function tryFetch(url: string, request: RequestInit) {
  const response = await fetch(url, request);
  const body = await response.json();
  if (!response.ok) {
    throw body.map((err: Error) => errorTranslate(err.tag));
  } else {
    return body;
  }
}

export function post(endpoint: string, body: object) {
  return tryFetch(baseURL + endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
    ...reqConf
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

export function constructGetParameters(params: errMapType) {
  return Object.keys(params).reduce((accumulator, current, idx) => {
    return (
      accumulator +
      (idx ? '&' : '?') +
      (params[current] ? `${current}=${params[current]}` : '')
    );
  }, '');
}

export function errorTranslate(errTag: string, lang = 'en') {
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
