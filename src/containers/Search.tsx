import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import SearchBar from '../search/SearchBar';
import SearchResults from '../search/SearchResults';
import { esQuery } from '../api/search';

function Search() {
  const [hits, setHits] = useState([]);
  const [qry, setQry] = useState('');

  const handleSearch = (qry: string) => {
    setQry(qry);
    esQuery(qry).then(data => {
      setHits(data.hits.hits);
    });
  };

  return (
    <Container>
      <SearchBar searchCb={handleSearch} />
      <SearchResults hits={hits} qry={qry} />
    </Container>
  );
}

export default Search;
