// Multiple Value Autocomplete: https://material-ui.com/components/autocomplete/
// Used for selection box, shows chip based on search and allows user to delete
import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const GeoJSON = require('geojson');

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

const schoolData = [CollegeData, HighSchoolData];
const data = GeoJSON.parse(schoolData, { GeoJSON: 'geometry' });
console.log(data);

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

export default function LayersComponent() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={schoolData}
        getOptionLabel={option => option.name}
        defaultValue={[schoolData[0]]}
        filterSelectedOptions
        renderInput={params => (
          <TextField
            {...params}
            variant="standard"
            label="Layers"
            placeholder="Topic Selection"
            fullWidth
          />
        )}
      />
    </div>
  );
}
