import { ExploreState, ExploreActionType } from './types';
import { FETCH_ALL_STORIES } from './constants';
import { StoryBlockType } from '../story/types';

const initialExploreState: ExploreState = {
  data: [{
    id: '',
    userID: '',
    title: '',
    description: '',
    storyBlocks: []
  }]};

export function exploreReducer(
  state = initialExploreState,
  action: ExploreActionType
): ExploreState {
  switch (action.type) {
    case FETCH_ALL_STORIES:
      return {data : action.payload.data}
    // case FETCH_TOP_RESULTS:
    //   return action.payload;
    default:
      return state;
  }
}
