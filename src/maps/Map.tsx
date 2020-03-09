import React, { useState } from 'react';
import MapView from './MapView';
import LayersComponent from './LayersComponent';
import { BasicButtonGroup } from './FiltersComponent';
import SourceLabels from './SourcesComponent';
import VintageComponent from './VintageComponent';
import { markerData } from '../common/assets/Local Data/MockMarkerData';

function Map() {
  const [layerSelection, setLayerSelection] = useState([markerData[0]]);
  const [selectedMarker, setSelectedMarker] = useState([]);
  return (
    <div>
      <LayersComponent
        layerSelection={layerSelection}
        setLayerSelection={setLayerSelection}
        selectedMarker={selectedMarker}
        setSelectedMarker={setSelectedMarker}
      />
      <MapView
        layerSelection={layerSelection}
        selectedMarker={selectedMarker}
        setSelectedMarker={setSelectedMarker}
      />
      <BasicButtonGroup />
      <SourceLabels />
      <VintageComponent />
    </div>
  );
}
export default Map;
