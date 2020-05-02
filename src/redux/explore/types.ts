import { Story } from '../story/types';
import {
  FETCH_ALL_RESULTS,
  FETCH_TOP_RESULTS,
  FETCH_ALL_STORIES
} from './constants';

//Search
export interface ExploreState {
  query: string;
  data: Array<Story>;
}

export interface FetchAllResults {
  type: typeof FETCH_ALL_RESULTS;
  payload: { query: string; data: Array<Story> };
}

export interface FetchTopResults {
  type: typeof FETCH_TOP_RESULTS;
  payload: { query: string; data: Array<Story> };
}

export interface FetchAllStories {
  type: typeof FETCH_ALL_STORIES;
  payload: { query: string; data: Array<Story> };
}

export type ExploreActionType =
  | FetchAllResults
  | FetchTopResults
  | FetchAllStories;
