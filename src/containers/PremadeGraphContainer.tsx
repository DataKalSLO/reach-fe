import React from 'react';
import Box from '@material-ui/core/Box';
import { useParams } from 'react-router-dom';

function PremadeGraphContainer() {
  const { graphId } = useParams();

  return (
    <Box marginTop="50px" textAlign="center">
      <Box display="inline-block">Premade Graph here</Box>
    </Box>
  );
}

export default PremadeGraphContainer;
