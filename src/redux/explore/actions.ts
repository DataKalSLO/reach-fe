import { FETCH_ALL_STORIES } from './constants';
import { Dispatch } from 'redux';
import { Story } from './types';
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
    const storyData = await get('story');
    dispatch(receiveAllStories(JSON.stringify(storyData)));
  };
}

export function receiveAllStories(json: string) {
  return {
    type: FETCH_ALL_STORIES,
    payload: { query: '', data: JSON.parse(json) as Story[] }
  };
}
