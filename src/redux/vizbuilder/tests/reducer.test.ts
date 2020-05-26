import { getAllMetadataAction } from '../actions';
import { vizReducer } from '../reducer';
import { VizState } from '../types';
import { sampleMetadataPayload } from './testing_data';

describe('Vizbuilder Reducer', () => {
  const initialState: VizState = {
    metadataForAllDatasets: []
  };

  const initialStateWithMetadata = {
    metadataForAllDatasets: sampleMetadataPayload
  };

  it('should update the metadata of the state', () => {
    expect(
      vizReducer(initialState, getAllMetadataAction(sampleMetadataPayload))
    ).toEqual(initialStateWithMetadata);
  });
});
