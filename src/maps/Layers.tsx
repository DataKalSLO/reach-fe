// Multiple Value Autocomplete: https://material-ui.com/components/autocomplete/
// Used for selection box, shows chip based on search and allows user to delete
import { Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { flatten } from 'lodash';
import React from 'react';
import kitchenFaciltiesHeatMap from '../common/assets/Local Data/census/b25053.js';
import medianHouseholdIncomeHeatMap from '../common/assets/Local Data/census/median_income_data.js';
import { markerData } from '../common/assets/Local Data/MockMarkerData';
import { theme } from '../theme/theme';
import {
  FeatureProperty,
  HeatMapSelection,
  LocationFeatures,
  MarkerSelection,
  SelectedMarker,
  Selections,
  SetHeatMapSelection,
  SetMarkerSelection,
  SetSelectedMarker
} from './types';

// number of allowed selections, subject to change based on ui/ux and graph team suggestions
const ALLOWED_MARKERS = 3;
const ALLOWED_BOTH = 4;

// sizing for autocomplete which controls layers selection
const AUTOCOMPLETE_MIN_HEIGHT = '55px';
const AUTOCOMPLETE_MIN_WIDTH = '75px';

// sizing for Box that contains the autocomplete
const BOX_MIN_WIDTH = '75%';

// all of the local data we have available
// TODO: pull this from backend! need distinct split between marker & heat map
const heatMapData = [medianHouseholdIncomeHeatMap, kitchenFaciltiesHeatMap];
// TODO: fix type errors here, can't figure out what it expects
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const allData = flatten([markerData as any, heatMapData]);

// this is how we show everything in options (disable none)
const showAll: Selections = [];

// handles change of selection
// ensures that popups will not stay when their markers disappear
export function handleChange(
  value: Selections,
  setMarkerSelection: SetMarkerSelection,
  setHeatMapSelection: SetHeatMapSelection,
  setSelectedMarker: SetSelectedMarker,
  selectedMarker: SelectedMarker
) {
  const newMarkers: MarkerSelection[] = [];
  let newHeatMap: {} | HeatMapSelection = {};
  const allSelections: string[] = [];
  value.forEach((table: MarkerSelection | HeatMapSelection) => {
    if (table.type === 'FeatureCollection') {
      const marker = table as MarkerSelection;
      newMarkers.push(marker);
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
  setHeatMapSelection(newHeatMap);
  setMarkerSelection(newMarkers);
  setSelectedMarker(
    selectedMarker.filter(
      (obj: LocationFeatures) => obj.properties.name in allSelections
    )
  );
}

// handles disabling options, only two markers or one marker & one heat map allowed
export function handleDisable(
  // TODO: fix type errors here, I am unable to use the MarkerOrHeatMap type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  allData: any[],
  markerSelection: MarkerSelection[],
  heatMapSelection: HeatMapSelection,
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

interface LayersProps {
  markerSelection: MarkerSelection[];
  setMarkerSelection: SetMarkerSelection;
  heatMapSelection: HeatMapSelection;
  setHeatMapSelection: SetHeatMapSelection;
  selectedMarker: SelectedMarker;
  setSelectedMarker: SetSelectedMarker;
}

// this function creates the multi-seletion autocomplete component
export default function Layers(props: LayersProps) {
  const {
    markerSelection,
    setMarkerSelection,
    heatMapSelection,
    setHeatMapSelection,
    selectedMarker,
    setSelectedMarker
  } = props;
  return (
    <StyledBox>
      <Autocomplete
        multiple
        disableListWrap
        id="tags-outlined"
        options={allData}
        // TODO: make sure this handles data not existing once we are pulling from DB
        defaultValue={[allData[0], allData[2]]}
        // disables all options when the user has chosen more than the allowedSelections
        getOptionDisabled={option =>
          handleDisable(allData, markerSelection, heatMapSelection, option)
        }
        style={{
          minWidth: AUTOCOMPLETE_MIN_WIDTH,
          marginTop: theme.spacing(1),
          minHeight: AUTOCOMPLETE_MIN_HEIGHT
        }}
        getOptionLabel={option => option.name}
        filterSelectedOptions
        // informs the layerSelection variable with the user's selection
        onChange={(event, value) =>
          handleChange(
            value,
            setMarkerSelection,
            setHeatMapSelection,
            setSelectedMarker,
            selectedMarker
          )
        }
        renderInput={params => (
          <TextField
            label="Layers"
            {...params}
            variant="outlined"
            fullWidth
            style={{ marginTop: theme.spacing(0.2) }}
          />
        )}
      />
    </StyledBox>
  );
}

const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  minWidth: BOX_MIN_WIDTH,
  alignItems: 'left'
});
