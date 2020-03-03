// Multiple Value Autocomplete: https://material-ui.com/components/autocomplete/
// Used for selection box, shows chip based on search and allows user to delete
import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const ALLOWED_SELECTIONS = 2;
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

// college data
const CollegeData = {
  type: 'FeatureCollection',
  name: 'Colleges',
  features: [
    [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [35.305, -120.6625]
        },
        properties: {
          name: 'Cal Poly, SLO'
        }
      }
    ],
    [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [35.3292, -120.7401]
        },
        properties: {
          name: 'Cuesta College'
        }
      }
    ],
    [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [34.9446, -120.4189]
        },
        properties: {
          name: 'Allan Hancock College'
        }
      }
    ]
  ]
};

// high school data
const HighSchoolData = {
  type: 'FeatureCollection',
  name: 'High Schools',
  features: [
    [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [35.2829, -120.6517]
        },
        properties: {
          name: 'San Luis Obispo High School'
        }
      }
    ],
    [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [35.1161, -120.5806]
        },
        properties: {
          name: 'Arroyo Grande High School'
        }
      }
    ],
    [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [35.2901, -120.4017]
        },
        properties: {
          name: 'Atascadero High School'
        }
      }
    ]
  ]
};

export const schoolData = [CollegeData, HighSchoolData];

// this is how MapView.tsx accesses the user's selection
export let layerSelection = [schoolData[0]];

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

// this function creates the multi-seletion autocomplete component
export default function LayersComponent() {
  const classes = useStyles();
  const [layers, setLayers] = React.useState([schoolData[0]]);
  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={schoolData}
        defaultValue={[schoolData[0]]}
        // disables options when the user has chosen more than the allowedSelections
        getOptionDisabled={
          layers.length >= ALLOWED_SELECTIONS
            ? option => schoolData.includes(option)
            : option => showAll.includes(option)
        }
        getOptionLabel={option => option.name}
        filterSelectedOptions
        // informs the layerSelection variable with the user's selection
        // likely need more logic here to understand whether user wants points or overlay
        onChange={(event, value) => (
          setLayers(value), (layerSelection = value)
        )}
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
    </div>
  );
}
