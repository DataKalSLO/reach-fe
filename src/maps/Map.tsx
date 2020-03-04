import React, { useState } from 'react';
import MapView from './MapView';
import LayersComponent from './LayersComponent';
import { BasicButtonGroup } from './FiltersComponent';
import SourceLabels from './SourcesComponent';
import VintageComponent from './VintageComponent';
import { markerData } from '../common/assets/Local Data/MockMarkerData';

function Map() {
  const [layerSelection, setLayerSelection] = useState([markerData[0]]);
  return (
    <div>
      <LayersComponent layerSelection={layerSelection} setLayerSelection={setLayerSelection} />
      <MapView layerSelection={layerSelection} />
      <BasicButtonGroup />
      <SourceLabels />
      <VintageComponent />
    </div>
  );
}
export default Map;
