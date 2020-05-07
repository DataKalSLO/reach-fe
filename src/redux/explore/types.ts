import { FETCH_ALL_STORIES } from './constants';
import { Story } from '../story/types';

//Search
export interface ExploreState {
  data: Array<Story>;
}

// NOT IMPLEMENTED YET //

// export interface FetchTopResults {
//   type: typeof FETCH_TOP_RESULTS;
//   payload: { data: Array<Story> };
// }

export interface FetchAllStories {
  type: typeof FETCH_ALL_STORIES;
  payload: { data: Array<Story> };
}

export type ExploreActionType = FetchAllStories;
