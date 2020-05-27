import { ApiGraphConfirmationResponse } from '../../api/graphs/types';
import { GraphConfiguration } from '../../graphs/builder/types';
import {
  ASSETS,
  DELETE_GRAPH,
  DEMOGRAPHICS,
  DUPLICATE_GRAPH,
  EDUCATION,
  HEALTH,
  HOUSING,
  INDUSTRY
} from '../graphs/constants';
import { DataValue } from '../vizbuilder/types';
import {
  CREATE_GRAPH,
  EDIT_GRAPH,
  GET_ALL_USER_GRAPHS,
  GET_DEFAULT_GRAPHS_FOR_CATEGORY,
  GET_GRAPH,
  HIDE_GRAPH,
  SAVE_GRAPH,
  SYNC_GRAPH,
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
  isEditing: boolean;
  is3D: boolean;
  isHidden: boolean;
}

export interface GraphData {
  xAxisData: DataValue[];
  yAxisData: DataValue[][];
  stackData?: DataValue[];
}

/*
 * Graph MetaData
 */
export interface BaseGraphMetaData {
  graphId: string;
  userId: string;
  timestamp: number;
  graphTitle: string;
  snapshotUrl: string;
  dataSources: DataSource[];
}

export interface GraphMetaData extends BaseGraphMetaData {
  graphOptions: PartialGraphConfigurationWithoutData;
}

export enum DataSourceTypesEnum {
  X_AXIS = 'X_AXIS',
  Y_AXIS = 'Y_AXIS',
  STACK = 'STACK'
}

export type DataSourceType = keyof typeof DataSourceTypesEnum;

export interface DataSource {
  datasetName: string;
  columnNames: string[];
  seriesType: DataSourceType;
}

export type PartialGraphConfigurationWithoutData = Omit<
  GraphConfiguration,
  'title' | 'xAxisData' | 'yAxisData' | 'stackData'
>;

export interface GraphMetaDataApiPayload {
  graphId: string | null;
  graphCategory: string | null;
  graphTitle: string;
  dataSources: DataSource[];
  graphOptions: PartialGraphConfigurationWithoutData;
  graphSVG: string;
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

export interface EditGraphAction {
  type: typeof EDIT_GRAPH;
  payload: number;
}

export interface UpdateLocalGraph {
  type: typeof UPDATE_LOCAL_GRAPH;
  payload: Graph | undefined;
}

export interface DuplicateGraphAction {
  type: typeof DUPLICATE_GRAPH;
  payload: GraphWithIndex;
}

export interface HideGraphAction {
  type: typeof HIDE_GRAPH;
  payload: string;
}

export interface CreateGraphAction {
  type: typeof CREATE_GRAPH;
  payload: undefined;
}

export interface SyncGraphAction {
  type: typeof SYNC_GRAPH;
  datasetName: string;
  columnNames: string[];
}

export type GraphActionTypes =
  | SaveGraphAction
  | UpdateGraphAction
  | DeleteGraphAction
  | GetGraphAction
  | GetAllUserGraphsAction
  | GetDefaultGraphsForCategoryAction
  | EditGraphAction
  | UpdateLocalGraph
  | DuplicateGraphAction
  | HideGraphAction
  | CreateGraphAction
  | SyncGraphAction;

/*
 * The following type aliases/interfaces are used to restrict a
 * string to the 6 initiative names.
 */
export const initiativeNames = [
  INDUSTRY,
  DEMOGRAPHICS,
  ASSETS,
  EDUCATION,
  HOUSING,
  HEALTH
] as const;

export type InitiativeLiteral = typeof initiativeNames[number];
