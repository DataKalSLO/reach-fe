import React from 'react';
import Graph from '../graphs/Graph';
import Map from '../maps/Map';
import { Grid } from '@material-ui/core';

function VizBuilder() {
  return (
    <Grid
      direction="row"
      justify="center"
      alignItems="center"
      item
      container
      xs={12}
    >
      <Grid item xs={6}>
        <Map />
      </Grid>
      <Grid item xs={6}>
        <Graph />
      </Grid>
    </Grid>
  );
}

export default VizBuilder;
