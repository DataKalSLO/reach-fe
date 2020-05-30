// Multiple Value Autocomplete: https://material-ui.com/components/autocomplete/
// Used for selection box, shows chip based on search and allows user to delete
import { Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { flatten } from 'lodash';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import kitchenFaciltiesHeatMap from '../common/assets/Local Data/census/b25053.js';
import medianHouseholdIncomeHeatMap from '../common/assets/Local Data/census/median_income_data.js';
import { markerData } from '../common/assets/Local Data/MockMarkerData';
import {
  updateHeatMapSelection,
  updateMarkerSelection,
  updateSelectedMarker,
  getFeatureCollection,
  updateSelectedTables
} from '../redux/map/actions';
import { theme } from '../theme/theme';
import {
  FeatureProperty,
  HeatMapSelection,
  MarkerFeatures,
  MarkerSelection,
  SelectedMarker,
  Selections
} from './types';

// number of allowed selections, subject to change based on ui/ux and graph team suggestions
const ALLOWED_MARKERS = 2;
const ALLOWED_BOTH = 2;

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

interface LayersProps {
  tableNames: string[];
  selectedTables: string[];
  markerSelection: MarkerSelection[];
  heatMapSelection: HeatMapSelection | {};
  selectedMarker: SelectedMarker;
}

// this function creates the multi-seletion autocomplete component
export default function Layers(props: LayersProps) {
  const {
    tableNames,
    selectedTables,
    markerSelection,
    heatMapSelection,
    selectedMarker
  } = props;

  const dispatch = useDispatch();

  return (
    <StyledBox>
      <Autocomplete
        multiple
        disableListWrap
        id="tags-outlined"
        options={tableNames}
        getOptionLabel={(table: any) =>
          table.censusDesc ? table.censusDesc : table.tableName
        }
        value={selectedTables}
        // TODO: make sure this handles data not existing once we are pulling from DB
        // defaultValue={[allData[0], allData[2]]}
        // disables all options when the user has chosen more than the allowedSelections
        // getOptionDisabled={option =>
        //   handleDisable(allData, markerSelection, heatMapSelection, option)
        // }
        // adjust autocomplete size here, some magic numbers
        style={{
          minWidth: '75px',
          marginTop: theme.spacing(1),
          minHeight: '55px'
        }}
        // getOptionLabel={option => option.name}
        filterSelectedOptions
        // informs the layerSelection variable with the user's selection
        onChange={(event, value) => {
          updateSelectedTables(value)(dispatch);
          //  getFeatureCollection((value[value.length - 1] as any).tableName)(
          //    dispatch
          //  );
          getFeatureCollection('b19019_001e')(dispatch);
        }}
        renderInput={params => (
          <TextField
            {...params}
            variant="standard"
            label="Select up to Two Layers"
            placeholder="Layers"
            fullWidth
          />
        )}
      />
    </StyledBox>
  );
}

const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  minWidth: '75%',
  alignItems: 'left',
  '& > *': {
    margin: theme.spacing(1)
  },
  '& > * + *': {
    marginTop: theme.spacing(3)
  }
});
