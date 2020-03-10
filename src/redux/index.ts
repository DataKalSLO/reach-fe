import { combineReducers } from 'redux';
import { RouterState, connectRouter } from 'connected-react-router';
import { History } from 'history';
import { User } from './login/types';
import { userReducer } from './login/reducer';
import { Sample } from './sample/types';
import { sampleReducer } from './sample/reducer';
import { StoryState } from '../stories/StoryTypes';
import { storyReducer } from './story/reducer';
import { VizState } from './vizbuilder/types';
import { vizReducer } from './vizbuilder/reducer';

function createRootReducer(history: History) {
  return combineReducers({
    sample: sampleReducer,
    story: storyReducer,
    user: userReducer,
    vizbuilder: vizReducer,
    router: connectRouter(history)
  });
}

export interface RootState {
  sample: Sample;
  story: StoryState;
  user: User;
  vizbuilder: VizState;
  router: RouterState;
}

export default createRootReducer;
