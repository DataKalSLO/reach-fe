import { isUndefined } from 'util';
import { uuid } from 'uuidv4';
import { SHOW_SUCCESS_STATUS_MESSAGE } from './constants';
import { NotificationActionTypes, NotificationsState } from './types';

const initialState: NotificationsState = {
  actionStatus: {
    actionId: uuid(),
    severity: undefined,
    message: '',
    show: false
  }
};

export function notificationsReducer(
  state = initialState,
  action: NotificationActionTypes
): NotificationsState {
  switch (action.type) {
    case SHOW_SUCCESS_STATUS_MESSAGE:
      return {
        ...state,
        actionStatus: isUndefined(action.payload)
          ? state.actionStatus
          : action.payload
      };
    default:
      return state;
  }
}
