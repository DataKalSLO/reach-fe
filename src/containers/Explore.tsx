import React from 'react';
import { Typography, Box, styled } from '@material-ui/core';
import StoryGrid from '../explore/ExploreContents/components/StoryGrid';

const StyledBox = styled(Box)({
  textAlign: 'center'
});

function Explore() {
  return (
    <StyledBox>
      <Typography variant="h3" component="h1">
        Trending Stories
      </Typography>
      <StoryGrid />
      <Typography variant="h3" component="h1">
        New Publications
      </Typography>
    </StyledBox>
  );
}

export default Explore;
