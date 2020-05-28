import React from 'react';
import StoryGrid from '../explore/ExploreContents/components/StoryGrid';
import { Typography, Box, styled } from '@material-ui/core';

const StyledBox = styled(Box)({
  textAlign: 'center'
});
function Explore() {
  return (
    <StyledBox>
      <Typography variant="h3" component="h1">
        Published Stories
      </Typography>
      <StoryGrid />
    </StyledBox>
  );
}

export default Explore;
