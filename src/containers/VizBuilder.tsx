import React from 'react';
import Graph from '../graphs/Graph';
import Map from '../maps/Map';
import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
function VizBuilder() {
  return (
    <Box
      display="flex"
      flexDirection="row"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      border="1px solid red"
      alignContent="center"
    >
      <Grid item xs={6}>
        <Map />
      </Grid>
      <Grid item xs={6}>
        <Graph />
      </Grid>
    </Box>
  );
}

export default VizBuilder;
