import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import ExploreLanding from '../explore/ExploreLanding';
import SearchBar from '../explore/SearchBar';
import SearchResults from '../explore/SearchResults';

function Explore() {
  const [landingVisible, setLandingVisible] = useState(true);
  const [hits, setHits] = useState([]);
  const [qry, setQry] = useState('');

  const handleSearch = (qry: string) => {
    console.log(qry);
    setQry(qry);
    setLandingVisible(false);
  };

  const showLanding = () => {
    setHits([]);
    setQry('');
    setLandingVisible(true);
  };

  return (
    <Container>
      <SearchBar searchCb={handleSearch} landingCb={showLanding} />
      {landingVisible ? (
        <ExploreLanding />
      ) : (
        <SearchResults hits={hits} qry={qry} />
      )}
    </Container>
  );
}

export default Explore;
