export const NO_AUTHENTICATION_TOKEN_ERROR =
  'Action required user token. Redirecting to login';

export const NO_AUTHENTICATION_TOKEN_MESSAGE =
  'No token found. User is not signed in.';

export const UnauthorizedError = {
  name: NO_AUTHENTICATION_TOKEN_ERROR,
  message: NO_AUTHENTICATION_TOKEN_MESSAGE
};
