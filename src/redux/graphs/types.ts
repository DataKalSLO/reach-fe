import * as cnst from './constants';

/*
 * The following type aliases/interfaces are used to create the
 * intial state of the store.
 */

export interface GraphState {
  graphs: [string, Highcharts.Options][];
  initiatives: InitiativeGraphs;
  isEditting: boolean;
}

export interface InitiativeGraphs {
  [cnst.INDUSTRY]: Highcharts.Options[];
  [cnst.DEMOGRAPHICS]: Highcharts.Options[];
  [cnst.ASSETS]: Highcharts.Options[];
  [cnst.EDUCATION]: Highcharts.Options[];
  [cnst.HOUSING]: Highcharts.Options[];
}

/*
 * The following type aliases/interfaces are used to create the
 * actions for the reducer. A new interface has to be declared for
 * every action.
 */

export interface AddGraphAction {
  type: typeof cnst.ADD_GRAPH;
  payload: Highcharts.Options;
}

export interface AddListOfGraphsAction {
  type: typeof cnst.ADD_LIST_OF_GRAPHS;
  payload: Highcharts.Options[];
}

export interface AddGraphsForInitiativeAction {
  type: typeof cnst.ADD_GRAPH_FOR_INITIATIVE;
  payload: string;
}

export interface AddGraphWithTitleAction {
  type: typeof cnst.ADD_GRAPH_WITH_TITLE;
  payload: string;
}

export interface DuplicateGraphAction {
  type: typeof cnst.DUPLICATE_GRAPH;
  payload: string;
}

export interface DeleteGraphAction {
  type: typeof cnst.DELETE_GRAPH;
  payload: string;
}

export interface EditGraphAction {
  type: typeof cnst.EDITTING;
  payload: boolean;
}

export type GraphActionTypes =
  | AddGraphAction
  | AddListOfGraphsAction
  | AddGraphsForInitiativeAction
  | AddGraphWithTitleAction
  | DuplicateGraphAction
  | DeleteGraphAction
  | EditGraphAction;

const names = [
  cnst.INDUSTRY,
  cnst.DEMOGRAPHICS,
  cnst.ASSETS,
  cnst.EDUCATION,
  cnst.HOUSING
] as const;
export type Initiative = typeof names;
