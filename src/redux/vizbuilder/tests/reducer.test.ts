import { vizReducer } from '../reducer';
import { sampleMetadataPayload, sampleDatasetFormatted } from './testing_data';
import { VizState } from '../types';
import { metadataAction, datasetAction } from '../actions';

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
      vizReducer(initialState, metadataAction(sampleMetadataPayload))
    ).toEqual(initialStateWithMetadata);
  });

  it('should update the dataset of the state', () => {
    expect(
      vizReducer(
        initialStateWithMetadata,
        datasetAction(sampleDatasetFormatted)
      )
    ).toEqual(initialStateWithDataset);
  });
});
