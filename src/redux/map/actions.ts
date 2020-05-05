import {
  BoundSelection,
  HeatMapSelection,
  MarkerSelection,
  SelectedMarker
} from '../../maps/types';
import {
  UPDATE_BOUND_SELECTION,
  UPDATE_COLOR_ASSOCIATION,
  UPDATE_HEAT_MAP_SELECTION,
  UPDATE_MARKER_SELECTION,
  UPDATE_SELECTED_MARKER
} from './types';

// I think these are the functions we will need?
// possibly need to have remove/add for each of these
export function updateMarkerSelection(markerSelection: MarkerSelection) {
  return {
    type: UPDATE_MARKER_SELECTION,
    payload: markerSelection
  };
}

export function updateHeatMapSelection(heatMapSelection: HeatMapSelection) {
  return {
    type: UPDATE_HEAT_MAP_SELECTION,
    payload: heatMapSelection
  };
}

export function updateSelectedMarker(selectedMarker: SelectedMarker) {
  return {
    type: UPDATE_SELECTED_MARKER,
    payload: selectedMarker
  };
}

export function updateColorAssociation() {
  return {
    type: UPDATE_COLOR_ASSOCIATION
  };
}

export function updateBoundSelection(boundSelection: BoundSelection) {
  return {
    type: UPDATE_BOUND_SELECTION,
    payload: boundSelection
  };
}
