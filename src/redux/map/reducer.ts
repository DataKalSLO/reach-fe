// import medianHouseholdIncomeHeatMap from '../../common/assets/Local Data/census/median_income_data';
// import { markerData } from '../../common/assets/Local Data/MockMarkerData';
import {
  MARKER_ONE_COLOR,
  MARKER_TWO_COLOR,
  MARKER_THREE_COLOR
} from '../../maps/constants';
import { ColorAssociation } from '../../maps/types';
import {
  MapActionTypes,
  MapState,
  UPDATE_BOUND_SELECTION,
  UPDATE_COLOR_ASSOCIATION,
  UPDATE_HEATMAP_SELECTION,
  UPDATE_MARKER_SELECTION,
  UPDATE_SELECTED_MARKER,
  UPDATE_SELECTED_TABLES,
  UPDATE_SELECTED_COLUMN
} from './types';
import noData from '../../common/assets/Local Data/census/noHeatMap';

// TODO: connect to DB!
// const initialState: MapState = {
//   featureCollection: {},
//   markerSelection: [markerData[0]],
//   heatMapSelection: medianHouseholdIncomeHeatMap,
//   selectedMarker: markerData[0].features[0],
//   boundSelection: 'Zip Code',
//   colorAssociation: {}
// };

const initialState: MapState = {
  selectedTables: [],
  markerSelection: [],
  heatMapSelection: noData,
  selectedMarker: [],
  boundSelection: 'Zip Code',
  colorAssociation: {},
  selectedColumn: ''
};

// sets up the color association based on the markers
// TODO: is there a way to do this which keeps the previous color assoc?
function updateColorAssociationHelper(state: MapState) {
  const markerColors = [
    { color: MARKER_ONE_COLOR },
    { color: MARKER_TWO_COLOR },
    { color: MARKER_THREE_COLOR }
  ];

  const newColorAssociation: ColorAssociation = {};
  state.markerSelection.forEach((marker, index) => {
    newColorAssociation[marker.name] = markerColors[index];
  });
  return newColorAssociation;
}

export function mapReducer(
  state = initialState,
  action: MapActionTypes
): MapState {
  switch (action.type) {
    case UPDATE_SELECTED_TABLES:
      return {
        ...state,
        selectedTables: action.payload
      };
    case UPDATE_MARKER_SELECTION:
      return {
        ...state,
        markerSelection: state.markerSelection.concat(action.payload)
      };
    case UPDATE_HEATMAP_SELECTION:
      return {
        ...state,
        heatMapSelection: action.payload
      };
    case UPDATE_SELECTED_MARKER:
      return {
        ...state,
        selectedMarker: action.payload
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
    case UPDATE_SELECTED_COLUMN:
      return {
        ...state,
        selectedColumn: action.payload
      };
    default:
      return state;
  }
}
