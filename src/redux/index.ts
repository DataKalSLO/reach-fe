import { combineReducers } from 'redux';
import { RouterState, connectRouter } from 'connected-react-router';
import { History } from 'history';
import { User } from './login/types';
import { userReducer } from './login/reducer';
import { Sample } from './sample/types';
import { sampleReducer } from './sample/reducer';
import { storyBuilderReducer } from './storybuilder/reducer';
import { Story } from './story/types';
import { StoryBuilderState } from './storybuilder/types';
import { storyReducer } from './story/reducer';
import { GraphState } from './graphs/types';
import { graphReducer } from './graphs/reducer';
import { VizState } from './vizbuilder/types';
import { vizReducer } from './vizbuilder/reducer';

function createRootReducer(history: History) {
  return combineReducers({
    sample: sampleReducer,
    story: storyReducer,
    storybuilder: storyBuilderReducer,
    user: userReducer,
    graph: graphReducer,
    vizbuilder: vizReducer,
    router: connectRouter(history)
  });
}

export interface RootState {
  sample: Sample;
  story: Story;
  storybuilder: StoryBuilderState;
  user: User;
  graph: GraphState;
  vizbuilder: VizState;
  router: RouterState;
}

export default createRootReducer;
