// Multiple Value Autocomplete: https://material-ui.com/components/autocomplete/
// Used for selection box, shows chip based on search and allows user to delete
import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Box } from '@material-ui/core';
import { markerData } from '../common/assets/Local Data/MockMarkerData';
import {
  LocationFeatures,
  LayersComponentProps,
  LayerSelection,
  SetLayerSelection,
  SelectedMarker,
  SetSelectedMarker
} from './MapTypes';

// number of allowed selections, subject to change based on ui/ux and graph team suggestions
const ALLOWED_SELECTIONS = 2;

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
const showAll: LayerSelection = [];

// handles change of selection
// ensures that popups will not stay when their markers disappear
// TODO: color association
function handleChange(
  value: LayerSelection,
  setLayerSelection: SetLayerSelection,
  setSelectedMarker: SetSelectedMarker,
  selectedMarker: SelectedMarker
) {
  setLayerSelection(value);
  const allSelections: string[] = [];
  value.forEach(
    (table: {
      features: {
        type: string;
        geometry: {
          type: string;
          coordinates: number[];
        };
        properties: {
          name: string;
        };
      }[][];
    }) => {
      table.features.forEach(items => {
        items.forEach((selection: { properties: { name: string } }) => {
          allSelections.push(selection.properties.name);
        });
      });
    }
  );
  setSelectedMarker(
    selectedMarker.filter(
      (obj: LocationFeatures) => obj.properties.name in allSelections
    )
  );
}

// this function creates the multi-seletion autocomplete component
export default function LayersComponent(props: LayersComponentProps) {
  const classes = useStyles();
  const {
    layerSelection,
    setLayerSelection,
    selectedMarker,
    setSelectedMarker
  } = props;
  return (
    <Box className={classes.root}>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={markerData}
        defaultValue={[markerData[0]]}
        // disables all options when the user has chosen more than the allowedSelections
        // TODO: logic for markers vs heat map
        getOptionDisabled={
          layerSelection.length >= ALLOWED_SELECTIONS
            ? option => markerData.includes(option)
            : option => showAll.includes(option)
        }
        getOptionLabel={option => option.name}
        filterSelectedOptions
        // informs the layerSelection variable with the user's selection
        // likely need more logic here to understand whether user wants points or overlay
        onChange={(event, value) =>
          handleChange(
            value,
            setLayerSelection,
            setSelectedMarker,
            selectedMarker
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
