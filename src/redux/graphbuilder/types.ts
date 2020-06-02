import { ApiGraphConfirmationResponse } from '../../api/graphs/types';
import { GraphData, GraphMetaData } from '../graphs/types';
import {
  CREATE_LOCAL_GRAPH,
  DELETE_GRAPH,
  DELETE_LOCAL_GRAPH,
  DUPLICATE_GRAPH,
  FETCH,
  GET_ALL_USER_GRAPHS,
  GET_DEFAULT_GRAPHS_FOR_CATEGORY,
  GET_GRAPH,
  SAVE_GRAPH,
  SET_ACTION_STATUS,
  TOGGLE_CREATE_GRAPH,
  UPDATE_GRAPH,
  UPDATE_LOCAL_GRAPH
} from './constants';

/*
 * The following type aliases/interfaces are used to create the
 * initial state of the graph store.
 */
export interface GraphBuilderState {
  graphs: Graph[];
  actionStatus: ActionStatus;
  isCreating: boolean;
  isFetching: boolean;
}

export interface ActionStatus {
  actionId: string;
  severity: StatusSeverity;
  message: string;
  show: boolean;
}

export interface Graph {
  graphMetaData: GraphMetaData;
  graphData: GraphData;
  graphCategory?: string;
}

export interface GraphWithIndex {
  graph: Graph | undefined;
  index: number;
}

export type StatusSeverity =
  | 'success'
  | 'info'
  | 'warning'
  | 'error'
  | undefined;

/*
 * The following type aliases/interfaces are used to create the
 * actions for the reducer.
 */

export interface SaveGraphAction {
  type: typeof SAVE_GRAPH;
  payload: Graph | undefined;
}

export interface UpdateGraphAction {
  type: typeof UPDATE_GRAPH;
  payload: Graph | undefined;
}

export interface DeleteGraphAction {
  type: typeof DELETE_GRAPH;
  payload: ApiGraphConfirmationResponse | undefined;
}

export interface GetGraphAction {
  type: typeof GET_GRAPH;
  payload: GraphWithIndex;
}

export interface GetAllUserGraphsAction {
  type: typeof GET_ALL_USER_GRAPHS;
  payload: Graph[] | undefined;
}

export interface GetDefaultGraphsForCategoryAction {
  type: typeof GET_DEFAULT_GRAPHS_FOR_CATEGORY;
  payload: Graph[] | undefined;
}

export interface UpdateLocalGraph {
  type: typeof UPDATE_LOCAL_GRAPH;
  payload: Graph | undefined;
}

export interface CreateLocalGraph {
  type: typeof CREATE_LOCAL_GRAPH;
  payload: Graph | undefined;
}

export interface DuplicateGraphAction {
  type: typeof DUPLICATE_GRAPH;
  payload: GraphWithIndex;
}

export interface DeleteLocalGraph {
  type: typeof DELETE_LOCAL_GRAPH;
  payload: number;
}

export interface ToggleCreateGraphAction {
  type: typeof TOGGLE_CREATE_GRAPH;
  payload: undefined;
}

export interface SetActionStatus {
  type: typeof SET_ACTION_STATUS;
  payload: ActionStatus;
}

export interface FetchAction {
  type: typeof FETCH;
  payload: undefined;
}

export type GraphActionTypes =
  | SaveGraphAction
  | UpdateGraphAction
  | DeleteGraphAction
  | GetGraphAction
  | GetAllUserGraphsAction
  | GetDefaultGraphsForCategoryAction
  | UpdateLocalGraph
  | CreateLocalGraph
  | DuplicateGraphAction
  | DeleteLocalGraph
  | ToggleCreateGraphAction
  | SetActionStatus
  | FetchAction;
