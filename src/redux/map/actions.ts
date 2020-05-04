import {
  UPDATE_MAP,
  CLEAR_MAP,
  MapActionTypes,
  Map,
  UPDATE_SELECTIONS,
  UPDATE_SELECTED_MARKER,
  UPDATE_COLOR_ASSOCIATION
} from './types';
import { Dispatch } from 'redux';
import { Selections, SelectedMarker, ColorAssociation } from '../../maps/types';

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

// I think these are the functions we will need?
export function updateSelections(selections: Selections) {
  return {
    type: UPDATE_SELECTIONS,
    payload: selections
  };
}

export function updateSelectedMarker(selectedMarker: SelectedMarker) {
  return {
    type: UPDATE_SELECTED_MARKER,
    payload: selectedMarker
  };
}

export function updateColorAssociation(colorAssociation: ColorAssociation) {
  return {
    type: UPDATE_COLOR_ASSOCIATION,
    payload: colorAssociation
  };
}
