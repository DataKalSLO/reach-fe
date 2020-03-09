import React from 'react';
import Box from '@material-ui/core/Box';
import Graph from '../graphs/Graph';
import GraphDrilldown from './GraphDrilldown';
import DrilldownDOD from './DrillDownDOD';
import StatOfBusiness2016 from './StatOfBusinesses2016';
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
      marginTop="60px"
    >
      <DrilldownDOD />
      <StatOfBusiness2016 />
      <Graph />
    </Box>
  );
}

export default GraphContainer;
