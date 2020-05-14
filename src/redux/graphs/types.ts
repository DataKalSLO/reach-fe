import * as consts from './constants';

/*
 * The following type aliases/interfaces are used to create the
 * initial state of the graph store.
 */

export interface GraphRecord {
  id: string;
  options: Highcharts.Options;
}

export interface GraphState {
  graphs: GraphRecord[];
  initiatives: InitiativeGraphs;
}

// Maps an industry to an array of graphs
export interface InitiativeGraphs {
  [consts.INDUSTRY]: Highcharts.Options[];
  [consts.DEMOGRAPHICS]: Highcharts.Options[];
  [consts.ASSETS]: Highcharts.Options[];
  [consts.EDUCATION]: Highcharts.Options[];
  [consts.HOUSING]: Highcharts.Options[];
  [consts.HEALTH]: Highcharts.Options[];
}

/*
 * The following type aliases/interfaces are used to create the
 * actions for the reducer.
 */

export interface AddGraphsForInitiativeAction {
  type: typeof consts.ADD_GRAPH_FOR_INITIATIVE;
  payload: string;
}

export interface DuplicateGraphAction {
  type: typeof consts.DUPLICATE_GRAPH;
  payload: Highcharts.Options;
}

export interface UpdateGraphAction {
  type: typeof consts.UPDATE_GRAPH;
  payload: GraphRecord;
}

export interface DeleteGraphAction {
  type: typeof consts.DELETE_GRAPH;
  payload: string;
}

export type GraphActionTypes =
  | AddGraphsForInitiativeAction
  | DuplicateGraphAction
  | UpdateGraphAction
  | DeleteGraphAction;

/*
 * The following type aliases/interfaces are used to restrict a
 * string to the 5 initiative names.
 */

export const initiativeNames = [
  consts.INDUSTRY,
  consts.DEMOGRAPHICS,
  consts.ASSETS,
  consts.EDUCATION,
  consts.HOUSING,
  consts.HEALTH
] as const;

export type InitiativeLiteral = typeof initiativeNames[number];
