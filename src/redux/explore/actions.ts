import { FETCH_ALL_STORIES } from './constants';
import { Dispatch } from 'redux';
import { get } from '../../api/base';
import { Story } from '../story/types';

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
    payload: { data: JSON.parse(json) }
  };
}

function stringToStoryList(json: string) {
  return {
  }
}
