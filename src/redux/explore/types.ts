import { FETCH_ALL_STORIES } from './constants';

export interface Story {
  id: string;
  userID: string;
  title: string;
  description: string;
  storyBlocks: Array<string>;
}
//Search
export interface ExploreState {
  data: Array<Story>;
}

// NOT IMPLENTED YET //
// export interface FetchAllResults {
//   type: typeof FETCH_ALL_RESULTS;
//   payload: { data: Array<Story> };
// }

// export interface FetchTopResults {
//   type: typeof FETCH_TOP_RESULTS;
//   payload: { data: Array<Story> };
// }

export interface FetchAllStories {
  type: typeof FETCH_ALL_STORIES;
  payload: { data: Array<Story> };
}

export type ExploreActionType = FetchAllStories;
