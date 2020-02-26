import { VizActionTypes, VizState } from './types';
import { FETCH_ALL_METADATA, FETCH_ENTIRE_DATASET } from './constants';

const initialState: VizState = {
  metadataForAllDatasets: [],
  dataset: []
};

export function vizReducer(
  state = initialState,
  action: VizActionTypes
): VizState {
  switch (action.type) {
    case FETCH_ALL_METADATA:
      return {
        ...state,
        metadataForAllDatasets: action.payload
      };
    case FETCH_ENTIRE_DATASET:
      return {
        ...state,
        dataset: action.payload
      };
    default:
      return state;
  }
}
