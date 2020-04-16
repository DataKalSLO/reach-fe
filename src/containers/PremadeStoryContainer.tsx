import React from 'react';
import Box from '@material-ui/core/Box';
import { useParams } from 'react-router-dom';

function PremadeStoryContainer() {
  const { storyId } = useParams();

  return (
    <Box marginTop="50px" textAlign="center">
      <Box display="inline-block">Premade Story Here</Box>
    </Box>
  );
}

export default PremadeStoryContainer;
