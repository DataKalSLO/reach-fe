import { ExploreState, ExploreActionType } from './types';
import {
  FETCH_ALL_RESULTS,
  FETCH_TOP_RESULTS,
  FETCH_ALL_STORIES
} from './constants';
import { Story } from '../story/types';

const initialExploreState: ExploreState = {
  query: '',
  data: [] as Array<Story>
};

export function exploreReducer(
  state = initialExploreState,
  action: ExploreActionType
): ExploreState {
  switch (action.type) {
    case FETCH_ALL_STORIES:
      return action.payload;
    case FETCH_ALL_RESULTS:
      return action.payload;
    case FETCH_TOP_RESULTS:
      return action.payload;
    default:
      return state;
  }
}
