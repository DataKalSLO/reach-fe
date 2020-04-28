import { UPDATE_MAP, CLEAR_MAP, MapActionTypes, Map } from './types';
import { Dispatch } from 'redux';

export function updateMapAction(map: Map): MapActionTypes {
  return {
    type: UPDATE_MAP,
    payload: map
  };
}

export function clearMapAction(): MapActionTypes {
  return { type: CLEAR_MAP };
}

export function updateWithThunk(text: string) {
  return async (dispatch: Dispatch) => {
    return updateMapAction({ text });
  };
}
