/*
 * This is used in the data sources form. Each
 * of the properties correspond to a form
 * selection. (e.g. selecting dataset from datasetNames)
 * The "xAxisColumnNames" and the "yAxisColumnNames" are
 * dictionaries that map a dataset to its column names.
 * Allows access to dataset column names given a dataset name.
 */
export interface DatasetsMetaData {
  datasetNames: string[];
  xAxisColumnNames: {
    [dataset: string]: string[];
  };
  yAxisColumnNames: {
    [dataset: string]: string[];
  };
}

/*
 * The data sources corresponding to one graph.
 */
export interface GraphDataFormState {
  datasetName: string;
  xAxisColumnName: string;
  yAxisColumnNames: string[];
}
