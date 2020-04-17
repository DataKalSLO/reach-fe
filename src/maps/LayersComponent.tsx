// Multiple Value Autocomplete: https://material-ui.com/components/autocomplete/
// Used for selection box, shows chip based on search and allows user to delete
import { Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react';
import { flatten } from 'lodash';
import kitchenFaciltiesHeatMap from '../common/assets/Local Data/census/b25053.js';
import medianHouseholdIncomeHeatMap from '../common/assets/Local Data/census/median_income_data.js';
import { markerData } from '../common/assets/Local Data/MockMarkerData';
import { theme } from '../theme/theme';
import {
  FeatureProperty,
  HeatMapSelection,
  LayersComponentProps,
  LocationFeatures,
  MarkerOrHeatMap,
  MarkerSelection,
  SelectedMarker,
  SetDataSources,
  SetHeatMapSelection,
  SetMarkerSelection,
  SetSelectedMarker
} from './MapTypes';

// number of allowed selections, subject to change based on ui/ux and graph team suggestions
const ALLOWED_MARKERS = 2;
const ALLOWED_BOTH = 2;

// all of the local data we have available
// TODO: pull this from backend! need distinct split between marker & heat map
const heatMapData = [medianHouseholdIncomeHeatMap, kitchenFaciltiesHeatMap];
export const allData = flatten([markerData as any, heatMapData]);

const StyleBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'left',
  '& > *': {
    margin: theme.spacing(1)
  },
  '& > * + *': {
    marginTop: theme.spacing(3)
  }
});

// this is how we show everything in options (disable none)
const showAll: MarkerOrHeatMap = [];

// handles change of selection
// ensures that popups will not stay when their markers disappear
export function handleChange(
  value: MarkerOrHeatMap,
  setMarkerSelection: SetMarkerSelection,
  setHeatMapSelection: SetHeatMapSelection,
  setSelectedMarker: SetSelectedMarker,
  selectedMarker: SelectedMarker,
  setDataSources: SetDataSources
) {
  const newMarkers: MarkerSelection[] = [];
  let newHeatMap: {} | HeatMapSelection = {};
  const allSelections: string[] = [];
  const allDataSources: string[] = [];
  // TODO: fix type errors here, I am unable to use the MarkerOrHeatMap type
  // eslint-disable-next-line
  value.forEach((table: MarkerSelection | HeatMapSelection) => {
    if (table.type === 'FeatureCollection') {
      const marker = table as MarkerSelection;
      newMarkers.push(marker);
      allDataSources.push(marker.source);
      marker.features.forEach((items: FeatureProperty[]) => {
        items.forEach((selection: FeatureProperty) => {
          allSelections.push(selection.properties.name);
        });
      });
    } else if (table.type === 'HeatMap') {
      const heatMap = table as HeatMapSelection;
      newHeatMap = heatMap;
      allDataSources.push(heatMap.source);
    }
  });
  setHeatMapSelection(newHeatMap);
  setMarkerSelection(newMarkers);
  setSelectedMarker(
    selectedMarker.filter(
      (obj: LocationFeatures) => obj.properties.name in allSelections
    )
  );
  const dataSourceDict: {
    key: number;
    label: string;
  }[] = [];
  allDataSources.forEach((source: string, i: number) => {
    dataSourceDict.push({ key: i, label: source });
  });
  setDataSources(dataSourceDict);
}

// handles disabling options, only two markers or one marker & one heat map allowed
export function handleDisable(
  // TODO: fix type errors here, I am unable to use the MarkerOrHeatMap type
  // eslint-disable-next-line
  allData: any[],
  markerSelection: MarkerSelection[],
  heatMapSelection: HeatMapSelection,
  // TODO: fix type errors here, I am unable to use the MarkerOrHeatMap type
  // eslint-disable-next-line
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

// this function creates the multi-seletion autocomplete component
export default function LayersComponent(props: LayersComponentProps) {
  const {
    markerSelection,
    setMarkerSelection,
    heatMapSelection,
    setHeatMapSelection,
    selectedMarker,
    setSelectedMarker,
    setDataSources
  } = props;
  return (
    <StyleBox>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={allData}
        // TODO: make sure this handles data not existing once we are pulling from DB
        defaultValue={[allData[0], allData[2]]}
        // disables all options when the user has chosen more than the allowedSelections
        getOptionDisabled={option =>
          handleDisable(allData, markerSelection, heatMapSelection, option)
        }
        getOptionLabel={option => option.name}
        filterSelectedOptions
        // informs the layerSelection variable with the user's selection
        onChange={(event, value) =>
          handleChange(
            value,
            setMarkerSelection,
            setHeatMapSelection,
            setSelectedMarker,
            selectedMarker,
            setDataSources
          )
        }
        renderInput={params => (
          <TextField
            {...params}
            variant="standard"
            label="Layers"
            placeholder="Select up to Two Layers"
            fullWidth
          />
        )}
      />
    </StyleBox>
  );
}
