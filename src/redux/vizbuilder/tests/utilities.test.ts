import {
  sampleMetadataPayload,
  sampleDatasetPayload,
  sampleDatasetFormatted,
  sampleConvertedTypes
} from './testing_data';
import {
  createDataset,
  convertToDataset,
  getMetadataFor,
  getValueType
} from '../utilities';

/*
 *  Test the Dataset Conversion Functions
 *  These set of functions take in the metadata for an individual
 *  dataset and use this to convert the dataset payload
 *  to a properly formatted dataset.
 */
describe('Dataset Conversion', () => {
  // sampleMetadataPayload is a list of metadata for each dataset
  // datasetMetada is the metadata for one dataset
  const datasetMetadata = sampleMetadataPayload[0];
  const emptyDataset = createDataset(datasetMetadata);
  const convertedDataset = convertToDataset(
    datasetMetadata,
    sampleDatasetPayload
  );

  it('should create an empty Dataset', () => {
    const numRows = emptyDataset.columns
      // iterate columns
      .map(column => column.values.length)
      // count the number of values in a column
      .reduce((acc, val) => {
        return acc + val;
      }, 0);
    expect(numRows).toEqual(0);
  });
  it('should contain the same name as the metadata', () => {
    expect(convertedDataset.name).toEqual(datasetMetadata.tableName);
  });
  it('should have the same number of columns as the metadata', () => {
    expect(convertedDataset.columns.length).toEqual(
      datasetMetadata.columnNames.length
    );
  });
  it('should convert the payload to a Dataset', () => {
    expect(convertedDataset).toEqual(sampleDatasetFormatted);
  });
  it('should create the same types as metadata', () => {
    const valueTypes = convertedDataset.columns.map(column => column.valueType);
    expect(valueTypes).toEqual(sampleConvertedTypes);
  });
});

/*
 * Test Metadata Access Functions
 */
describe('Metadata Access', () => {
  // sampleMetadataPayload is a list of metadata for each dataset
  // datasetMetada is the metadata for one dataset
  const datasetMetadata = sampleMetadataPayload[0];

  it('should retrieve the metadata for a given dataset name', () => {
    expect(
      getMetadataFor('federal_contracts_fy2019', sampleMetadataPayload)
    ).toEqual(datasetMetadata);
  });
});

/*
 * Test Value Type Getter Function
 */
describe('Value Type Getter', () => {
  it('should retrieve the correct JavaScript type for datetime', () => {
    expect(getValueType('datetime')).toEqual('date');
  });

  it('should retrieve the correct JavaScript type for string', () => {
    expect(getValueType('string')).toEqual('string');
  });

  it('should retrieve the correct JavaScript type for double', () => {
    expect(getValueType('double')).toEqual('number');
  });

  it('should retrieve the correct JavaScript type for int', () => {
    expect(getValueType('int')).toEqual('number');
  });
});
