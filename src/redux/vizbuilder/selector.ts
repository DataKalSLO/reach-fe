import { RootState } from '../index';

export const getVizbuilder = (store: RootState) => store.vizbuilder;
export const getDatasetTableNames = (store: RootState) =>
  store.vizbuilder.datasetTableNames;
