import { ExploreState, ExploreActionType } from './types';
import {
  FETCH_ALL_RESULTS,
  FETCH_TOP_RESULTS,
  FETCH_ALL_STORIES
} from './constants';
import { Story } from './types';

const initialExploreState: ExploreState = {
  data: [{
    id: '',
    userID: '',
    title: '',
    description: '',
    storyBlocks: []
  }] as Array<Story>
};

export function exploreReducer(
  state = initialExploreState,
  action: ExploreActionType
): ExploreState {
  switch (action.type) {
    case FETCH_ALL_STORIES:
      return action.payload;
    // case FETCH_ALL_RESULTS:
    //   return action.payload;
    // case FETCH_TOP_RESULTS:
    //   return action.payload;
    default:
      return state;
  }
}
