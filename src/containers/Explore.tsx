import React from 'react';
import Search from '../search/Search';
import { SearchIndexFilter } from '../redux/search/types';

function Explore() {
  return <Search index={SearchIndexFilter.all} />;
}

export default Explore;
