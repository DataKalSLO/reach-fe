import { Selection } from '../../api/vizbuilder/types';

import {
  MarkerSelection,
  HeatMapSelection,
  SelectedMarker,
  ColorAssociation,
  BoundSelection
} from '../../maps/types';

export interface MapState {
  selectedTables: Selection[];
  markerSelection: MarkerSelection[];
  heatMapSelection: HeatMapSelection | {};
  selectedMarker: SelectedMarker;
  boundSelection: BoundSelection;
  colorAssociation: ColorAssociation;
  selectedColumn: string;
}

export const UPDATE_SELECTED_TABLES = 'UPDATE_SELECTED_TABLES';

interface UpdateSelectedTables {
  type: typeof UPDATE_SELECTED_TABLES;
  payload: Selection[];
}

export const ADD_SELECTED_TABLE = 'ADD_SELECTED_TABLE';

interface AddSelectedTable {
  type: typeof ADD_SELECTED_TABLE;
  payload: Selection;
}

export const ADD_MARKER_SELECTION = 'ADD_MARKER_SELECTION';

interface AddMarkerSelection {
  type: typeof ADD_MARKER_SELECTION;
  payload: MarkerSelection[];
}

export const DELETE_MARKER_SELECTION = 'DELETE_MARKER_SELECTION';

interface DeleteMarkerSelection {
  type: typeof DELETE_MARKER_SELECTION;
  payload: MarkerSelection[];
}

export const UPDATE_HEATMAP_SELECTION = 'UPDATE_HEATMAP_SELECTION';

interface UpdateHeatMapSelection {
  type: typeof UPDATE_HEATMAP_SELECTION;
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

export const UPDATE_SELECTED_COLUMN = 'UPDATE_SELECTED_COLUMN';

interface UpdateSelectedColumn {
  type: typeof UPDATE_SELECTED_COLUMN;
  payload: string;
}

export type MapActionTypes =
  | UpdateSelectedTables
  | AddMarkerSelection
  | DeleteMarkerSelection
  | UpdateHeatMapSelection
  | UpdateSelectedMarker
  | UpdateColorAssociation
  | UpdateBoundSelection
  | UpdateSelectedColumn
  | AddSelectedTable;
