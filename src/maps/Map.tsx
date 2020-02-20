import React from 'react';
import MapView from './MapView';
import LayersComponent from './LayersComponent';
import DatePickers from './FiltersComponent';

function Map() {
  return (
    <div>
      <LayersComponent />
      <MapView />
      <DatePickers />
    </div>
  );
}
export default Map;
