import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { MapState } from 'react-map-gl';
import { combineReducers } from 'redux';
import { graphReducer } from './graphs/reducer';
import { GraphState } from './graphs/types';
import { userReducer } from './login/reducer';
import { User } from './login/types';
import { mapReducer } from './map/reducer';
import { sampleReducer } from './sample/reducer';
import { Sample } from './sample/types';
import { storyReducer } from './story/reducer';
import { Story } from './story/types';
import { storyBuilderReducer } from './storybuilder/reducer';
import { StoryBuilderState } from './storybuilder/types';
import { vizReducer } from './vizbuilder/reducer';
import { VizState } from './vizbuilder/types';

function createRootReducer(history: History) {
  return combineReducers({
    sample: sampleReducer,
    story: storyReducer,
    storybuilder: storyBuilderReducer,
    user: userReducer,
    graph: graphReducer,
    vizbuilder: vizReducer,
    router: connectRouter(history),
    map: mapReducer
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
  map: MapState;
}

export default createRootReducer;
