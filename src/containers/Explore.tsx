import React from 'react';
import ExploreGrid from '../explore/ExploreGrid';
import ContentBox from '../common/components/ContentBox';
import { Typography } from '@material-ui/core';
import Search from '../search/Search';
import { SearchIndexFilter } from '../redux/search/types';

const ExploreLandingComponent = (
  <div>
    <Typography variant="h3" component="h1">
      Published Stories
    </Typography>
    <ExploreGrid />
  </div>
);

function Explore() {
  return (
    <ContentBox>
      <Search
        index={SearchIndexFilter.stories}
        searchBarPlaceholder="Search published stories"
        beforeQueryComponent={ExploreLandingComponent}
      />
    </ContentBox>
  );
}

export default Explore;
