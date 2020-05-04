import {
  MapActionTypes,
  Map,
  UPDATE_MARKER_SELECTION,
  UPDATE_HEAT_MAP_SELECTION,
  UPDATE_BOUND_SELECTION,
  UPDATE_COLOR_ASSOCIATION
} from './types';
import { markerData } from '../../common/assets/Local Data/MockMarkerData';
import medianHouseholdIncomeHeatMap from '../../common/assets/Local Data/census/median_income_data';

const initialMap: Map = {
  markerSelection: markerData[0],
  heatMapSelection: medianHouseholdIncomeHeatMap,
  boundSelection: 'Zip Code',
  colorAssociation: {}
};

// probably will need some helper functions for updating these,
// this is just the skeleton
export function mapReducer(state = initialMap, action: MapActionTypes): Map {
  switch (action.type) {
    case UPDATE_MARKER_SELECTION:
      return {
        ...state,
        markerSelection: action.payload
      };
    case UPDATE_HEAT_MAP_SELECTION:
      return {
        ...state,
        heatMapSelection: action.payload
      };
    case UPDATE_BOUND_SELECTION:
      return {
        ...state,
        boundSelection: action.payload
      };
    case UPDATE_COLOR_ASSOCIATION:
      return {
        ...state,
        colorAssociation: action.payload
      };
    default:
      return state;
  }
}
