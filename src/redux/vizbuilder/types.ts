import { FETCH_ENTIRE_DATASET, FETCH_ALL_METADATA } from './constants';

/*
 * The following type aliases/interfaces are used to create a generic
 * dataset object. A PayloadDataset is retrieved from an API call, only
 * containing the raw values of each row. A Dataset is a properly formatted
 * dataset containing a list of columns; each column has a name and a list
 * of values. TODO: ADD comment for Metadata
 * - See ./utilities/convertToDataset for more information on how the
 *   conversion works.
 */

export type DataValue = string | number;

export interface Metadata {
  name: string;
  columnNames: string[];
  columnTypes: string[];
}

export interface PayloadRow {
  values: DataValue[];
}

export type PayloadDataset = PayloadRow[];

export interface Column {
  name: string;
  values: DataValue[];
}

export type Dataset = Column[];

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
 * actions for the reducer.
 */

export interface FetchMetadataAction {
  type: typeof FETCH_ALL_METADATA;
  payload: Metadata[];
}

export interface FetchDatasetAction {
  type: typeof FETCH_ENTIRE_DATASET;
  payload: Dataset;
}

export type VizActionTypes = FetchMetadataAction | FetchDatasetAction;
