import { ApiGraphConfirmationResponse } from '../../api/graphs/types';
import { GraphData, GraphMetaData } from '../graphs/types';
import {
  DELETE_GRAPH,
  DUPLICATE_GRAPH,
  GET_ALL_USER_GRAPHS,
  GET_DEFAULT_GRAPHS_FOR_CATEGORY,
  GET_GRAPH,
  SAVE_GRAPH,
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
  isCreating: boolean;
}

export interface Graph {
  graphMetaData: GraphMetaData;
  graphData: GraphData;
}

export interface GraphWithIndex {
  graph: Graph;
  index: number;
}

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
  payload: Graph | undefined;
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

export interface DuplicateGraphAction {
  type: typeof DUPLICATE_GRAPH;
  payload: GraphWithIndex;
}

export interface ToggleCreateGraphAction {
  type: typeof TOGGLE_CREATE_GRAPH;
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
  | DuplicateGraphAction
  | ToggleCreateGraphAction;
