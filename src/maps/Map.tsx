import React from 'react';
import MapView from './MapView';
import LayersComponent from './LayersComponent';
import { BasicButtonGroup } from './FiltersComponent';
import SourceLabels from './SourcesComponent';

function Map() {
  return (
    <div>
      <LayersComponent />
      <MapView />
      <BasicButtonGroup />
      <SourceLabels />
    </div>
  );
}
export default Map;
