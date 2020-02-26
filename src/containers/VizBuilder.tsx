import React from 'react';
import Graph from '../graphs/Graph';
import Sample2 from '../graphs/Sample2';
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
        <Sample2 />
      </Grid>
      <Grid item xs={6}>
        <Graph />
      </Grid>
    </Box>
  );
}

export default VizBuilder;
