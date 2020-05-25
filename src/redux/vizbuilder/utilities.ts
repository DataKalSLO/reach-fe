import { Metadata } from './types';

/*
 * Gets the metadata for a given dataset by iterating
 * through the list of metadata.
 */
export function getMetadataFor(
  datasetName: string,
  meatadataList: Metadata[]
): Metadata {
  return meatadataList.filter(
    metadata => metadata.tableName === datasetName
  )[0];
}
