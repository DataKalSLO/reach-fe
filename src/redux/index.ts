import { combineReducers } from 'redux';
import { RouterState, connectRouter } from 'connected-react-router';
import { History } from 'history';
import { User } from './login/types';
import { userReducer } from './login/reducer';

function createRootReducer(history: History) {
  return combineReducers({
    user: userReducer,
    router: connectRouter(history)
  });
}

export interface RootState {
  user: User;
  router: RouterState;
}

export default createRootReducer;
