import { FETCH_ALL_METADATA } from './constants';
import { VizActionTypes, VizState } from './types';
import { isUndefined } from 'util';

const initialState: VizState = {
  metadataForAllDatasets: []
};

export function vizReducer(
  state = initialState,
  action: VizActionTypes
): VizState {
  switch (action.type) {
    case FETCH_ALL_METADATA:
      return {
        ...state,
        metadataForAllDatasets: !isUndefined(action.payload)
          ? action.payload
          : []
      };
    default:
      return state;
  }
}
