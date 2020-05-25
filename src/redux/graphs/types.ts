import * as consts from './constants';
import { GraphConfiguration } from '../../graphs/builder/types';

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

export interface DeleteGraphAction {
  type: typeof consts.DELETE_GRAPH;
  payload: string;
}

export type GraphActionTypes =
  | AddGraphsForInitiativeAction
  | DuplicateGraphAction
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

/*
 * Graph MetaData
 */
export interface GraphMetaData {
  graphId: string;
  userId: string;
  timestamp: number;
  graphTitle: string;
  snapshotUrl: string;
  dataSources: DataSource[];
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
  graphSVG: string;
  metaData: Pick<GraphMetaData, 'graphTitle' | 'dataSources' | 'graphOptions'>;
}
