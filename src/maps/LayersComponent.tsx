// Multiple Value Autocomplete: https://material-ui.com/components/autocomplete/
// Used for selection box, shows chip based on search and allows user to delete
import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { markerData } from '../common/assets/Local Data/MockMarkerData';
import { Box } from '@material-ui/core';

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
const showAll: {
  type: string;
  name: string;
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
}[] = [];

// type interface for props passed in Map.tsx
interface LayersComponentProps {
  layerSelection: {
    type: string;
    name: string;
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
  }[];
  setLayerSelection: React.Dispatch<
    React.SetStateAction<
      {
        type: string;
        name: string;
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
      }[]
    >
  >;
  selectedMarker: {
    type: string;
    geometry: {
      type: string;
      coordinates: number[];
    };
    properties: {
      name: string;
    };
  }[];
  setSelectedMarker: React.Dispatch<React.SetStateAction<never[]>>;
}

// handles change of selection
// ensures that popups will not stay when their markers disappear
function handleChange(
  value: any,
  layerSelection: {
    type: string;
    name: string;
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
  }[],
  setLayerSelection: React.Dispatch<
    React.SetStateAction<
      {
        type: string;
        name: string;
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
      }[]
    >
  >,
  setSelectedMarker: any,
  selectedMarker: {
    type: string;
    geometry: {
      type: string;
      coordinates: number[];
    };
    properties: {
      name: string;
    };
  }[]
) {
  setLayerSelection(value);
  const allSelections: string[] = [];
  value.map((table: { features: any[] }) => {
    table.features.map(items => {
      items.map((selection: { properties: { name: string } }) => {
        allSelections.push(selection.properties.name);
      });
    });
  });
  setSelectedMarker(
    selectedMarker.filter(
      (obj: {
        type: string;
        geometry: { type: string; coordinates: number[] };
        properties: { name: string };
      }) => obj.properties.name in allSelections
    )
  );
  console.log(selectedMarker);
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
            layerSelection,
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
