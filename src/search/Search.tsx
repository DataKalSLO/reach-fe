import Container from '@material-ui/core/Container';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchResults } from '../redux/search/actions';
import { getSearch } from '../redux/search/selectors';
import { SearchIndexFilter } from '../redux/search/types';
import SearchBar from '../search/SearchBar';
import SearchResults from '../search/SearchResults';

interface SearchProps {
  // Enum value for ES index to query, e.g. SearchIndexFilter.graphs,
  // SearchIndexFilter.stories, SearchIndexFilter.all
  index: SearchIndexFilter;
  // component shown on empty result list
  emptyResultsComponent?: React.ReactNode;
  // component shown before query is made
  beforeQueryComponent?: React.ReactNode;
}

export default function Search(props: SearchProps) {
  const [showResults, setShowResults] = useState(false);
  const dispatch = useDispatch();
  const searchState = useSelector(getSearch);
  const hits = searchState.hits;
  const qry = searchState.qry;

  const handleSearch = (qry: string) => {
    dispatch(fetchSearchResults(qry, props.index));
    setShowResults(true);
  };

  const resultsContainer = () => {
    if (showResults && hits.length) {
      return <SearchResults hits={hits} qry={qry} />;
    } else if (showResults && !hits.length) {
      return props.emptyResultsComponent ? (
        props.emptyResultsComponent
      ) : (
        <div>No results found.</div>
      );
    } else {
      return props.beforeQueryComponent ? (
        props.beforeQueryComponent
      ) : (
        <div>No query has been made.</div>
      );
    }
  };

  return (
    <Container>
      <SearchBar searchCallback={handleSearch} />
      {resultsContainer()}
    </Container>
  );
}
