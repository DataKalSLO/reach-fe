import {
  RequestSearchResultsAction,
  ReceiveSearchResultsAction,
  REQUEST_SEARCH_RESULTS,
  RECEIVE_SEARCH_RESULTS,
  ElasticSearchResultObject,
  ElasticSearchResponseObject
} from './types';
import { esQuery } from '../../api/search';
import { Dispatch } from 'redux';

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

export function fetchSearchResults(qry: string) {
  return async (dispatch: Dispatch) => {
    dispatch(requestSearchResults(qry));
    return esQuery(qry).then((res: ElasticSearchResponseObject) => {
      dispatch(receiveSearchResults(res.hits.hits));
    });
  };
}
