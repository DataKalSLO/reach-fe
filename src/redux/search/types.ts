export const REQUEST_SEARCH_RESULTS = 'REQUEST_SEARCH_RESULTS';
export const RECEIVE_SEARCH_RESULTS = 'RECEIVE_SEARCH_RESULTS';

export interface SearchState {
  qry: string;
  hits: Array<ElasticSearchResultObject>;
  isFetching: boolean;
}

export interface RequestSearchResultsAction {
  type: typeof REQUEST_SEARCH_RESULTS;
  payload: string;
}

export interface ReceiveSearchResultsAction {
  type: typeof RECEIVE_SEARCH_RESULTS;
  payload: Array<ElasticSearchResultObject>;
}

interface ElasticSearchSourceObject {
  title: string;
}

export interface ElasticSearchResultObject {
  _index: string;
  _type: string;
  _id: string;
  _score: number;
  _source: ElasticSearchSourceObject;
}

interface ElasticSearchHitsObject {
  hits: Array<ElasticSearchResultObject>;
  max_score: number;
}

interface ElasticSearchShardsObject {
  failed: number;
  skipped: number;
  successful: number;
  total: number;
}

export interface ElasticSearchResponseObject {
  hits: ElasticSearchHitsObject;
  timed_out: boolean;
  took: number;
  _shards: ElasticSearchShardsObject;
}

// used by reducer function (reducer.ts)
export type SearchActionType =
  | RequestSearchResultsAction
  | ReceiveSearchResultsAction;
