import { Dispatch } from 'redux';
import {
  updateHeatMapSelection,
  updateMarkerSelection,
  updateSelectedMarker
} from '../redux/map/actions';
import {
  FeatureProperty,
  HeatMapSelection,
  MarkerFeatures,
  MarkerSelection,
  SelectedMarker,
  Selections
} from './types';

// number of allowed selections, subject to change based on ui/ux and graph team suggestions
const ALLOWED_MARKERS = 3;
const ALLOWED_BOTH = 4;

// this is how we show everything in options (disable none)
const showAll: Selections = [];

// handles change of selection
// ensures that popups will not stay when their markers disappear
export function handleChange(
  value: Selections,
  selectedMarker: SelectedMarker,
  dispatch: Dispatch
) {
  let newHeatMap: {} | HeatMapSelection = {};
  const allSelections: string[] = [];
  const allMarkers: MarkerSelection[] = [];
  value.forEach((table: MarkerSelection | HeatMapSelection) => {
    if (table.type === 'FeatureCollection') {
      const marker = table as MarkerSelection;
      allMarkers.push(marker);
      marker.features.forEach((items: FeatureProperty[]) => {
        items.forEach((selection: FeatureProperty) => {
          allSelections.push(selection.properties.name);
        });
      });
    } else if (table.type === 'HeatMap') {
      const heatMap = table as HeatMapSelection;
      newHeatMap = heatMap;
    }
  });
  dispatch(updateHeatMapSelection(newHeatMap));
  dispatch(updateMarkerSelection(allMarkers));
  dispatch(
    updateSelectedMarker(
      selectedMarker.filter(
        (obj: MarkerFeatures) => obj.properties.name in allSelections
      )
    )
  );
}

// handles disabling options, only two markers or one marker & one heat map allowed
export function handleDisable(
  // TODO: fix type errors here, I am unable to use the MarkerOrHeatMap type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  allData: any[],
  markerSelection: MarkerSelection[],
  heatMapSelection: HeatMapSelection | {},
  // TODO: fix type errors here, I am unable to use the MarkerOrHeatMap type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  option: any
) {
  // disable all options if max number of markers are already selected
  if (markerSelection.length === ALLOWED_MARKERS) {
    return allData.includes(option);
  }
  if (Object.keys(heatMapSelection).length) {
    // disable all options if max number of total selections are already made
    if (markerSelection.length + 1 === ALLOWED_BOTH) {
      return allData.includes(option);
    }
    // disable heat map options if a heat map is already selected
    return allData
      .filter(obj => obj.type !== 'FeatureCollection')
      .includes(option);
  }
  // don't disable any options if the user hasn't reached max markers or max selections
  return showAll.includes(option);
}
