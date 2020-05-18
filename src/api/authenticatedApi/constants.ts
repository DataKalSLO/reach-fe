export const UNAUTHORIZED_OPERATION_ERROR = 'UNAUTHORIZED_OPERATION_ERROR';

const UNAUTHORIZED_OPERATION_ERROR_MESSAGE =
  'Operation requires authentication token. Redirecting to login.';

export const UnauthorizedAOperationError = {
  name: UNAUTHORIZED_OPERATION_ERROR,
  message: UNAUTHORIZED_OPERATION_ERROR_MESSAGE
};

export const CONFIRM_REDIRECT_TO_LOGIN_PROMPT =
  'An account is required to proceed. Would you like to login?';
