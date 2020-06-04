import {
  ERROR_SEVERITY,
  INFO_SEVERITY,
  SHOW_SUCCESS_STATUS_MESSAGE,
  SUCCESS_SEVERITY,
  WARNING_SEVERITY
} from './constants';

export interface NotificationsState {
  actionStatus: ActionStatus;
}

/*
 * The following type aliases/interfaces are used to
 * set the Snackbar and show a status message.
 *  - see src/common/component/Snackbar.ts
 */
export interface ActionStatus {
  actionId: string;
  severity: StatusSeverity;
  message: string;
  show: boolean;
}

export type StatusSeverity =
  | typeof SUCCESS_SEVERITY
  | typeof INFO_SEVERITY
  | typeof WARNING_SEVERITY
  | typeof ERROR_SEVERITY
  | undefined;

/*
 * The following type aliases/interfaces are used to create the
 * actions for the reducer.
 */
export interface ShowSuccessStatusMessageAction {
  type: typeof SHOW_SUCCESS_STATUS_MESSAGE;
  payload: ActionStatus | undefined;
}

export type NotificationActionTypes = ShowSuccessStatusMessageAction;
