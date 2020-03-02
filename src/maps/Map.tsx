import React from 'react';
import MapView from './MapView';
import LayersComponent from './LayersComponent';
import { BasicButtonGroup } from './FiltersComponent';
import SourceLabels from './SourcesComponent';
import VintageComponent from './VintageComponent';

function Map() {
  return (
    <div>
      <LayersComponent />
      <MapView />
      <BasicButtonGroup />
      <SourceLabels />
      <VintageComponent />
    </div>
  );
}
export default Map;
