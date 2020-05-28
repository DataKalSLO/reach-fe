import { GET_ALL_METADATA } from './constants';

/*
 * The following type aliases/interfaces correspond to the datasets
 * metadata retrieved the backend.
 */
export type DataValue = string | number | Date;

export interface Metadata {
  tableName: string;
  columnNames: string[];
  dataTypes: string[];
  geoType?: GeoTypes;
}

export interface GeoLocation {
  name: string;
  pointId: number;
}

export enum GeoTypesEnum {
  area = 'area',
  location = 'location'
}

export type GeoTypes = keyof typeof GeoTypesEnum;

export interface DataColumnsApiPayload {
  datasetName: string;
  columnNames: string[];
}

export interface DataColumns {
  data: DataValue[][];
}

/*
 * The following type aliases/interfaces are used to create the
 * intial state of the store.
 */

export interface VizState {
  metadataForAllDatasets: Metadata[];
}

/*
 * The following type aliases/interfaces are used to create the
 * actions for the reducer. A new interface has to be declared for
 * every action.
 */

export interface GetAllMetadataAction {
  type: typeof GET_ALL_METADATA;
  payload: Metadata[] | undefined;
}

export type VizActionTypes = GetAllMetadataAction;
