import {
  sampleMetadataPayload,
  sampleDatasetPayload,
  sampleDatasetFormatted,
  convertedTypes
} from './testing_data';
import { createDataset, convertToDataset } from '../utilities';

/*
 *  Test the Dataset Conversion Functions
 */

describe('Dataset Conversion', () => {
  // initial dataset construction
  const emptyDataset = createDataset(sampleMetadataPayload[0]);

  // dataset population
  const convertedDataset = convertToDataset(
    sampleMetadataPayload[0],
    sampleDatasetPayload
  );

  it('should create an empty Dataset', () => {
    const numRows = emptyDataset
      .map(column => column.values.length)
      .reduce((acc, val) => {
        return acc + val;
      }, 0);
    expect(numRows).toEqual(0);
  });
  it('should have the same number of columns as the metadata', () => {
    expect(emptyDataset.length).toEqual(
      sampleMetadataPayload[0].columnNames.length
    );
  });
  it('should convert the payload to a Dataset', () => {
    expect(convertedDataset).toEqual(sampleDatasetFormatted);
  });
  it('should create the same types as metadata', () => {
    const valueTypes = convertedDataset.map(column => typeof column.values[0]);
    expect(valueTypes).toEqual(convertedTypes);
  });
});
