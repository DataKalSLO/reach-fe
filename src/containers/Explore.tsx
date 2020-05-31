import React from 'react';
import ExploreGrid from '../explore/ExploreGrid';
import PaddedBox from '../common/components/ContentBox';
import { Typography, Box, styled } from '@material-ui/core';

function Explore() {
  return (
    <PaddedBox>
      <Typography variant="h3" component="h1">
        Published Stories
      </Typography>
      <ExploreGrid />
    </PaddedBox>
  );
}

export default Explore;
