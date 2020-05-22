import {
  SearchActionType,
  SearchState,
  REQUEST_SEARCH_RESULTS,
  RECEIVE_SEARCH_RESULTS
} from './types';

const initialSearchState = {
  qry: '',
  hits: [],
  isFetching: false
};

export function searchReducer(
  state = initialSearchState,
  action: SearchActionType
): SearchState {
  switch (action.type) {
    case REQUEST_SEARCH_RESULTS:
      return Object.assign({}, state, {
        qry: action.payload,
        isFetching: true
      });
    case RECEIVE_SEARCH_RESULTS:
      return Object.assign({}, state, {
        hits: action.payload,
        isFetching: false
      });
    default:
      return state;
  }
}
