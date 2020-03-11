import { combineReducers } from 'redux';
import { RouterState, connectRouter } from 'connected-react-router';
import { History } from 'history';
import { User } from './login/types';
import { userReducer } from './login/reducer';
import { Sample } from './sample/types';
import { sampleReducer } from './sample/reducer';
import { Story } from '../stories/StoryTypes';
import { storyReducer } from './story/reducer';
import { VizState } from './vizbuilder/types';
import { vizReducer } from './vizbuilder/reducer';
import { GraphState } from './graphs/types';
import { graphReducer } from './graphs/reducer';

function createRootReducer(history: History) {
  return combineReducers({
    sample: sampleReducer,
    story: storyReducer,
    user: userReducer,
    vizbuilder: vizReducer,
    graph: graphReducer,
    router: connectRouter(history)
  });
}

export interface RootState {
  sample: Sample;
  story: Story;
  user: User;
  vizbuilder: VizState;
  graph: GraphState;
  router: RouterState;
}

export default createRootReducer;
