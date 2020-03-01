import React from 'react';
import Graph from '../graphs/Graph';
import Map from '../maps/Map';
import { Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import GraphContainer from '../graphs/GraphContainer';

function VizBuilder() {
  return (
    <Box
      display="flex"
      flexDirection="row"
      height="100vh"
      justifyContent="center"
      alignItems="center"
      //border="1px solid red"
      alignContent="center"
    >
      <SplitterLayout percentage={true} primaryMinSize={0}>
        <Grid item xs={12} 
        style={{ padding: "30px" ,
                 display: "flex",
                 justifyContent: "center",
                 alignContent: "center",
                 alignItems: "center"}}>
          <Map />
        </Grid>
        <Grid item xs={12} >
          <GraphContainer />
        </Grid>
      </SplitterLayout>
    </Box>
  );
}

export default VizBuilder;
