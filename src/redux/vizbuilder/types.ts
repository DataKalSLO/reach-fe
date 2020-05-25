import { FETCH_ALL_METADATA } from './constants';

/*
 * The following type aliases/interfaces are used to create a generic
 * dataset object. A PayloadDataset is retrieved from an API call, only
 * containing the raw values of each row. A Dataset is a properly formatted
 * dataset containing the name of the dataset and a list of columns; each
 * column has a name and a list of values. The metadata retrieved from an
 * API call will contain the metadata for every dataset (a list of Metadata).
 * - See ./utilities/convertToDataset for more information on how the
 *   dataset conversion works.
 */

export type DataValue = string | number | Date;

export interface GeoLocation {
  name: string;
  pointId: number;
}

export enum GeoTypesEnum {
  area = 'area',
  location = 'location'
}

export type GeoTypes = keyof typeof GeoTypesEnum;

export interface Metadata {
  tableName: string;
  columnNames: string[];
  dataTypes: string[];
  geoType?: GeoTypes;
  geoMapTables?: string[];
  graphSource?: string[];
  location?: GeoLocation;
}

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
  type: typeof FETCH_ALL_METADATA;
  payload: Metadata[] | undefined;
}

export type VizActionTypes = GetAllMetadataAction;
