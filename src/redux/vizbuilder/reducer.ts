import { isDefinedElse } from '../../graphs/forms/utilities';
import { GET_ALL_METADATA, GET_ALL_TABLE_NAMES, SYNC_GRAPH } from './constants';
import { VizActionTypes, VizState } from './types';

const initialState: VizState = {
  metadataForAllDatasets: [],
  datasetTableNames: []
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
    case GET_ALL_TABLE_NAMES:
      return {
        ...state,
        datasetTableNames: isDefinedElse(action.payload, [])
      };
    case SYNC_GRAPH:
      console.log(action);
      return state;
    default:
      return state;
  }
}
