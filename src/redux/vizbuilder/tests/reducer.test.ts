import { vizReducer } from '../reducer';
import {
  sampleMetadataPayload,
  sampleDatasetFormatted,
  sampleDatasetPayload
} from './testing_data';
import { VizState } from '../types';
import { metadataAction, datasetAction } from '../actions';

describe('Vizbuilder Reducer', () => {
  const initialState: VizState = {
    metadataForAllDatasets: [],
    dataset: { name: '', columns: [] }
  };

  const initialStateWithMetadata = {
    metadataForAllDatasets: sampleMetadataPayload,
    dataset: { name: '', columns: [] }
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
        datasetAction(sampleMetadataPayload[0].tableName, sampleDatasetPayload)
      )
    ).toEqual(initialStateWithDataset);
  });
});
