import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import ExploreLanding from '../explore/ExploreLanding';
import SearchBar from '../explore/SearchBar';
import SearchResults from '../explore/SearchResults';
import { esQuery } from '../api/search';

function Explore() {
  const [landingVisible, setLandingVisible] = useState(true);
  const [hits, setHits] = useState([]);

  const handleSearch = (qry: string) => {
    console.log(qry);
    esQuery(qry).then(data => {
      console.log(data);
      setHits(data.hits.hits);
    });
    setLandingVisible(false);
  };

  const showLanding = () => {
    setHits([]);
    setLandingVisible(true);
  };

  return (
    <Container>
      <SearchBar searchCb={handleSearch} landingCb={showLanding} />
      {landingVisible ? <ExploreLanding /> : <SearchResults hits={hits} />}
    </Container>
  );
}

export default Explore;
