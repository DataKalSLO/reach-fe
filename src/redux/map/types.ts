import {
  MarkerSelection,
  HeatMapSelection,
  SelectedMarker,
  ColorAssociation,
  BoundSelection
} from '../../maps/types';

export interface MapState {
  markerSelection: MarkerSelection[];
  heatMapSelection: HeatMapSelection | {};
  selectedMarker: SelectedMarker;
  boundSelection: BoundSelection;
  colorAssociation: ColorAssociation;
}

export const UPDATE_MARKER_SELECTION = 'UPDATE_MARKER_SELECTION';

interface UpdateMarkerSelection {
  type: typeof UPDATE_MARKER_SELECTION;
  payload: MarkerSelection[];
}

export const UPDATE_HEAT_MAP_SELECTION = 'UPDATE_HEAT_MAP_SELECTION';

interface UpdateHeatMapSelection {
  type: typeof UPDATE_HEAT_MAP_SELECTION;
  payload: HeatMapSelection | {};
}

export const UPDATE_SELECTED_MARKER = 'UPDATE_SELECTED_MARKER';

interface UpdateSelectedMarker {
  type: typeof UPDATE_SELECTED_MARKER;
  payload: SelectedMarker;
}

export const UPDATE_COLOR_ASSOCIATION = 'UPDATE_COLOR_ASSOCIATION';

interface UpdateColorAssociation {
  type: typeof UPDATE_COLOR_ASSOCIATION;
  payload: ColorAssociation;
}

export const UPDATE_BOUND_SELECTION = 'UPDATE_BOUND_SELECTION';

interface UpdateBoundSelection {
  type: typeof UPDATE_BOUND_SELECTION;
  payload: BoundSelection;
}

export type MapActionTypes =
  | UpdateMarkerSelection
  | UpdateHeatMapSelection
  | UpdateSelectedMarker
  | UpdateColorAssociation
  | UpdateBoundSelection;
