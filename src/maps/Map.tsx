import React from 'react';
import MapView from './MapView';
import LayersComponent from './LayersComponent';
import { BasicButtonGroup } from './FiltersComponent';
import { DatePickers } from './FiltersComponent';

function Map() {
  return (
    <div>
      <LayersComponent />
      <MapView />
      <BasicButtonGroup />
      <DatePickers />
    </div>
  );
}
export default Map;
