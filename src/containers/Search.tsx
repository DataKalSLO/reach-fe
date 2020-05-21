import Container from '@material-ui/core/Container';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchResults } from '../redux/search/actions';
import { getSearch } from '../redux/search/selectors';
import SearchBar from '../search/SearchBar';
import SearchResults from '../search/SearchResults';

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
