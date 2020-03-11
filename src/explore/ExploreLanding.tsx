import React from 'react';
import ExploreGrid from './ExploreContents/components/ExploreGrid';
import ExploreGrid2 from './ExploreContents/components/ExploreGrid2';

function ExploreLanding() {
  return (
    <div>
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ textAlign: 'left', paddingLeft: '50px' }}>
          Trending stories
        </h1>
        <div
          style={{
            width: '700px',
            display: 'inline-block',
            position: 'relative'
          }}
        ></div>
        <ExploreGrid></ExploreGrid>
        <h1
          style={{
            textAlign: 'left',
            paddingLeft: '50px'
          }}
        >
          New Publications
        </h1>
        <div
          style={{
            width: '700px',
            display: 'inline-block',
            position: 'relative'
          }}
        ></div>
        <ExploreGrid2></ExploreGrid2>
      </div>
    </div>
  );
}

export default ExploreLanding;
