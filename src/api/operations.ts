import { UNAUTHORIZED_OPERATION_ERROR } from './authenticatedApi/constants';

export async function callActionAndAlertOnError<R>(
  action: () => Promise<R>,
  successMessage: string,
  failureMessage: string
): Promise<R> {
  return await action()
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
