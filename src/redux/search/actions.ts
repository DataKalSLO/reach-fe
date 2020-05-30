import { Dispatch } from 'redux';
import { esQuery } from '../../api/search';
import {
  ElasticSearchResponseObject,
  ElasticSearchResultObject,
  ReceiveSearchResultsAction,
  RECEIVE_SEARCH_RESULTS,
  RequestSearchResultsAction,
  REQUEST_SEARCH_RESULTS,
  SearchIndexFilter
} from './types';

function requestSearchResults(qry: string): RequestSearchResultsAction {
  return {
    type: REQUEST_SEARCH_RESULTS,
    payload: qry
  };
}

function receiveSearchResults(
  data: Array<ElasticSearchResultObject>
): ReceiveSearchResultsAction {
  return {
    type: RECEIVE_SEARCH_RESULTS,
    payload: data
  };
}

export function fetchSearchResults(qry: string, index: SearchIndexFilter) {
  return async (dispatch: Dispatch) => {
    dispatch(requestSearchResults(qry));
    return esQuery(qry, index).then((res: ElasticSearchResponseObject) => {
      dispatch(receiveSearchResults(res.hits.hits));
    });
  };
}
