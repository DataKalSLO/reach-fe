import { UNAUTHORIZED_OPERATION_ERROR } from './authenticatedApi/constants';

export async function handleApiOperation<P, R>(
  payload: P,
  operation: (payload: P) => Promise<R>,
  successMessage: string,
  failureMessage: string
): Promise<R> {
  return await operation(payload)
    .then(res => {
      console.log(successMessage);
      return res;
    })
    .catch(e => {
      if (e.name !== UNAUTHORIZED_OPERATION_ERROR) {
        alert(failureMessage);
      }
      throw new Error(e);
    });
}
