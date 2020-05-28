import { isDefinedElse } from '../../graphs/forms/utilities';
import { GET_ALL_METADATA } from './constants';
import { VizActionTypes, VizState } from './types';

const initialState: VizState = {
  metadataForAllDatasets: []
};

export function vizReducer(
  state = initialState,
  action: VizActionTypes
): VizState {
  switch (action.type) {
    case GET_ALL_METADATA:
      return {
        ...state,
        metadataForAllDatasets: isDefinedElse(action.payload, [])
      };
    default:
      return state;
  }
}
