import React from 'react';
import ExploreGrid from '../explore/ExploreGrid';
import ContentBox from '../common/components/ContentBox';
import { Typography } from '@material-ui/core';

function Explore() {
  return (
    <ContentBox>
      <Typography variant="h3" component="h1">
        Published Stories
      </Typography>
      <ExploreGrid />
    </ContentBox>
  );
}

export default Explore;
