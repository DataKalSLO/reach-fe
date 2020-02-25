import { PayloadDataset, Metadata, Dataset, Column } from './types';

/*
 * Creates the Column objects for each of the columns specified
 * in the meta data. These are aggregated to form a Dataset object.
 */
export function createDataset(metadata: Metadata): Dataset {
  const dataset: Dataset = [];

  // create the Column objects
  metadata.columnNames.forEach(columnName => {
    const column: Column = { name: columnName, values: [] };
    dataset.push(column);
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
  payloadDataset.forEach(payloadRow => {
    payloadRow.values.forEach((value, index) => {
      // 2nd assumption must be true for indexing to work
      dataset[index].values.push(value);
    });
  });

  return dataset;
}
