import { getMetadataFor } from '../utilities';
import { sampleMetadataPayload } from './testing_data';

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
