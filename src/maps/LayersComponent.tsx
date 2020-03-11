// Multiple Value Autocomplete: https://material-ui.com/components/autocomplete/
// Used for selection box, shows chip based on search and allows user to delete
import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Box } from '@material-ui/core';
import { markerData } from '../common/assets/Local Data/MockMarkerData';
import medianHouseholdIncomeHeatMap from '../common/assets/Local Data/census/median_income_data.js';
import kitchenFaciltiesHeatMap from '../common/assets/Local Data/census/b25053.js';
import {
  LocationFeatures,
  LayersComponentProps,
  MarkerSelection,
  SetMarkerSelection,
  SelectedMarker,
  SetSelectedMarker,
  SetHeatMapSelection,
  HeatMapSelection,
  SetDataSources
} from './MapTypes';

// number of allowed selections, subject to change based on ui/ux and graph team suggestions
const ALLOWED_MARKERS = 2;
const ALLOWED_BOTH = 2;

// all of the local data we have available
// TODO: pull this from backend! need distinct split between marker & heat map
// heat map data should have both kitchen facilities & median household income as options
//const heatMapData = [kitchenFaciltiesHeatMap, medianHouseholdIncomeHeatMap];
const heatMapData = [medianHouseholdIncomeHeatMap, kitchenFaciltiesHeatMap];
export const allData = [markerData, heatMapData].flat();

// I don't think there's a better way to do this; it's styling the div not the mui component
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'left',
      '& > *': {
        margin: theme.spacing(1)
      },
      '& > * + *': {
        marginTop: theme.spacing(3)
      }
    }
  })
);

// this is how we show everything in options (disable none)
const showAll: MarkerSelection = [];

// handles change of selection
// ensures that popups will not stay when their markers disappear
function handleChange(
  // going to solve "any" errors at a later time, ignoring for demo
  // eslint-disable-next-line
  value: any,
  setMarkerSelection: SetMarkerSelection,
  setHeatMapSelection: SetHeatMapSelection,
  setSelectedMarker: SetSelectedMarker,
  selectedMarker: SelectedMarker,
  setDataSources: SetDataSources
) {
  const newMarkers: MarkerSelection = [];
  // TODO: going to solve "any" errors at a later time, ignoring for demo
  // eslint-disable-next-line
  let newHeatMap: any = {};
  const allSelections: string[] = [];
  const allDataSources: string[] = [];
  // TODO: going to solve "any" errors at a later time, ignoring for demo
  // eslint-disable-next-line
  value.forEach((table: any) => {
    if (table.type === 'FeatureCollection') {
      newMarkers.push(table);
      allDataSources.push(table.source);
      table.features.forEach((items: { properties: { name: string } }[]) => {
        items.forEach((selection: { properties: { name: string } }) => {
          allSelections.push(selection.properties.name);
        });
      });
    } else if (table.type === 'HeatMap') {
      newHeatMap = table;
      allDataSources.push(table.source);
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
  let i = 0;
  allDataSources.forEach((source: string) => {
    dataSourceDict.push({ key: i, label: source });
    i++;
  });
  setDataSources(dataSourceDict);
}

// handles disabling options, only two markers or one marker & one heat map allowed
export function handleDisable(
  // TODO: going to solve "any" errors at a later time, ignoring for demo
  // eslint-disable-next-line
  allData: any[],
  markerSelection: MarkerSelection,
  heatMapSelection: HeatMapSelection,
  // TODO: going to solve "any" errors at a later time, ignoring for demo
  // eslint-disable-next-line
  option: any
) {
  if (markerSelection.length === ALLOWED_MARKERS) {
    return allData.includes(option);
  }
  if (Object.keys(heatMapSelection).length) {
    if (markerSelection.length + 1 === ALLOWED_BOTH) {
      return allData.includes(option);
    }
    return allData
      .filter(obj => obj.type !== 'FeatureCollection')
      .includes(option);
  }
  return showAll.includes(option);
}

// this function creates the multi-seletion autocomplete component
export default function LayersComponent(props: LayersComponentProps) {
  const classes = useStyles();
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
    <Box className={classes.root}>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={allData}
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
    </Box>
  );
}
