import { blue, purple, red } from '@material-ui/core/colors';
import medianHouseholdIncomeHeatMap from '../../common/assets/Local Data/census/median_income_data';
import { markerData } from '../../common/assets/Local Data/MockMarkerData';
import {
  ColorAssociation,
  MarkerSelection,
  SelectedMarker
} from '../../maps/types';
import {
  Map,
  MapActionTypes,
  UPDATE_BOUND_SELECTION,
  UPDATE_COLOR_ASSOCIATION,
  UPDATE_HEAT_MAP_SELECTION,
  UPDATE_MARKER_SELECTION,
  UPDATE_SELECTED_MARKER
} from './types';

const initialMap: Map = {
  markerSelection: [markerData[0]],
  heatMapSelection: medianHouseholdIncomeHeatMap,
  selectedMarker: [markerData[0].features[0]],
  boundSelection: 'Zip Code',
  colorAssociation: {}
};

// adds marker to list if it isn't there, removes it if it is
function updateMarkerHelper(markerSelection: MarkerSelection, state: Map) {
  if (state.markerSelection.includes(markerSelection)) {
    state.markerSelection.filter(item => item !== markerSelection);
  } else {
    state.markerSelection.push(markerSelection);
  }
  return state.markerSelection;
}

// adds marker to selected markers if it isn't there, removes it if it is
function updateSelectedMarkerHelper(
  selectedMarker: SelectedMarker,
  state: Map
) {
  if (state.selectedMarker.includes(selectedMarker)) {
    state.selectedMarker.filter(item => item !== selectedMarker);
  } else {
    state.selectedMarker.push(selectedMarker);
  }
  return state.selectedMarker;
}

// sets up the color association based on the markers
// TODO: is there a way to do this which keeps the previous color assoc?
function updateColorAssociationHelper(state: Map) {
  const markerColors = [
    { color: red[500] },
    { color: blue[500] },
    { color: purple[500] }
  ];
  const newColorAssociation: ColorAssociation = {};
  state.markerSelection.forEach((marker, index) => {
    newColorAssociation[marker.name] = markerColors[index];
  });
  return newColorAssociation;
}

export function mapReducer(state = initialMap, action: MapActionTypes): Map {
  switch (action.type) {
    case UPDATE_MARKER_SELECTION:
      return {
        ...state,
        markerSelection: updateMarkerHelper(action.payload, state)
      };
    case UPDATE_HEAT_MAP_SELECTION:
      return {
        ...state,
        heatMapSelection: action.payload
      };
    case UPDATE_SELECTED_MARKER:
      return {
        ...state,
        selectedMarker: updateSelectedMarkerHelper(action.payload, state)
      };
    case UPDATE_BOUND_SELECTION:
      return {
        ...state,
        boundSelection: action.payload
      };
    case UPDATE_COLOR_ASSOCIATION:
      return {
        ...state,
        colorAssociation: updateColorAssociationHelper(state)
      };
    default:
      return state;
  }
}
