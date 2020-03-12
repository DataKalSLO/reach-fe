import React from 'react';
import Box from '@material-ui/core/Box';
import { useParams } from 'react-router-dom';
import ShareButton from '../common/components/ShareButton';

function PremadeStoryContainer() {
  const { storyId } = useParams();

  const getStory = () => {
    switch (storyId) {
      case '1':
        return (
          <div>
            <ShareButton />
            Put your story here
          </div>
        );
      case '2':
        return <div>Story 2</div>;
      default:
        return <div>No story found.</div>;
    }
  };

  return (
    <Box marginTop="50px" textAlign="center">
      <Box display="inline-block">{getStory()}</Box>
    </Box>
  );
}

export default PremadeStoryContainer;
