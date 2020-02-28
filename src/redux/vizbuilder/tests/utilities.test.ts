import {
  sampleMetadataPayload,
  sampleDatasetPayload,
  sampleDatasetFormatted,
  sampleConvertedTypes
} from './testing_data';
import { createDataset, convertToDataset, getMetadataFor } from '../utilities';

/*
 *  Test the Dataset Conversion Functions
 */
describe('Dataset Conversion', () => {
  const emptyDataset = createDataset(sampleMetadataPayload[0]);
  const convertedDataset = convertToDataset(
    sampleMetadataPayload[0],
    sampleDatasetPayload
  );

  it('should create an empty Dataset', () => {
    const numRows = emptyDataset.columns
      .map(column => column.values.length)
      .reduce((acc, val) => {
        return acc + val;
      }, 0);
    expect(numRows).toEqual(0);
  });
  it('should contain the same name as the metadata', () => {
    expect(convertedDataset.name).toEqual(sampleMetadataPayload[0].tableName);
  });
  it('should have the same number of columns as the metadata', () => {
    expect(convertedDataset.columns.length).toEqual(
      sampleMetadataPayload[0].columnNames.length
    );
  });
  it('should convert the payload to a Dataset', () => {
    expect(convertedDataset).toEqual(sampleDatasetFormatted);
  });
  it('should create the same types as metadata', () => {
    const valueTypes = convertedDataset.columns.map(
      column => typeof column.values[0]
    );
    expect(valueTypes).toEqual(sampleConvertedTypes);
  });
});

/*
 * Test Metadata Access Functions
 */
describe('Metadata Access', () => {
  it('should retrieve the metadata for a given dataset name', () => {
    expect(
      getMetadataFor(sampleMetadataPayload[0].tableName, sampleMetadataPayload)
    ).toEqual(sampleMetadataPayload[0]);
  });
});
