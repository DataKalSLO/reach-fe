import React from 'react';
import Box from '@material-ui/core/Box';
import Graph from '../graphs/Graph';
import GraphDrilldown from './GraphDrilldown';
import DrilldownDOD from './DrillDownDOD';

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
      <DrilldownDOD />
    </Box>
  );
}

export default GraphContainer;
