import React from 'react';
import Box from '@material-ui/core/Box';
import Graph from '../graphs/Graph';
import Graph3D from '../graphs/Graph3D';

function GraphContainer() {
  return (
    <Box
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      height="100%"
      justifyContent="center"
      alignItems="center"
      overflow="scroll"
      alignContent="center"
      padding="20px"
    >
      <Graph />
      <Graph3D />
    </Box>
  );
}

export default GraphContainer;
