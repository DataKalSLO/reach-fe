import { isUndefined } from 'util';
import { uuid } from 'uuidv4';
import { ERROR, SUCCESS } from './constants';
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
    case SUCCESS:
    case ERROR:
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
