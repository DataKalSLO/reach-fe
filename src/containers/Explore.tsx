import React from 'react';
import ExploreGrid from '../explore/ExploreGrid';
import ContentBox from '../common/components/ContentBox';
import { Typography } from '@material-ui/core';
import Search from '../search/Search';
import { SearchIndexFilter } from '../redux/search/types';

function Explore() {
  return (
    <ContentBox>
      <Search
        index={SearchIndexFilter.stories}
        searchBarPlaceholder="Search published stories"
      />
      <Typography variant="h3" component="h1">
        Published Stories
      </Typography>
      <ExploreGrid />
    </ContentBox>
  );
}

export default Explore;
