import * as consts from './constants';

/*
 * The following type aliases/interfaces are used to create the
 * initial state of the graph store.
 */

export interface GraphRecord {
  id: string;
  options: Highcharts.Options;
  //isEditing: boolean;
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
  [consts.CREATE_GRAPH]: any;
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

export interface CreatingGraphAction {
  type: typeof consts.CREATING_GRAPH;
  payload: string;
}

export interface SyncGraphAction {
  type: typeof consts.SYNC_GRAPH;
  datasetName: string,
  columnNames:string[],
}

export type GraphActionTypes =
  | AddGraphsForInitiativeAction
  | DuplicateGraphAction
  | DeleteGraphAction
  | CreatingGraphAction
  | SyncGraphAction
  | UpdateGraphAction
  | DeleteGraphAction;

/*
 * The following type aliases/interfaces are used to restrict a
 * string to the 6 initiative names.
 */

export const initiativeNames = [
  consts.INDUSTRY,
  consts.DEMOGRAPHICS,
  consts.ASSETS,
  consts.EDUCATION,
  consts.HOUSING,
  consts.HEALTH,
  consts.CREATE_GRAPH
] as const;

export type InitiativeLiteral = typeof initiativeNames[number];
