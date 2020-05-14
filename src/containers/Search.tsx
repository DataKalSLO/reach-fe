import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import SearchBar from '../search/SearchBar';
import SearchResults from '../search/SearchResults';
import { fetchSearchResults } from '../redux/search/actions';
import { useDispatch, useSelector } from 'react-redux';
import { getSearch } from '../redux/search/selectors';

function Search() {
  const [showResults, setShowResults] = useState(false);
  const dispatch = useDispatch();
  const searchState = useSelector(getSearch);
  const hits = searchState.hits;
  const qry = searchState.qry;

  const handleSearch = (qry: string) => {
    dispatch(fetchSearchResults(qry));
    setShowResults(true);
  };

  return (
    <Container>
      <SearchBar searchCallback={handleSearch} />
      {showResults ? <SearchResults hits={hits} qry={qry} /> : ''}
    </Container>
  );
}

export default Search;
