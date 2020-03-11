import React from 'react';
import { Typography, Box, styled } from '@material-ui/core';
import ExploreGrid from './ExploreContents/components/ExploreGrid';
import ExploreGrid2 from './ExploreContents/components/ExploreGrid2';

export const StyledExploreHeader = styled(Typography)({
  textAlign: 'left',
  fontWeight: 'bold',
  marginTop: '20px',
  marginBottom: '20px'
});

const StyledBox = styled(Box)({
  textAlign: 'center'
});

function ExploreLanding() {
  return (
    <StyledBox>
      <StyledExploreHeader variant="h4">Trending stories</StyledExploreHeader>
      <ExploreGrid />
      <StyledExploreHeader variant="h4">New Publications</StyledExploreHeader>
      <ExploreGrid2 />
    </StyledBox>
  );
}

export default ExploreLanding;
