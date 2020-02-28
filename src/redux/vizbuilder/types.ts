import { FETCH_ENTIRE_DATASET, FETCH_ALL_METADATA } from './constants';

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

export type DataValue = string | number;

export interface Metadata {
  tableName: string;
  columnNames: string[];
  columnTypes: string[];
}

export interface PayloadDataset {
  data: DataValue[][];
}

export interface Column {
  name: string;
  values: DataValue[];
}

export interface Dataset {
  name: string;
  columns: Column[];
}

/*
 * The following type aliases/interfaces are used to create the
 * intial state of the store.
 */

export interface VizState {
  metadataForAllDatasets: Metadata[];
  dataset: Dataset;
}

/*
 * The following type aliases/interfaces are used to create the
 * actions for the reducer. A new interface has to be declared for
 * every action.
 */

export interface FetchMetadataAction {
  type: typeof FETCH_ALL_METADATA;
  payload: Metadata[];
}

export interface FetchDatasetAction {
  type: typeof FETCH_ENTIRE_DATASET;
  datasetName: string;
  payload: PayloadDataset;
}

export type VizActionTypes = FetchMetadataAction | FetchDatasetAction;
