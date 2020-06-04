import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchResults } from '../redux/search/actions';
import { getSearch } from '../redux/search/selectors';
import { getUser } from '../redux/login/selectors';
import { SearchIndexFilter } from '../redux/search/types';
import SearchBar from '../search/SearchBar';
import SearchResults from '../search/SearchResults';
import { Box } from '@material-ui/core';

interface SearchProps {
  // Enum value for ES index to query, e.g. SearchIndexFilter.graphs,
  // SearchIndexFilter.stories, SearchIndexFilter.all
  index: SearchIndexFilter;
  searchBarPlaceholder: string;
  // component shown on empty result list
  emptyResultsComponent?: React.ReactNode;
  // component shown before query is made
  beforeQueryComponent?: React.ReactNode;
}

export default function Search(props: SearchProps) {
  const [showResults, setShowResults] = useState(false);
  const dispatch = useDispatch();
  const searchState = useSelector(getSearch);
  const loginState = useSelector(getUser);
  const hits = searchState.hits;
  const qry = searchState.qry;
  const userID = loginState.email;

  const handleSearch = (qry: string) => {
    dispatch(fetchSearchResults(qry, props.index, userID));
    setShowResults(true);
  };

  // emptyResultsComponent doesn't work any more
  // since we're doing additional filtering in SearchResults
  const resultsContainer = () => {
    if (showResults && hits.length) {
      return (
        <SearchResults
          hits={hits}
          qry={qry}
          index={props.index}
          userID={userID}
        />
      );
    } else if (showResults && !hits.length) {
      return props.emptyResultsComponent ? props.emptyResultsComponent : '';
    } else {
      return props.beforeQueryComponent ? props.beforeQueryComponent : '';
    }
  };

  return (
    <Box marginBottom="20px">
      <SearchBar
        searchCallback={handleSearch}
        searchBarPlaceholder={props.searchBarPlaceholder}
        onEmptySearchBar={() => setShowResults(false)}
      />
      {resultsContainer()}
    </Box>
  );
}
