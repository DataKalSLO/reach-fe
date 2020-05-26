export const REQUEST_SEARCH_RESULTS = 'REQUEST_SEARCH_RESULTS';
export const RECEIVE_SEARCH_RESULTS = 'RECEIVE_SEARCH_RESULTS';

export type SearchIndexFilter = 'GRAPHS' | 'STORIES' | 'ALL';

// State structure in Redux store
export interface SearchState {
  qry: string;
  hits: Array<ElasticSearchResultObject>;
  isFetching: boolean;
}

// Redux actions
export interface RequestSearchResultsAction {
  type: typeof REQUEST_SEARCH_RESULTS;
  payload: string;
}

export interface ReceiveSearchResultsAction {
  type: typeof RECEIVE_SEARCH_RESULTS;
  payload: Array<ElasticSearchResultObject>;
}

/*
 * The following interfaces are the default structure of the response
 * object sent by the ElasticSearch API. The meta-properties are denoted with
 * an underscore, and I ordered them in order of nesting (outside->inside)
 */

export interface ElasticSearchResponseObject {
  hits: ElasticSearchHitsObject;
  timed_out: boolean;
  took: number;
  _shards: ElasticSearchShardsObject;
}

interface ElasticSearchShardsObject {
  failed: number;
  skipped: number;
  successful: number;
  total: number;
}

interface ElasticSearchHitsObject {
  hits: Array<ElasticSearchResultObject>;
  max_score: number;
}

export interface ElasticSearchResultObject {
  _index: string;
  _type: string;
  _id: string;
  _score: number;
  _source: ElasticSearchSourceObject;
}

interface ElasticSearchSourceObject {
  title: string;
}

// used by reducer function (reducer.ts)
export type SearchActionType =
  | RequestSearchResultsAction
  | ReceiveSearchResultsAction;
