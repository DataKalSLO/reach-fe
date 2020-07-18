import { uuid } from 'uuidv4';
import { ERROR, ERROR_SEVERITY, SUCCESS, SUCCESS_SEVERITY } from './constants';
import {
  ShowFailureStatusMessageAction,
  ShowSuccessStatusMessageAction
} from './types';

export function showSuccessNotification(
  message: string
): ShowSuccessStatusMessageAction {
  return {
    type: SUCCESS,
    payload: {
      actionId: uuid(),
      severity: SUCCESS_SEVERITY,
      message: message,
      show: true
    }
  };
}
