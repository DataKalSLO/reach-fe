import { PayloadDataset, Metadata, Dataset, Column } from './types';

/*
 * Creates the Column objects for each of the columns specified
 * in the meta data. These are aggregated to form a Dataset object.
 */
export function createDataset(metadata: Metadata): Dataset {
  const dataset: Dataset = { name: metadata.tableName, columns: [] };

  // create the Column objects
  metadata.columnNames.forEach(columnName => {
    const column: Column = { name: columnName, values: [] };
    dataset.columns.push(column);
  });

  return dataset;
}

/*
 * Convert a PayloadDataset To Dataset
 * This approach strongly depends on two assumptions.
 * 1. only numbers and strings will appear as values
 *    (may add support for Date later)
 * 2. the column names, column types, and the values in a row are all
 *    in order
 */
export function convertToDataset(
  metadata: Metadata,
  payloadDataset: PayloadDataset
): Dataset {
  const dataset = createDataset(metadata);

  // populate the Column objects
  payloadDataset.data.forEach(payloadRow => {
    payloadRow.forEach((value, index) => {
      // 2nd assumption must be true for indexing to work
      dataset.columns[index].values.push(value);
    });
  });

  return dataset;
}

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
