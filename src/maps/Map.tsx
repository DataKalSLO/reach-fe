import React from 'react';
import MapView from './MapView';
import LayersComponent from './LayersComponent';
import { BasicButtonGroup } from './FiltersComponent';

function Map() {
  return (
    <div>
      <LayersComponent />
      <MapView />
      <BasicButtonGroup />
    </div>
  );
}
export default Map;
