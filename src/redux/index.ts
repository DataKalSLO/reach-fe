import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { combineReducers } from 'redux';
import { graphReducer } from './graphs/reducer';
import { GraphState } from './graphs/types';
import { userReducer } from './login/reducer';
import { User } from './login/types';
import { sampleReducer } from './sample/reducer';
import { Sample } from './sample/types';
import { searchReducer } from './search/reducer';
import { SearchState } from './search/types';
import { storyReducer } from './story/reducer';
import { Story } from './story/types';
import { storyBuilderReducer } from './storybuilder/reducer';
import { StoryBuilderState } from './storybuilder/types';
import { vizReducer } from './vizbuilder/reducer';
import { VizState } from './vizbuilder/types';
import { graphBuilderReducer } from './graphbuilder/reducer';
import { GraphBuilderState } from './graphbuilder/types';
import { notificationsReducer } from './notifications/reducer';
import { NotificationsState } from './notifications/types';

function createRootReducer(history: History) {
  return combineReducers({
    sample: sampleReducer,
    story: storyReducer,
    storybuilder: storyBuilderReducer,
    user: userReducer,
    graph: graphReducer,
    graphbuilder: graphBuilderReducer,
    vizbuilder: vizReducer,
    notifications: notificationsReducer,
    search: searchReducer,
    router: connectRouter(history)
  });
}

export interface RootState {
  sample: Sample;
  story: Story;
  storybuilder: StoryBuilderState;
  user: User;
  graph: GraphState;
  graphbuilder: GraphBuilderState;
  vizbuilder: VizState;
  notifications: NotificationsState;
  router: RouterState;
  search: SearchState;
}

export default createRootReducer;
