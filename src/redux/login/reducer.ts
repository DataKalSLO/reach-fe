import { LOGIN, LOGOUT, UserActionTypes, User, UPDATE_SETTINGS } from './types';
import { UNDEFINED_USER, EMPTY_TOKEN } from '../../nav/constants';
import { CognitoUser } from 'amazon-cognito-identity-js';

const initialState: User = {
  email: '',
  name: '',
  role: UNDEFINED_USER,
  'custom:occupation': '',
  'custom:emailNotif': false
};

export function userReducer(
  state = initialState,
  action: UserActionTypes
): User {
  switch (action.type) {
    case LOGIN:
      return action.payload;
    case LOGOUT:
      return {
        email: '',
        name: '',
        'custom:occupation': '',
        role: UNDEFINED_USER,
        'custom:emailNotif': false
      };
    case UPDATE_SETTINGS:
      return {
        ...state,
        name: action.payload.name,
        'custom:occupation': action.payload['custom:occupation'],
        'custom:emailNotif': action.payload['custom:emailNotif']
      };
    default:
      return state;
  }
}
