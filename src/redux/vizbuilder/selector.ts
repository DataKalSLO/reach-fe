import { RootState } from '../index';

export const getVizbuilder = (store: RootState) => store.vizbuilder;
export const getAllMetaData = (store: RootState) =>
  store.vizbuilder.metadataForAllDatasets;
export const getDatasetTableNames = (store: RootState) =>
  store.vizbuilder.datasetTableNames;
