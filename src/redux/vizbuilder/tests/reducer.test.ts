import { vizReducer } from '../reducer';
import { FETCH_ALL_METADATA, FETCH_ENTIRE_DATASET } from '../constants';
import { sampleMetadataPayload, sampleDatasetFormatted } from './testing_data';
import { VizState } from '../types';

describe('Vizbuilder Reducer', () => {
  const initialState: VizState = {
    metadataForAllDatasets: [],
    dataset: []
  };

  const initialStateWithMetadata = {
    metadataForAllDatasets: sampleMetadataPayload,
    dataset: []
  };

  const initialStateWithDataset = {
    metadataForAllDatasets: sampleMetadataPayload,
    dataset: sampleDatasetFormatted
  };

  it('should update the metadata of the state', () => {
    expect(
      vizReducer(initialState, {
        type: FETCH_ALL_METADATA,
        payload: sampleMetadataPayload
      })
    ).toEqual(initialStateWithMetadata);
  });

  it('should update the dataset of the state', () => {
    expect(
      vizReducer(initialStateWithMetadata, {
        type: FETCH_ENTIRE_DATASET,
        payload: sampleDatasetFormatted
      })
    ).toEqual(initialStateWithDataset);
  });
});
