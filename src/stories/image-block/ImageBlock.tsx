import { Paper, styled } from '@material-ui/core';
import React from 'react';
import { Button } from '@material-ui/core';

export default function ImageBlock() {
  return (
    <StoryBlockContainer variant="outlined">
      {/* Temporary to get file upload working */}
      <Button variant="contained" onClick={() => alert('finna upload')}>
        Default
      </Button>
    </StoryBlockContainer>
  );
}

const StoryBlockContainer = styled(Paper)({
  flexGrow: 1,
  padding: '20px',
  margin: '10px 0px 10px 0px'
});
