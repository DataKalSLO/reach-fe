import React from 'react';
import ExploreGrid from '../explore/ExploreGrid';
import { Typography, Box, styled } from '@material-ui/core';
import { theme } from '../theme/theme';

const StyledBox = styled(Box)({
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  paddingLeft: theme.spacing(12),
  paddingRight: theme.spacing(12)
});
function Explore() {
  return (
    <StyledBox>
      <Typography variant="h3" component="h1">
        Published Stories
      </Typography>
      <ExploreGrid />
    </StyledBox>
  );
}

export default Explore;
