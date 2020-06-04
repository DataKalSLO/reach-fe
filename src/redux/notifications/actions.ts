import { uuid } from 'uuidv4';
import { SHOW_SUCCESS_STATUS_MESSAGE, SUCCESS_SEVERITY } from './constants';
import { ShowSuccessStatusMessageAction } from './types';

/*
 * Display a status message when an operation
 * is successful
 */
export function showSuccessStatusMessage(
  operationWasSuccessful: boolean,
  message: string
): ShowSuccessStatusMessageAction {
  return {
    type: SHOW_SUCCESS_STATUS_MESSAGE,
    payload: operationWasSuccessful
      ? {
          actionId: uuid(),
          severity: SUCCESS_SEVERITY,
          message: message,
          show: true
        }
      : undefined
  };
}
