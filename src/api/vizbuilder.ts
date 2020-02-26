import { get } from './base';
import { METADATA_ROUTE, DATASET_ROUTE } from './constants';

export async function fetchAllMetaData() {
  return await get(METADATA_ROUTE);
}

export async function fetchEntireDataset(datasetName: string) {
  return await get(DATASET_ROUTE + datasetName);
}
