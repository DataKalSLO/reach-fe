import React, { useState } from 'react';
import ReactMapGL from 'react-map-gl';

function Map() {
  const [viewport, setViewport] = useState({
    width: 620,
    height: 550,
    latitude: 35.2828,
    longitude: -120.6596,
    zoom: 8
  });

  return (
    <div>
      <div>
        <h3>Central Coast map</h3>
      </div>
      <ReactMapGL
        mapboxApiAccessToken={
          'pk.eyJ1IjoiYWljaG91cmkiLCJhIjoiY2s3MzBzOHp0MDNrbjNtbW1rNGR2NHl4aCJ9.3SGwGK8OmEVnrt0RtrRidQ'
        }
        {...viewport}
        onViewportChange={setViewport}
      />
    </div>
  );
}
export default Map;
