import { Dispatch } from 'redux';
import {
  getFeatureCollectionAndHandleResponse,
  getMarkersAndHandleResponse
} from '../../api/map/operationHandlers';
import { Selection } from '../../api/vizbuilder/types';
import {
  BoundSelection,
  HeatMapSelection,
  MarkerSelection,
  SelectedMarker
} from '../../maps/types';
import {
  ADD_MARKER_SELECTION,
  ADD_SELECTED_TABLE,
  DELETE_MARKER_SELECTION,
  UPDATE_BOUND_SELECTION,
  UPDATE_COLOR_ASSOCIATION,
  UPDATE_HEATMAP_SELECTION,
  UPDATE_SELECTED_COLUMN,
  UPDATE_SELECTED_MARKER,
  UPDATE_SELECTED_TABLES
} from './types';

export function getFeatureCollection(tableName: string, geoType: string) {
  if (geoType === 'area') {
    return async (dispatch: Dispatch) => {
      const payload = await getFeatureCollectionAndHandleResponse(tableName);
      dispatch(updateHeatMapSelection(payload));
    };
  } else {
    return async (dispatch: Dispatch) => {
      const payload = await getMarkersAndHandleResponse(tableName);
      dispatch(addMarkerSelection([payload]));
    };
  }
}

export function updateSelectedTables(selectedTables: any) {
  return async (dispatch: Dispatch) => {
    dispatch(updateSelectedTablesAction(selectedTables));
  };
}

// possibly need to have remove/add for each of these
export function addMarkerSelection(markerSelection: MarkerSelection[]) {
  return {
    type: ADD_MARKER_SELECTION,
    payload: markerSelection
  };
}

// possibly need to have remove/add for each of these
export function deleteMarkerSelection(markerSelection: MarkerSelection[]) {
  return {
    type: DELETE_MARKER_SELECTION,
    payload: markerSelection
  };
}

export function updateHeatMapSelection(
  heatMapSelection: HeatMapSelection | {}
) {
  return {
    type: UPDATE_HEATMAP_SELECTION,
    payload: heatMapSelection
  };
}

export function updateSelectedTablesAction(selectedTables: string[]) {
  return {
    type: UPDATE_SELECTED_TABLES,
    payload: selectedTables
  };
}

export function addselectedTableAction(selectedTable: Selection) {
  return {
    type: ADD_SELECTED_TABLE,
    payload: selectedTable
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

export function updateSelectedColumn(selectedColumn: string) {
  return {
    type: UPDATE_SELECTED_COLUMN,
    payload: selectedColumn
  };
}
