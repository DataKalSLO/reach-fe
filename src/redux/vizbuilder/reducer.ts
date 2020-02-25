import { VizActionTypes, VizState } from './types'
import { FETCH_METADATA, FETCH_ENTIRE_DATASET } from './constants';

const initialState: VizState = {
  metadata: { columnNames: [], columnTypes: [] },
  dataset: []
};

export function vizReducer(
  state = initialState,
  action: VizActionTypes
): VizState {
  switch (action.type) {
    case FETCH_METADATA:
      return {
        ...state,
        metadata: action.payload
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
