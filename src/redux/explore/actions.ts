import { FETCH_ALL_STORIES } from './constants';
import { Story } from '../story/types';
import { Dispatch } from 'redux';
import { get } from '../../api/base';

// export function topResultsQuery(query: string, json : string) {
//     return {
//         type: FETCH_TOP_RESULTS,
//         payload: {query : query, data: json}
//     };
// }

// export function allResultsQuery(query: string, json : string) {
//     return {
//         type: FETCH_ALL_RESULTS,
//         payload: {query : query, data: json}
//     };
// }

export function fetchAllStories() {
  return async (dispatch: Dispatch) => {
    const storyData = await get('https://api-staging.joinreach.org/story');
    dispatch(receiveAllStories(storyData));
  };
}

export function receiveAllStories(json: string) {
  return {
    type: FETCH_ALL_STORIES,
    payload: { query: '', data: mapStories(json) }
  };
}

export function mapStories(json: string): Story[] {
  return JSON.parse(json.toString()) as Story[];
}
